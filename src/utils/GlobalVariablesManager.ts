import { AVERAGE_SPEED, DEFAULT_GRID_SIZE, LOCAL_STORAGE_KEY } from '../common/constants';
import {
    AlgorithmType,
    HeuristicType,
    GraphDiv,
    GraphStructure,
    GraphType,
    SimulationSpeed,
    Node,
    EnvironmentType,
    Dropdowns,
    GRAPH_POSITION,
} from '../common/types';
import RunResults from './RunResults';
import { createBasicGridGraph, generateStartAndEndNodeForStandardGraph } from './graph';
import { LocalStorage } from 'node-localstorage';

// const localStorage =
//     typeof window !== 'undefined' ? window.localStorage : new LocalStorage('./scratch');

/**
 * Singleton class to manage global variables used in the application.
 */
class GlobalVariablesManager {
    private static instance: GlobalVariablesManager;
    private graph: GraphStructure;
    private gridSize: number;
    private runResults: RunResults[];
    private startNode: number;
    private endNode: number;
    private graphType: GraphType;
    private environmentType: EnvironmentType;
    private stepIncrement: number;
    private endNodeReachable: boolean;
    private containsNegativeWeightCycle: boolean;
    private heuristicType: HeuristicType;
    private simulationSpeed: SimulationSpeed;
    private tutorialPageNumber: number;
    private showTutorial: boolean;
    private leftGraphDiv: GraphDiv | null;
    private rightGraphDiv: GraphDiv | null;
    private editorGraphDiv: GraphDiv | null;
    private showWeights: boolean;
    private isSimulationRunning: boolean;
    private isChangingStartEndNode: boolean;
    private customGraph: GraphStructure | null;
    private dropdowns: Dropdowns | null;

    private readonly TUTORIAL_PAGE_MIN = 1;
    private readonly TUTORIAL_PAGE_MAX = 10;

