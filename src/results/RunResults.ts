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

export class RunResults {
    private nodes: Nodes;
    private startnode: number;
    private endNode: number;
    private stepMetadataList: StepMetadata[] = [];
    private shortestPath: Node[] = [];
    private algorithmType: AlgorithmType;
    private displayComplete: boolean = false;
    private stepDifference: number;
    private algorithmSteps: number = 0;

    public constructor(
        nodes: Nodes,
        startNode: number,
        endNode: number,
        algorithmType: AlgorithmType,
        stepDifference: number,
    ) {
        this.nodes = nodes;
        this.startnode = startNode;
        this.endNode = endNode;
        this.stepMetadataList.push({
            steps: 0,
            nodeMetaDataMap: this.createNodeMetadataMap(nodes, startNode, endNode),
        });
        this.algorithmType = algorithmType;
        this.stepDifference = stepDifference;
    }

    private createNodeMetadataMap = (
        nodes: Nodes,
        startNode: number,
        endNode: number,
    ): NodeMetadataMap => {
        const nodeMetadataMap: NodeMetadataMap = {};

        // Add all nodes.
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

    public addStep = (steps: number, newNodeStates: NewNodeState[]): void => {
        const latestNodeMetaMap = JSON.parse(JSON.stringify(this.getLatestNodeMetaMap()));
        newNodeStates.forEach(({ id, newState }) => (latestNodeMetaMap[id].state = newState));
        this.stepMetadataList.push({ steps: steps, nodeMetaDataMap: latestNodeMetaMap });
    };

    public setShortestPath = (shortestPath: Node[]): void => {
        this.algorithmSteps = this.getTotalSteps();
        this.shortestPath = shortestPath;
        const blankNodeMetadataMap = this.createNodeMetadataMap(
            this.nodes,
            this.startnode,
            this.endNode,
        );

        this.stepMetadataList.push({
            steps: this.getTotalSteps() + 10,
            nodeMetaDataMap: blankNodeMetadataMap,
        });

        shortestPath.forEach((node) => {
            const newNodeMetadataMap: NodeMetadataMap = JSON.parse(
                JSON.stringify(this.getLatestNodeMetaMap()),
            );
            if (
                newNodeMetadataMap[node.id].state !== NodeState.StartNode &&
                newNodeMetadataMap[node.id].state !== NodeState.EndNode
            ) {
                newNodeMetadataMap[node.id].state = NodeState.ShortestPath;
            }
            this.stepMetadataList.push({
                steps: this.getTotalSteps() + this.stepDifference * 3,
                nodeMetaDataMap: newNodeMetadataMap,
            });
        });
    };

    private getLatestNodeMetaMap = (): NodeMetadataMap => {
        return this.stepMetadataList[this.stepMetadataList.length - 1].nodeMetaDataMap;
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

    public getTotalWeights = (): number => {
        let totalWeight = 0;
        this.shortestPath.forEach((node) => (totalWeight += node.weight));
        return totalWeight;
    };

    public setDisplayComplete = () => {
        this.displayComplete = true;
    };

    public isDisplayComplete = () => {
        return this.displayComplete;
    };

    public getStartNode = () => {
        return this.startnode;
    };

    public getEndNode = () => {
        return this.endNode;
    };

    public getNodes = () => {
        return this.nodes;
    };

    public getAlgorithmSteps = () => {
        return this.algorithmSteps;
    };
}
