import { CustomDropdown } from '../utils/CustomDropdown';
import { GRAPH_POSITION } from './constants';

export type Node = number;

export type ShortestPathNode = {
    nodeId: Node;
    direction: NodeState;
};

export type Nodes = Node[];

export enum NodeState {
    Unvisited = 'unvisited',
    Visiting = 'visiting',
    Exploring = 'exploring',
    Visited = 'visited',
    ShortestPathUp = 'shortest-path-up',
    ShortestPathDown = 'shortest-path-down',
    ShortestPathLeft = 'shortest-path-left',
    ShortestPathRight = 'shortest-path-right',
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
    position: GRAPH_POSITION;
    algorithmType: AlgorithmType;
}

export type VisitedSet = boolean[];

export enum GraphType {
    Standard = 'Standard',
    DFS = 'DFS',
    RandomWalls = 'RandomWalls',
    RecursiveDivision = 'RecursiveDivision',
    Custom = 'Custom',
}

export enum PrimaryGraphType {
    Standard = 'Standard',
    Maze = 'Maze',
    Custom = 'Custom',
}

export type SecondaryGraphType = MazeType | AlgorithmType;

export enum AlgorithmType {
    BFS = 'BFS',
    Dijkstra = 'Dijkstra',
    AStar = 'A* Search',
    BellmanFord = 'Bellman-Ford',
    Greedy = 'Greedy',
    DFS = 'DFS',
    Editor = 'Editor',
}

export enum MazeType {
    RecursiveDivision = 'RecursiveDivision',
    DFS = 'DFS',
    RandomWalls = 'RandomWalls',
}

export enum HeuristicType {
    Manhattan = 'Manhattan',
    Euclidean = 'Euclidean',
}

export enum SimulationSpeed {
    Average = 'Average',
    Fast = 'Fast',
    Slow = 'Slow',
}

export enum WeightType {
    Unweighted = 'Unweighted',
    NonNegative = 'Non-Negative',
    Negative = 'Negative',
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

export interface Dropdowns {
    leftGraphDropdown: CustomDropdown;
    rightGraphDropdown: CustomDropdown;
    secondaryGraphTypeDropdown: CustomDropdown;
    primaryGraphTypeDropdown: CustomDropdown;
    speedDropdown: CustomDropdown;
    heuristicTypeDropdown: CustomDropdown;
    weightDropdown: CustomDropdown;
}