    private constructor() {
        const savedData = this.loadFromLocalStorage();
        if (savedData) {
            this.gridSize = savedData.gridSize;
            this.graph = savedData.graph;
            this.startNode = savedData.startNode;
            this.endNode = savedData.endNode;
            this.showTutorial = savedData.showTutorial;
            this.environmentType = savedData.environmentType;
            this.graphType = savedData.graphType;
            this.stepIncrement = savedData.stepIncrement;
            this.heuristicType = savedData.heuristicType;
            this.simulationSpeed = savedData.simulationSpeed;
            this.customGraph = savedData.customGraph;
        } else {
            this.gridSize = DEFAULT_GRID_SIZE;
            this.graph = createBasicGridGraph(true, this.gridSize);
            const { startNode, endNode } = generateStartAndEndNodeForStandardGraph(
                this.graph.nodes,
                this.gridSize,
            );
            this.startNode = startNode;
            this.endNode = endNode;
            this.showTutorial = true;
            this.environmentType = EnvironmentType.RoadNetwork;
            this.graphType = GraphType.Standard;
            this.stepIncrement = AVERAGE_SPEED;
            this.heuristicType = HeuristicType.Euclidean;
            this.simulationSpeed = SimulationSpeed.Average;
            this.customGraph = null;
        }
        this.runResults = [];
        this.endNodeReachable = true;
        this.containsNegativeWeightCycle = false;
        this.tutorialPageNumber = this.TUTORIAL_PAGE_MIN;
        this.rightGraphDiv = null;
        this.leftGraphDiv = null;
        this.editorGraphDiv = null;
        this.showWeights = false;
        this.isSimulationRunning = false;
        this.isChangingStartEndNode = false;
        this.dropdowns = null;
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

    public setNodes(nodes: Node[]): void {
        this.graph.nodes = nodes;
    }

    public getGraph(): GraphStructure {
        return this.graph;
    }

    public setGridSize(newGridSize: number): void {
        this.gridSize = newGridSize;
    }

    public getGridSize(): number {
        return this.gridSize;
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

    public setWeightType(environmentType: EnvironmentType) {
        this.environmentType = environmentType;
    }

    public getEnvironmentType(): EnvironmentType {
        return this.environmentType;
    }

    public setStepIncrement(stepIncrement: number): void {
        this.stepIncrement = stepIncrement;
    }

    public getStepIncrement(): number {
        return this.stepIncrement;
    }

    public setEndNodeReachable(endNodeReachable: boolean): void {
        this.endNodeReachable = endNodeReachable;
    }

    public isEndNodeReachable(): boolean {
        return this.endNodeReachable;
    }

    public getContainsNegativeWeightCycle(): boolean {
        return this.containsNegativeWeightCycle;
    }

    public setContainsNegativeWeightCycle(containsNegativeWeightCycle: boolean): void {
        this.containsNegativeWeightCycle = containsNegativeWeightCycle;
    }

    public getHeuristicType(): HeuristicType {
        return this.heuristicType;
    }

    public setHeuristicType(newType: HeuristicType) {
        this.heuristicType = newType;
    }

    public getSimulationSpeed(): SimulationSpeed {
        return this.simulationSpeed;
    }

    public setSimulationSpeed(simulationSpeed: SimulationSpeed) {
        this.simulationSpeed = simulationSpeed;
    }

    public getShowTutorial(): boolean {
        return this.showTutorial;
    }

    public setShowTutorial(showTutorial: boolean) {
        this.showTutorial = showTutorial;
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

    public setTutorialPageNumber(pageNumber: number): void {
        if (pageNumber >= this.TUTORIAL_PAGE_MIN && pageNumber <= this.TUTORIAL_PAGE_MAX) {
            this.tutorialPageNumber = pageNumber;
        }
    }

    public getTutorialPageMin(): number {
        this.tutorialPageNumber = this.TUTORIAL_PAGE_MIN;
        return this.TUTORIAL_PAGE_MIN;
    }

    public getGraphDivs(isEditor: boolean): GraphDiv[] {
        if (isEditor && this.editorGraphDiv) {
            return [this.editorGraphDiv];
        } else if (!isEditor && this.leftGraphDiv && this.rightGraphDiv) {
            return [this.leftGraphDiv, this.rightGraphDiv];
        } else {
            return [];
        }
    }

    public setGraphDivs(leftGraphDiv: GraphDiv, rightGraphDiv: GraphDiv): void {
        this.leftGraphDiv = leftGraphDiv;
        this.rightGraphDiv = rightGraphDiv;
    }

    public setGraphDiv(graphDiv: GraphDiv, position: GRAPH_POSITION) {
        if (position === GRAPH_POSITION.LEFT) {
            this.leftGraphDiv = graphDiv;
        } else if (position === GRAPH_POSITION.RIGHT) {
            this.rightGraphDiv = graphDiv;
        }
    }

    public setEditorGraphDiv(editorGraphDiv: GraphDiv): void {
        this.editorGraphDiv = editorGraphDiv;
    }

    public setGraphDivAlgorithmType(position: GRAPH_POSITION, algorithmType: AlgorithmType): void {
        if (!this.leftGraphDiv || !this.rightGraphDiv) {
            return;
        }
        switch (position) {
            case GRAPH_POSITION.LEFT:
                this.leftGraphDiv.algorithmType = algorithmType;
                break;
            case GRAPH_POSITION.RIGHT:
                this.rightGraphDiv.algorithmType = algorithmType;
                break;
        }
    }

    public isMazeGraph() {
        return (
            this.graphType === GraphType.DFS ||
            this.graphType === GraphType.RecursiveDivision ||
            this.graphType === GraphType.RandomWalls
        );
    }

    public shouldShowWeights() {
        return this.showWeights;
    }

    public setShowWeights(showWeights: boolean) {
        this.showWeights = showWeights;
    }

    public getIsSimulationRunning(): boolean {
        return this.isSimulationRunning;
    }

    public stopSimulation() {
        this.isSimulationRunning = false;
    }

    public setIsSimulationRunning() {
        this.isSimulationRunning = true;
    }

    public getIsChangingStartEndNode(): boolean {
        return this.isChangingStartEndNode;
    }

    public setIsChangingStartEndNode(isChangingStartEndNode: boolean) {
        this.isChangingStartEndNode = isChangingStartEndNode;
    }

    public setCustomGraph(customGraph: GraphStructure): void {
        this.customGraph = customGraph;
    }

    public getCustomGraph(): GraphStructure | null {
        return this.customGraph;
    }

    public setDropdowns(dropdowns: Dropdowns): void {
        this.dropdowns = dropdowns;
    }

    public getDropdowns(): Dropdowns | null {
        return this.dropdowns;
    }

    public saveToLocalStorage(): void {
        const serializedGraph = {
            ...this.graph,
            nodes: this.graph.nodes.map((weight) => (weight === Infinity ? 'Infinity' : weight)),
        };

        const serializedCustomGraph = this.customGraph
            ? {
                  ...this.customGraph,
                  nodes: this.customGraph.nodes.map((weight) =>
                      weight === Infinity ? 'Infinity' : weight,
                  ),
              }
            : null;

        const data = {
            graph: serializedGraph,
            gridSize: this.gridSize,
            startNode: this.startNode,
            endNode: this.endNode,
            showTutorial: this.showTutorial,
            environmentType: this.environmentType,
            graphType: this.graphType,
            stepIncrement: this.stepIncrement,
            heuristicType: this.heuristicType,
            simulationSpeed: this.simulationSpeed,
            customGraph: serializedCustomGraph,
        };

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }

    private loadFromLocalStorage(): {
        gridSize: number;
        graph: GraphStructure;
        startNode: number;
        endNode: number;
        showTutorial: boolean;
        environmentType: EnvironmentType;
        graphType: GraphType;
        stepIncrement: number;
        heuristicType: HeuristicType;
        simulationSpeed: SimulationSpeed;
        customGraph: GraphStructure | null;
    } | null {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data);
        const parsedGraph: GraphStructure = {
            ...parsedData.graph,
            nodes: parsedData.graph.nodes.map((weight: string | number) =>
                weight === 'Infinity' ? Infinity : weight,
            ),
        };
        const parsedCustomGraph: GraphStructure | null = parsedData.customGraph
            ? {
                  ...parsedData.customGraph,
                  nodes: parsedData.customGraph.nodes.map((weight: string | number) =>
                      weight === 'Infinity' ? Infinity : weight,
                  ),
              }
            : null;
        return {
            gridSize: parsedData.gridSize,
            graph: parsedGraph,
            startNode: parsedData.startNode,
            endNode: parsedData.endNode,
            showTutorial: parsedData.showTutorial,
            environmentType: parsedData.environmentType,
            graphType: parsedData.graphType,
            stepIncrement: parsedData.stepIncrement,
            heuristicType: parsedData.heuristicType,
            simulationSpeed: parsedData.simulationSpeed,
            customGraph: parsedCustomGraph,
        };
    }
}

/**
 * Returns the singleton instance of the GlobalVariablesManager.
 * @returns {GlobalVariablesManager} The singleton instance.
 */
export const getGlobalVariablesManagerInstance = (): GlobalVariablesManager => {
    return GlobalVariablesManager.getInstance();
};
