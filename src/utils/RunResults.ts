import { GRID_SIZE } from '../common/constants';
import {
    AlgorithmType,
    GraphType,
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
    private stepMetadataList: StepMetadata[] = [];
    private shortestPath: Node[] = [];
    private algorithmSteps: number = 0; // Steps excluding the display of the shortest path.
    private displayComplete: boolean = false;

    /**
     * @param {AlgorithmType} algorithmType - The type of algorithm used.
     */
    public constructor(algorithmType: AlgorithmType) {
        this.algorithmType = algorithmType;
        this.stepMetadataList.push({
            steps: 0,
            nodeMetaDataMap: this.createNodeMetadataMap(
                globalVariablesManager.getGraph().nodes,
                globalVariablesManager.getStartNode(),
                globalVariablesManager.getEndNode(),
            ),
        });
    }

    private createNodeMetadataMap = (
        nodes: Nodes,
        startNode: number,
        endNode: number,
    ): NodeMetadataMap => {
        const nodeMetadataMap: NodeMetadataMap = {};

        // Add all nodes into map.
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
        const latestNodeMetaMap = JSON.parse(JSON.stringify(this.getLatestNodeMetaMap()));
        newNodeStates.forEach(({ id, newState }) => (latestNodeMetaMap[id].state = newState));
        this.stepMetadataList.push({ steps: steps, nodeMetaDataMap: latestNodeMetaMap });
    };

    public setShortestPath = (shortestPath: Node[]): void => {
        // algorithmSteps represent the number of steps that the algorithm took to run, excluding the steps that display the shortest path.
        this.algorithmSteps = this.getTotalSteps();
        this.shortestPath = shortestPath;

        const blankNodeMetadataMap = this.createNodeMetadataMap(
            globalVariablesManager.getGraph().nodes,
            globalVariablesManager.getStartNode(),
            globalVariablesManager.getEndNode(),
        );

        // Once the algorithm is complete, an empty grid is shown for a split second
        // before the shortest path is shown.
        this.stepMetadataList.push({
            steps: this.getTotalSteps() + 10,
            nodeMetaDataMap: blankNodeMetadataMap,
        });

        shortestPath.forEach((node) => {
            // We use JSON.parse() and JSON.stringify() to create a deep copy of the latestNodeMetadataMap.
            const newNodeMetadataMap: NodeMetadataMap = JSON.parse(
                JSON.stringify(this.getLatestNodeMetaMap()),
            );
            // We only apply the shortest path marking to nodes that are not the start or the end.
            if (
                newNodeMetadataMap[node.id].state !== NodeState.StartNode &&
                newNodeMetadataMap[node.id].state !== NodeState.EndNode
            ) {
                newNodeMetadataMap[node.id].state = NodeState.ShortestPath;
            }
            // We use a longer step increment for the display of the shortest path as we want it to run slower.
            this.stepMetadataList.push({
                steps: this.getTotalSteps() + globalVariablesManager.getStepIncrement() * 3,
                nodeMetaDataMap: newNodeMetadataMap,
            });
        });
    };

    // Public getters and setters.
    public getShortestPath = () => {
        return this.shortestPath;
    };

    public getStepMetadataList = (): StepMetadata[] => {
        return this.stepMetadataList;
    };

    public getAlgorithmType = (): AlgorithmType => {
        return this.algorithmType;
    };

    public getTotalSteps = (): number => {
        return this.stepMetadataList[this.stepMetadataList.length - 1].steps;
    };

    public getTotalWeight = (): number => {
        if (globalVariablesManager.getGraphType() === GraphType.Unweighted) {
            return 0;
        }
        return this.shortestPath.reduce((totalWeight, currentNode, i) => {
            // The total weight excludes the startNode's weight.
            totalWeight +=
                i !== 0 ? Math.max(currentNode.weight - this.shortestPath[i - 1].weight, 0) : 0;
            return totalWeight;
        }, 0);
    };

    public isDisplayComplete = () => {
        return this.displayComplete;
    };

    public setDisplayComplete = () => {
        this.displayComplete = true;
    };

    public getAlgorithmSteps = () => {
        return this.algorithmSteps;
    };
}
