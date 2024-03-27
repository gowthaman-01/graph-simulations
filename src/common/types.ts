/**
 * Represents a neighbor node in a graph.
 */
export interface Neighbor {
    node: string;
    distance: number;
}

/**
 * Represents a graph where each node is associated with a list of neighboring nodes.
 */
export interface Graph {
    [key: string]: Neighbor[];
}

/**
 * Represents a mapping of distances between nodes.
 */
export interface Distances {
    [key: string]: number;
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
    node: string;
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
 * Enumerates different types of cell highlights for visualization purposes.
 */
export enum HighlightType {
    Unvisited,
    Visiting,
    Visited,
    ShortestPath,
}

/**
 * Enumerates different types of graph traversal algorithms.
 */
export enum AlgorithmType {
    Bfs = 'bfs',
    Djikstra = 'djikstra',
}
