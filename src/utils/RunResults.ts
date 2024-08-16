import { SHORTEST_PATH_DELAY_MULTIPLIER } from '../common/constants';
import { AlgorithmType, GraphDiv, Node, NodeState } from '../common/types';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Represents the results of an algorithm run on a graph, including the steps taken and the final shortest path.
 */
export default class RunResults {
    private readonly algorithmType: AlgorithmType;
    private readonly stepList: number[];
    private readonly nodeStateList: NodeState[][];

    private shortestPath: Node[];
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
        this.shortestPath = shortestPath;

        // Set the end node's reachability status based on whether the shortest path exists.
        globalVariablesManager.setEndNodeReachable(this.shortestPath.length !== 0);

        // Push an empty state step to briefly clear the grid before displaying the shortest path.
        this.stepList.push(this.getLatestTotalSteps() + 10);
        this.nodeStateList.push(this.createNodeStateList());

        shortestPath.forEach((node) => {
            // Create a sliced copy of the latest node state list to prevent modifications to the original array.
            const newNodeStateList = this.getLatestNodeStateList().slice();

            // Apply the shortest path state only to nodes that are neither the start nor the end node.
            if (
                newNodeStateList[node] !== NodeState.StartNode &&
                newNodeStateList[node] !== NodeState.EndNode
            ) {
                newNodeStateList[node] = NodeState.ShortestPath;
            }

            // Push the updated state with a delay to slow down the visualization of the shortest path.
            this.stepList.push(
                this.getLatestTotalSteps() +
                    globalVariablesManager.getStepIncrement() * SHORTEST_PATH_DELAY_MULTIPLIER,
            );
            this.nodeStateList.push(newNodeStateList);
        });
    };

    public getShortestPath = (): Node[] => {
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
            // Skip the start node (i === 0).
            totalWeight +=
                i !== 0 ? Math.max(nodes[currentNode] - nodes[this.shortestPath[i - 1]], 0) : 0;
            return totalWeight;
        }, 0);
    };

    public getAlgorithmSteps = (): number => {
        return this.algorithmSteps;
    };

    public setGraphDiv = (graphDiv: GraphDiv): void => {
        this.graphDiv = graphDiv;
    };

    public getGraphDiv = (): GraphDiv | null => {
        return this.graphDiv;
    };
}
