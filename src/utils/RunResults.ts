import { AlgorithmType, GraphDiv, Node, NodeState, ShortestPathNode } from '../common/types';
import { getRowAndColumnFromCellId } from './general';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { getNeighborWeight } from './graph';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Represents the results of an algorithm run on a graph, including the steps taken and the final shortest path.
 */
export default class RunResults {
    private readonly algorithmType: AlgorithmType;
    private readonly stepList: number[];
    private readonly nodeStateList: NodeState[][];

    private shortestPath: ShortestPathNode[];
    // Steps taken to run the algorithm, excluding the steps taken to display of the shortest path.
    private algorithmSteps: number;
    private displayComplete: boolean;
    // The HTML div element where the run results will be displayed.
    private graphDiv: GraphDiv | null;

    public constructor(algorithmType: AlgorithmType) {
        this.algorithmType = algorithmType;
        this.stepList = [0];
        this.nodeStateList = [this.createNodeStateList()];
        this.shortestPath = [];
        this.algorithmSteps = 0;
        this.displayComplete = false;
        this.graphDiv = null;
    }

    /**
     * Generates an array containing the initial states of all graph nodes.
     *
     * @returns {NodeState[]}
     */
    private createNodeStateList = (): NodeState[] => {
        const nodeStateList: NodeState[] = [];

        for (let i = 0; i < globalVariablesManager.getGridSize(); i++) {
            let nodeState: NodeState;
            switch (i) {
                case globalVariablesManager.getStartNode():
                    nodeState = NodeState.StartNode;
                    break;
                case globalVariablesManager.getEndNode():
                    nodeState = NodeState.EndNode;
                    break;
                default:
                    nodeState = NodeState.Unvisited;
                    break;
            }

            nodeStateList.push(nodeState);
        }

        return nodeStateList;
    };

    /**
     * Gets the latest nodeState list.
     * @returns {NodeState[]}
     */
    private getLatestNodeStateList = (): NodeState[] => {
        return this.nodeStateList[this.nodeStateList.length - 1];
    };

    /**
     * Determines the shortest path node state from the current node to the next node.
     * @param {Node} currentNode - The current node.
     * @param {Node} nextNode - The next node.
     * @returns {NodeState} - The direction to the next node.
     */
    private getShortestPathNodeState = (currentNode: Node, nextNode: Node): NodeState => {
        const { row: currentRow, col: currentCol } = getRowAndColumnFromCellId(currentNode);
        const { row: nextRow, col: nextCol } = getRowAndColumnFromCellId(nextNode);

        if (nextRow > currentRow) {
            return NodeState.ShortestPathDown;
        } else if (nextRow < currentRow) {
            return NodeState.ShortestPathUp;
        } else if (nextCol < currentCol) {
            return NodeState.ShortestPathLeft;
        } else {
            return NodeState.ShortestPathRight;
        }
    };

    /**
     * Adds a step to the run results.
     * @param {number} steps - The number of steps.
     * @param {Node} node - The node id.
     * @param {NodeState} nodeState - The new nodeState of the node.
     */
    public addStep = (steps: number, node: Node, nodeState: NodeState): void => {
        // Create a sliced copy of the latest node state list to prevent modifications to the original array.
        const newNodeStateList = this.getLatestNodeStateList().slice();

        newNodeStateList[node] = nodeState;
        this.nodeStateList.push(newNodeStateList);
        this.stepList.push(steps);
    };

    /**
     * Updates the internal state to reflect the shortest path found by the algorithm.
     * It also prepares the necessary steps to visually display the path on the grid.
     *
     * @param {Node[]} shortestPath - The shortest path.
     */
    public setShortestPath = (shortestPath: Node[]): void => {
        // Store the number of steps the algorithm took, excluding those for displaying the shortest path.
        this.algorithmSteps = this.getLatestTotalSteps();

        // Push an empty state step to briefly clear the grid before displaying the shortest path.
        this.stepList.push(this.getLatestTotalSteps() + 10);
        this.nodeStateList.push(this.createNodeStateList());

        const shortestPathNodes: ShortestPathNode[] = [];

        shortestPath.forEach((node, i) => {
            // Create a sliced copy of the latest node state list to prevent modifications to the original array.
            const newNodeStateList = this.getLatestNodeStateList().slice();

            // Get the direction to the next node.
            const nextNode = shortestPath[i + 1];
            const shortestPathNodeState = this.getShortestPathNodeState(node, nextNode);
            shortestPathNodes.push({ nodeId: node, direction: shortestPathNodeState });

            // Apply the shortest path state only to nodes that are neither the start nor the end node.
            if (
                newNodeStateList[node] !== NodeState.StartNode &&
                newNodeStateList[node] !== NodeState.EndNode
            ) {
                newNodeStateList[node] = shortestPathNodeState;
            }

            // Push the updated state with a delay to slow down the visualization of the shortest path.
            this.stepList.push(
                this.getLatestTotalSteps() + globalVariablesManager.getStepIncrement(),
            );
            this.nodeStateList.push(newNodeStateList);
        });

        this.shortestPath = shortestPathNodes;
    };

    public getShortestPath = (): ShortestPathNode[] => {
        return this.shortestPath;
    };

    public isDisplayComplete = (): boolean => {
        return this.displayComplete;
    };

    public setDisplayComplete = (): void => {
        this.displayComplete = true;
    };

    public getNodeStateList = (): NodeState[][] => {
        return this.nodeStateList;
    };

    public getStepList = (): number[] => {
        return this.stepList;
    };

    public getAlgorithmType = (): AlgorithmType => {
        return this.algorithmType;
    };

    public getLatestTotalSteps = (): number => {
        return this.stepList[this.stepList.length - 1];
    };

    public getTotalWeight = (): number => {
        const nodes = globalVariablesManager.getGraph().nodes;
        return this.shortestPath.reduce((totalWeight, currentNode, i) => {
            return i === 0
                ? totalWeight
                : totalWeight +
                      getNeighborWeight(
                          nodes[this.shortestPath[i - 1].nodeId],
                          nodes[currentNode.nodeId],
                      );
        }, 0);
    };

    public getAlgorithmSteps = (): number => {
        return this.algorithmSteps;
    };

    public setGraphDiv = (graphDiv: GraphDiv | null): void => {
        this.graphDiv = graphDiv;
    };

    public getGraphDiv = (): GraphDiv | null => {
        return this.graphDiv;
    };

    public getIsDisplayed = (): boolean => {
        return this.graphDiv !== null;
    };
}
