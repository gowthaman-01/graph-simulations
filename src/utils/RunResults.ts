import { GRID_SIZE, SHORTEST_PATH_DELAY_MULTIPLIER } from '../common/constants';
import {
    AlgorithmType,
    GraphDiv,
    NewNodeState,
    Node,
    NodeMetadataMap,
    NodeState,
    StepMetadata,
} from '../common/types';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Represents the results of a run of an algorithm on a graph.
 */
export default class RunResults {
    private readonly algorithmType: AlgorithmType;
    private readonly stepMetadataList: StepMetadata[];
    private shortestPath: Node[];
    private algorithmSteps: number; // Denotes the steps taken to run the algorithm, excluding the steps taken to display of the shortest path.
    private displayComplete: boolean;
    private graphDiv: GraphDiv | null;

    public constructor(algorithmType: AlgorithmType) {
        this.algorithmType = algorithmType;
        this.stepMetadataList = [
            {
                steps: 0,
                nodeMetadataMap: this.createNodeMetadataMap(),
            },
        ];
        this.shortestPath = [];
        this.algorithmSteps = 0;
        this.displayComplete = false;
        this.graphDiv = null;
    }

    /**
     * Creates a map of node metadata for all nodes in the graph. This is the initial map before the algorithm starts.
     *
     * Each node in the map will be assigned a state based on its position relative to the start and end nodes:
     * - The start node will have the state `StartNode`.
     * - The end node will have the state `EndNode`.
     * - All other nodes will have the state `Unvisited`.
     *
     * @returns {nodeMetadataMap} A map where each key is a node ID and the value is the node's metadata.
     *
     * @example
     * {
     *      '0': { id: '0', state: 'StartNode', weight: 1 },
     *      '1': { id: '1', state: 'Unvisited', weight: 2 },
     * }
     */
    private createNodeMetadataMap = (): NodeMetadataMap => {
        const nodeMetadataMap: NodeMetadataMap = {};

        for (let i = 0; i < GRID_SIZE; i++) {
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

            nodeMetadataMap[i] = {
                id: i.toString(),
                state: nodeState,
            };
        }

        return nodeMetadataMap;
    };

    /**
     * Gets the latest node metadata map.
     * @returns {nodeMetadataMap} The latest node metadata map.
     */
    private getLatestNodeMetaMap = (): NodeMetadataMap => {
        return this.stepMetadataList[this.stepMetadataList.length - 1].nodeMetadataMap;
    };

    /**
     * Adds a step to the run results.
     * @param {number} steps - The number of steps.
     * @param {NewNodeState[]} newNodeStates - The new states of the nodes.
     */
    public addStep = (steps: number, newNodeStates: NewNodeState[]): void => {
        // Use spread operator to create a shallow copy of the latest nodeMetadataMap.
        const latestNodeMetaMapCopy = { ...this.getLatestNodeMetaMap() };
        newNodeStates.forEach(({ id, newState }) => {
            latestNodeMetaMapCopy[id] = { ...latestNodeMetaMapCopy[id], state: newState };
        });
        this.stepMetadataList.push({ steps, nodeMetadataMap: latestNodeMetaMapCopy });
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
        this.stepMetadataList.push({
            steps: this.getLatestTotalSteps() + 10,
            nodeMetadataMap: this.createNodeMetadataMap(),
        });

        shortestPath.forEach((node) => {
            const latestNodeMetaMapCopy = JSON.parse(JSON.stringify(this.getLatestNodeMetaMap()));
            // We only apply the shortest path marking to nodes that are not the start or the end node.
            if (
                latestNodeMetaMapCopy[node.id].state !== NodeState.StartNode &&
                latestNodeMetaMapCopy[node.id].state !== NodeState.EndNode
            ) {
                latestNodeMetaMapCopy[node.id].state = NodeState.ShortestPath;
            }
            // We use a longer step increment to slow down the simulation when the shortest path is displayed.
            this.stepMetadataList.push({
                steps:
                    this.getLatestTotalSteps() +
                    globalVariablesManager.getStepIncrement() * SHORTEST_PATH_DELAY_MULTIPLIER,
                nodeMetadataMap: latestNodeMetaMapCopy,
            });
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

    public getStepMetadataList = (): StepMetadata[] => {
        return this.stepMetadataList;
    };

    public getAlgorithmType = (): AlgorithmType => {
        return this.algorithmType;
    };

    public getLatestTotalSteps = (): number => {
        return this.stepMetadataList[this.stepMetadataList.length - 1].steps;
    };

    public getTotalWeight = (): number => {
        return this.shortestPath.reduce((totalWeight, currentNode, i) => {
            // We don't take the start node (i === 0) into account.
            totalWeight +=
                i !== 0 ? Math.max(currentNode.weight - this.shortestPath[i - 1].weight, 0) : 0;
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
