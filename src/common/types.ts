/**
 * Represents a node in a graph.
 */
export interface Node {
    id: string;
    weight: number;
}

/**
 * Represents a collection of nodes.
 */
export interface Nodes {
    [id: string]: Node;
}

/**
 * Represents a graph where each node is associated with a list of neighboring nodes.
 */
export interface Graph {
    [id: string]: Node[];
}

export interface GraphStructure {
    graph: Graph;
    nodes: Nodes;
}

export interface GraphStorage {
    graph: Graph;
    nodes: Nodes;
    startNode: number;
    endNode: number;
}

/**
 * Represents a set of visited nodes.
 */
export interface VisitedSet {
    [key: string]: boolean;
}

/**
 * Represents a node in a heap data structure.
 */
export interface HeapNode {
    id: string;
    priority: number;
}

/**
 * Represents a RGB color.
 */
export interface Color {
    r: number;
    g: number;
    b: number;
}

/**
 * Metadata associated with a node in the graph.
 */
export interface NodeMetadata {
    id: string;
    state: NodeState;
    weight: number;
}

/**
 * Map containing metadata for each node in the graph.
 */
export interface NodeMetadataMap {
    [id: string]: NodeMetadata;
}

/**
 * Metadata associated with each step in the algorithm.
 */
export interface StepMetadata {
    steps: number;
    nodeMetaDataMap: NodeMetadataMap;
}

/**
 * Represents a change in state for a specific node.
 */
export interface NewNodeState {
    id: string;
    newState: NodeState;
}

export interface TutrorialData {
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

export enum AlgorithmType {
    Bfs = 'bfs',
    Dijkstra = 'dijkstra',
    AStar = 'aStar',
    BellmanFord = 'bellmanFord',
}

export enum NodeState {
    Unvisited = 'unvisited',
    Visiting = 'visiting',
    Exploring = 'exploring',
    Visited = 'visited',
    ShortestPath = 'shortest-path',
    StartNode = 'start',
    EndNode = 'end',
}

export enum PrimaryGraphType {
    Standard = 'standard',
    Maze = 'maze',
    Ideal = 'ideal',
}

export enum MazeType {
    RecrusiveDivision = 'Recursive Division',
    Dfs = 'DFS',
    RandomWalls = 'Random walls',
}

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

export enum AStarHeuristicType {
    Manhattan = 'manhattan',
    Euclidean = 'eucledian',
}

export type SecondaryGraphType = MazeType | AlgorithmType;
