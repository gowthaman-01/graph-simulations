import { DEFAULT_STEP_INCREMENT } from '../common/constants';
import { GraphStructure, GraphType } from '../common/types';
import RunResults from '../results/RunResults';
import { createGridGraph, generateEndNode, generateStartNode } from '../utils/graph';

class GlobalVariablesManager {
    private static instance: GlobalVariablesManager;
    private graph: GraphStructure;
    private runResults: RunResults[];
    private startNode: number;
    private endNode: number;
    private graphType: GraphType;
    private maxWeight: number;
    private stepIncrement: number;
    private firstRender: boolean;

    private constructor() {
        // Initialize default values
        this.runResults = [];
        this.startNode = generateStartNode();
        this.endNode = generateEndNode();
        this.graphType = GraphType.Unweighted;
        this.maxWeight = 0;
        this.stepIncrement = DEFAULT_STEP_INCREMENT;
        this.firstRender = true;
        this.graph = createGridGraph(0, GraphType.Unweighted); // The default graph is unweighted, with 0 max weight.
    }

    public static getInstance(): GlobalVariablesManager {
        if (!GlobalVariablesManager.instance) {
            GlobalVariablesManager.instance = new GlobalVariablesManager();
        }
        return GlobalVariablesManager.instance;
    }

    public setGraph(graph: GraphStructure): void {
        this.graph = graph;
    }

    public getGraph(): GraphStructure {
        return this.graph;
    }

    public setRunResults(runResults: RunResults[]): void {
        this.runResults = runResults;
    }

    public getRunResults(): RunResults[] {
        return this.runResults;
    }

    public generateNewStartNode(): void {
        this.startNode = generateStartNode();
    }

    public getStartNode(): number {
        return this.startNode;
    }

    public generateNewEndNode(): void {
        this.endNode = generateEndNode();
    }

    public getEndNode(): number {
        return this.endNode;
    }

    public setGraphType(graphType: GraphType): void {
        this.graphType = graphType;
    }

    public getGraphType(): GraphType {
        return this.graphType;
    }

    public setMaxWeight(maxWeight: number): void {
        this.maxWeight = maxWeight;
    }

    public getMaxWeight(): number {
        return this.maxWeight;
    }

    public setStepIncrement(stepIncrement: number): void {
        this.stepIncrement = stepIncrement;
    }

    public getStepIncrement(): number {
        return this.stepIncrement;
    }

    public setFirstRender(firstRender: boolean): void {
        this.firstRender = firstRender;
    }

    public isFirstRender(): boolean {
        return this.firstRender;
    }
}

export const getGlobalVariablesManagerInstance = (): GlobalVariablesManager => {
    return GlobalVariablesManager.getInstance();
};
