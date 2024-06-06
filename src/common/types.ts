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

/**
 * Contains essential information regarding the graph.
 */
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
 * Enumerates different types of graph traversal algorithms.
 */
export enum AlgorithmType {
    Bfs = 'bfs',
    Djikstra = 'djikstra',
    AStar = 'aStar',
    BellmanFord = 'bellmanFord',
}

/**
 * Enumerates different types of node state for visualization purposes. For v3.
 */
export enum NodeState {
    Unvisited = 'unvisited',
    Visiting = 'visiting',
    Visited = 'visited',
    ShortestPath = 'shortest-path',
    StartNode = 'start',
    EndNode = 'end',
}

/**
 * Enumerates different types of graph structures.
 */
export enum GraphType {
    Unweighted = 'unweighted',
    Weighted = 'weighted',
    NegativeWeight = 'negative-weighted',
    Directed = 'directed',
    MazeDfs = 'maze-dfs',
    RandomWalls = 'random-walls',
    MazeRecursiveDivision = 'maze-recursive-division',
    DjikstraExample = 'djikstra-example',
    AStarExample = 'aStar-example',
    BellmanFordExample = 'bellman-example',
    BfsExample = 'bfs-example',
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

export enum AStarHeuristicType {
    Manhattan = 'manhattan',
    Euclidean = 'eucledian',
}

export enum AStarHeuristicInfluence {
    Strong = 'strong',
    Balanced = 'balanced',
    Mild = 'mild',
}
