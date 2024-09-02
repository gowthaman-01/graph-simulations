export type Node = number;

export type Nodes = Node[];

export enum NodeState {
    Unvisited = 'unvisited',
    Visiting = 'visiting',
    Exploring = 'exploring',
    Visited = 'visited',
    ShortestPath = 'shortest-path',
    StartNode = 'start',
    EndNode = 'end',
}

export interface StartEndNodes {
    startNode: number;
    endNode: number;
}

export type Graph = Record<Node, Nodes>;

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

export type VisitedSet = boolean[];

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

export enum AlgorithmType {
    Bfs = 'bfs',
    Dijkstra = 'dijkstra',
    AStar = 'aStar',
    BellmanFord = 'bellmanFord',
    Greedy = 'greedy',
    Dfs = 'dfs',
}

export enum MazeType {
    RecursiveDivision = 'Recursive Divide',
    Dfs = 'DFS',
    RandomWalls = 'Random walls',
}

export enum HeuristicType {
    Manhattan = 'manhattan',
    Euclidean = 'euclidean',
}

export enum SimulationSpeed {
    Average = 'average',
    Fast = 'fast',
    Slow = 'slow',
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
    id: Node;
    priority: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
}
