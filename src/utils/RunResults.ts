import { GRID_SIZE } from '../common/constants';
import {
    AlgorithmType,
    NewNodeState,
    Node,
    NodeMetadata,
    NodeMetadataMap,
    NodeState,
    Nodes,
    StepMetadata,
} from '../common/types';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Represents the results of a run of an algorithm on a graph.
 */
export default class RunResults {
    private algorithmType: AlgorithmType;
    private stepMetadataList: StepMetadata[];
    private shortestPath: Node[];
    private algorithmSteps: number; // Denotes the steps taken to run the algorithm, excluding the steps taken to display of the shortest path.
    private displayComplete: boolean;

    public constructor(algorithmType: AlgorithmType) {
        this.algorithmType = algorithmType;
        this.stepMetadataList = [
            {
                steps: 0,
                nodeMetaDataMap: this.createNodeMetadataMap(
                    globalVariablesManager.getGraph().nodes,
                    globalVariablesManager.getStartNode(),
                    globalVariablesManager.getEndNode(),
                ),
            },
        ];
        this.shortestPath = [];
        this.algorithmSteps = 0;
        this.displayComplete = false;
    }

    /**
     * Creates a map of node metadata for all nodes in the graph.
     *
     * @param {Nodes} nodes - The collection of nodes in the graph.
     * @param {number} startNode - The ID of the start node.
     * @param {number} endNode - The ID of the end node.
     * @returns {NodeMetadataMap} A map where each key is a node ID and the value is the node's metadata.
     *
     * @example
     * {
     *      '0': { id: '0', state: 'StartNode', weight: 1 },
     *      '1': { id: '1', state: 'Unvisited', weight: 2 },
     * }
     */
    private createNodeMetadataMap = (
        nodes: Nodes,
        startNode: number,
        endNode: number,
    ): NodeMetadataMap => {
        const nodeMetadataMap: NodeMetadataMap = {};

        for (let i = 0; i < GRID_SIZE; i++) {
            let nodeState: NodeState;
            switch (i) {
                case startNode:
                    nodeState = NodeState.StartNode;
                    break;
                case endNode:
                    nodeState = NodeState.EndNode;
                    break;
                default:
                    nodeState = NodeState.Unvisited;
                    break;
            }

            const nodeMetaData: NodeMetadata = {
                id: i.toString(),
                state: nodeState,
                weight: nodes[i].weight,
            };

            nodeMetadataMap[i] = nodeMetaData;
        }

        return nodeMetadataMap;
    };

    /**
     * Gets the latest node metadata map.
     * @returns {NodeMetadataMap} The latest node metadata map.
     */
    private getLatestNodeMetaMap = (): NodeMetadataMap => {
        return this.stepMetadataList[this.stepMetadataList.length - 1].nodeMetaDataMap;
    };

    /**
     * Adds a step to the run results.
     * @param {number} steps - The number of steps.
     * @param {NewNodeState[]} newNodeStates - The new states of the nodes.
     */
    public addStep = (steps: number, newNodeStates: NewNodeState[]): void => {
        // We use JSON.parse() and JSON.stringify() to create a deep copy of the latestNodeMetadataMap.
        const latestNodeMetaMapCopy = JSON.parse(JSON.stringify(this.getLatestNodeMetaMap()));
        newNodeStates.forEach(({ id, newState }) => (latestNodeMetaMapCopy[id].state = newState));
        this.stepMetadataList.push({ steps: steps, nodeMetaDataMap: latestNodeMetaMapCopy });
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

        const blankNodeMetadataMap = this.createNodeMetadataMap(
            globalVariablesManager.getGraph().nodes,
            globalVariablesManager.getStartNode(),
            globalVariablesManager.getEndNode(),
        );

        // Once the algorithm is complete, an empty grid is shown for a split second before the shortest path is shown.
        this.stepMetadataList.push({
            steps: this.getLatestTotalSteps() + 10,
            nodeMetaDataMap: blankNodeMetadataMap,
        });

        shortestPath.forEach((node) => {
            // We use JSON.parse() and JSON.stringify() to create a deep copy of the latestNodeMetadataMap.
            const newNodeMetadataMap: NodeMetadataMap = JSON.parse(
                JSON.stringify(this.getLatestNodeMetaMap()),
            );
            // We only apply the shortest path marking to nodes that are not the start or the end node.
            if (
                newNodeMetadataMap[node.id].state !== NodeState.StartNode &&
                newNodeMetadataMap[node.id].state !== NodeState.EndNode
            ) {
                newNodeMetadataMap[node.id].state = NodeState.ShortestPath;
            }
            // We use a longer step increment to slow down the simulation when the shortest path is displayed..
            this.stepMetadataList.push({
                steps: this.getLatestTotalSteps() + globalVariablesManager.getStepIncrement() * 3,
                nodeMetaDataMap: newNodeMetadataMap,
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
            totalWeight +=
                i !== 0 ? Math.max(currentNode.weight - this.shortestPath[i - 1].weight, 0) : 0;
            return totalWeight;
        }, 0);
    };

    public getAlgorithmSteps = (): number => {
        return this.algorithmSteps;
    };
}
