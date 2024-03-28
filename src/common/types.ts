/**
 * Represents a node in a graph.
 */
export interface Node {
    id: string;
    distance: number;
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
 * Enumerates different types of ccell marking for visualization purposes.
 */
export enum MarkType {
    Unvisited = 'unvisited',
    Visiting = 'visiting',
    Visited = 'visited',
    ShortestPath = 'shortest-path',
}

/**
 * Enumerates different types of graph traversal algorithms.
 */
export enum AlgorithmType {
    Bfs = 'bfs',
    Djikstra = 'djikstra',
}
