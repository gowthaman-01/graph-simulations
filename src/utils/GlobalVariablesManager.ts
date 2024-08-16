import { AVERAGE_SPEED, DEFAULT_WEIGHT } from '../common/constants';
import {
    AlgorithmType,
    AStarHeuristicType,
    GraphDiv,
    GraphStructure,
    GraphType,
    SimulationSpeed,
} from '../common/types';
import RunResults from './RunResults';
import { createBasicGridGraph, generateStartAndEndNode } from './graph';

/**
 * Singleton class to manage global variables used in the application.
 */
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
    private aStarHeuristicType: AStarHeuristicType;
    private simulationSpeed: SimulationSpeed;
    private tutorialPageNumber: number;
    private leftGraphDiv: GraphDiv | null;
    private rightGraphDiv: GraphDiv | null;
    private showWeights: boolean;

    private readonly TUTORIAL_PAGE_MIN = 1;
    private readonly TUTORIAL_PAGE_MAX = 10;

    private constructor() {
        this.graph = createBasicGridGraph(DEFAULT_WEIGHT, true); // The default graph is unweighted, with 0 max weight.
        this.runResults = [];
        const { startNode, endNode } = generateStartAndEndNode();
        this.startNode = startNode;
        this.endNode = endNode;
        this.graphType = GraphType.Standard;
        this.isWeighted = true;
        this.maxWeight = DEFAULT_WEIGHT;
        this.stepIncrement = AVERAGE_SPEED;
        this.firstRender = true;
        this.endNodeReachable = false;
        this.aStarHeuristicType = AStarHeuristicType.Manhattan;
        this.simulationSpeed = SimulationSpeed.Average;
        this.tutorialPageNumber = this.TUTORIAL_PAGE_MIN;
        this.rightGraphDiv = null;
        this.leftGraphDiv = null;
        this.showWeights = false;
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

    public isEndNodeReachable(): boolean {
        return this.endNodeReachable;
    }

    public getAStarHeuristicType(): AStarHeuristicType {
        return this.aStarHeuristicType;
    }

    public setAStarHeuristicType(newType: AStarHeuristicType) {
        this.aStarHeuristicType = newType;
    }

    public getSimulationSpeed(): SimulationSpeed {
        return this.simulationSpeed;
    }

    public setSimulationSpeed(simulationSpeed: SimulationSpeed) {
        this.simulationSpeed = simulationSpeed;
    }

    public getTutorialPageNumber(): number {
        return this.tutorialPageNumber;
    }

    public incrementTutorialPageNumber(): number {
        return this.tutorialPageNumber < this.TUTORIAL_PAGE_MAX
            ? ++this.tutorialPageNumber
            : this.tutorialPageNumber;
    }

    public decrementTutorialPageNumber(): number {
        return this.tutorialPageNumber > this.TUTORIAL_PAGE_MIN
            ? --this.tutorialPageNumber
            : this.tutorialPageNumber;
    }

    public resetTutorialPageNumber(): number {
        this.tutorialPageNumber = this.TUTORIAL_PAGE_MIN;
        return this.tutorialPageNumber;
    }

    public getGraphDivs(): GraphDiv[] {
        if (!this.leftGraphDiv || !this.rightGraphDiv) {
            return [];
        } else {
            return [this.leftGraphDiv, this.rightGraphDiv];
        }
    }

    public setGraphDivs(leftGraphDiv: GraphDiv, rightGraphDiv: GraphDiv): void {
        this.leftGraphDiv = leftGraphDiv;
        this.rightGraphDiv = rightGraphDiv;
    }

    public setGraphDiv(position: 'left' | 'right', algorithmType: AlgorithmType): void {
        if (!this.leftGraphDiv || !this.rightGraphDiv) {
            return;
        }
        if (position === 'left') {
            this.leftGraphDiv.algorithmType = algorithmType;
        } else if (position === 'right') {
            this.rightGraphDiv.algorithmType = algorithmType;
        }
    }

    public isExampleGraph() {
        return (
            this.graphType === GraphType.IdealAStar ||
            this.graphType === GraphType.IdealDijkstra ||
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

    public isShowWeights() {
        return this.showWeights;
    }

    public setShowWeights(showWeights: boolean) {
        this.showWeights = showWeights;
    }
}

/**
 * Returns the singleton instance of the GlobalVariablesManager.
 * @returns {GlobalVariablesManager} The singleton instance.
 */
export const getGlobalVariablesManagerInstance = (): GlobalVariablesManager => {
    return GlobalVariablesManager.getInstance();
};
