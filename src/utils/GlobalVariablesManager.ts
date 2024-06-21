import { DEFAULT_STEP_INCREMENT } from '../common/constants';
import {
    AStarHeuristicInfluence,
    AStarHeuristicType,
    GraphStructure,
    GraphType,
} from '../common/types';
import RunResults from './RunResults';
import { createGridGraph, generateStartAndEndNode } from './graph';

class GlobalVariablesManager {
    private static instance: GlobalVariablesManager;
    private graph: GraphStructure;
    private runResults: RunResults[];
    private startNode: number;
    private endNode: number;
    private graphType: GraphType;
    private isWeighted: boolean;
    private maxWeight: number;
    private stepIncrement: number;
    private firstRender: boolean;
    private endNodeReachable: boolean;
    private aStarHeuristicType: AStarHeuristicType = AStarHeuristicType.Manhattan;
    private aStartHeuristicInfluence: AStarHeuristicInfluence = AStarHeuristicInfluence.Balanced;

    private constructor() {
        // Initialize default values
        this.runResults = [];
        const { startNode, endNode } = generateStartAndEndNode();
        this.startNode = startNode;
        this.endNode = endNode;
        this.graphType = GraphType.Standard;
        this.isWeighted = false;
        this.maxWeight = 0;
        this.stepIncrement = DEFAULT_STEP_INCREMENT;
        this.firstRender = true;
        this.endNodeReachable = false;
        this.graph = createGridGraph(0, this.isWeighted); // The default graph is unweighted, with 0 max weight.
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

    public setStartNode(newStartNode: number): void {
        this.startNode = newStartNode;
    }

    public getStartNode(): number {
        return this.startNode;
    }

    public setEndNode(newEndNode: number): void {
        this.endNode = newEndNode;
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

    public setIsWeighted(isWeighted: boolean) {
        this.isWeighted = isWeighted;
    }

    public getIsWeighted(): boolean {
        return this.isWeighted;
    }

    public setMaxWeight(maxWeight: number): void {
        this.maxWeight = Math.floor(maxWeight);
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

    public setEndNodeReachable(endNodeReachable: boolean): void {
        this.endNodeReachable = endNodeReachable;
    }

    public getEndNodeReachable(): boolean {
        return this.endNodeReachable;
    }

    public getAStarHeuristicType(): AStarHeuristicType {
        return this.aStarHeuristicType;
    }

    public setAStarHeuristicType(newType: AStarHeuristicType) {
        this.aStarHeuristicType = newType;
    }

    public getAStartHeuristicInfluence(): AStarHeuristicInfluence {
        return this.aStartHeuristicInfluence;
    }

    public setAStartHeuristicInfluence(newInfluence: AStarHeuristicInfluence) {
        this.aStartHeuristicInfluence = newInfluence;
    }

    public isExampleGraph() {
        return (
            this.graphType === GraphType.IdealAStar ||
            this.graphType === GraphType.IdealDjikstra ||
            this.graphType === GraphType.IdealBellmanFord ||
            this.graphType === GraphType.IdealBfs
        );
    }

    public isMazeGraph() {
        return (
            this.graphType === GraphType.Dfs ||
            this.graphType === GraphType.RecursiveDivision ||
            this.graphType === GraphType.RandomWalls
        );
    }
}

export const getGlobalVariablesManagerInstance = (): GlobalVariablesManager => {
    return GlobalVariablesManager.getInstance();
};
