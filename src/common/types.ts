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

export enum GraphType {
    Unweighted = 'unweighted',
    Weighted = 'weighted',
    NegativeWeight = 'negative-weighted',
    Directed = 'directed',
}

export interface NodeMetadata {
    id: string;
    state: NodeState;
    weight: number;
}

export interface NodeMetadataMap {
    [id: string]: NodeMetadata;
}

export interface StepMetadata {
    steps: number;
    nodeMetaDataMap: NodeMetadataMap;
}

export interface NewNodeState {
    id: string;
    newState: NodeState;
}
