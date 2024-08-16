import { SHORTEST_PATH_DELAY_MULTIPLIER } from '../common/constants';
import { AlgorithmType, GraphDiv, Node, NodeState } from '../common/types';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Represents the results of a run of an algorithm on a graph.
 */
export default class RunResults {
    private readonly algorithmType: AlgorithmType;
    private readonly stepList: number[];
    private readonly nodeStateList: NodeState[][];
    private shortestPath: Node[];
    private algorithmSteps: number; // Denotes the steps taken to run the algorithm, excluding the steps taken to display of the shortest path.
    private displayComplete: boolean;
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
     * Creates a list of all the initial states of the graph nodes.
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
        const newNodeStateList = this.getLatestNodeStateList().slice(); // Deep copy
        newNodeStateList[node] = nodeState;
        this.nodeStateList.push(newNodeStateList);
        this.stepList.push(steps);
    };

    /**
     * Sets the shortest path.
     * @param {Node[]} shortestPath - The shortest path.
     */
    public setShortestPath = (shortestPath: Node[]): void => {
        // algorithmSteps represent the number of steps that the algorithm took to run, excluding the steps that display the shortest path.
        this.algorithmSteps = this.getLatestTotalSteps();
        this.shortestPath = shortestPath;

        globalVariablesManager.setEndNodeReachable(this.shortestPath.length !== 0);

        // Once the algorithm is complete, an empty grid is shown for a split second before the shortest path is shown.
        this.stepList.push(this.getLatestTotalSteps() + 10);
        this.nodeStateList.push(this.createNodeStateList());

        shortestPath.forEach((node) => {
            const newNodeStateList = this.getLatestNodeStateList().slice(); // Deep copy

            // We only apply the shortest path marking to nodes that are not the start or the end node.
            if (
                newNodeStateList[node] !== NodeState.StartNode &&
                newNodeStateList[node] !== NodeState.EndNode
            ) {
                newNodeStateList[node] = NodeState.ShortestPath;
            }

            // We use a longer step increment to slow down the simulation when the shortest path is displayed.
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
            // We don't take the start node (i === 0) into account.
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
