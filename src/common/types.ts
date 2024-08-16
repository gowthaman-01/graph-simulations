export interface Node {
    id: string;
    weight: number;
}

export type Nodes = Record<string, Node>;

export enum NodeState {
    Unvisited = 'unvisited',
    Visiting = 'visiting',
    Exploring = 'exploring',
    Visited = 'visited',
    ShortestPath = 'shortest-path',
    StartNode = 'start',
    EndNode = 'end',
}

export interface NewNodeState {
    id: string;
    newState: NodeState;
}

export interface NodeMetadata {
    id: string;
    state: NodeState;
}

export type NodeMetadataMap = Record<string, NodeMetadata>;

export interface StartEndNodes {
    startNode: number;
    endNode: number;
}

export type Graph = Record<string, Node[]>;

export enum GraphType {
    Standard,
    Dfs,
    RandomWalls,
    RecursiveDivision,
    IdealBfs,
    IdealDijkstra,
    IdealBellmanFord,
    IdealAStar,
}

export enum PrimaryGraphType {
    Standard = 'standard',
    Maze = 'maze',
    Ideal = 'ideal',
}

export type SecondaryGraphType = MazeType | AlgorithmType;

export interface GraphStructure {
    graph: Graph;
    nodes: Nodes;
}

export interface GraphStorage extends GraphStructure {
    startNode: number;
    endNode: number;
}

export interface GraphDiv {
    graphDivElement: HTMLDivElement;
    position: 'left' | 'right';
    algorithmType: AlgorithmType;
}

export enum MazeType {
    RecursiveDivision = 'Recursive Divide',
    Dfs = 'DFS',
    RandomWalls = 'Random walls',
}

export enum AStarHeuristicType {
    Manhattan = 'manhattan',
    Euclidean = 'euclidean',
}

export enum AlgorithmType {
    Bfs = 'bfs',
    Dijkstra = 'dijkstra',
    AStar = 'aStar',
    BellmanFord = 'bellmanFord',
}

export enum SimulationSpeed {
    Average = 'average',
    Fast = 'fast',
    Slow = 'slow',
}

export interface StepMetadata {
    steps: number;
    nodeMetadataMap: NodeMetadataMap;
}

export interface TutorialData {
    pageNumber: number;
    title: string;
    body: string;
    img?: ImageData;
}

export interface ImageData {
    src: string;
    width: number;
    marginTop: number;
}

export interface HeapNode {
    id: string;
    priority: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}

export type VisitedSet = Record<string, boolean>;
