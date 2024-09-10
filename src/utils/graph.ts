import { getCellIdFromRowAndColumn, randomWeight, shuffleArray } from './general';
import {
    Graph,
    GraphStorage,
    GraphStructure,
    GraphType,
    Nodes,
    StartEndNodes,
    EnvironmentType,
} from '../common/types';
import { getGlobalVariablesManagerInstance } from '../classes/GlobalVariablesManager';
import { DEFAULT_WEIGHT, MAX_WEIGHT } from '../common/constants';

/**
 * Generates a new graph using the current graph type and ensures that there is a valid path
 * from the start node to the end node.
 *
 * @param callback - A callback function that is called after each graph is generated.
 * @returns {void}
 */
export const generateNewGraphWithReachableEndNode = (callback: () => void) => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    do {
        generateAndStoreNewGraph();
        callback();
    } while (!globalVariablesManager.isEndNodeReachable());
};

const generateAndStoreNewGraph = () => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const graphType = globalVariablesManager.getGraphType();

    let newGraph: GraphStructure;

    switch (graphType) {
        case GraphType.DFS:
            newGraph = createMazeGraphUsingDfs();
            break;
        case GraphType.RandomWalls:
            newGraph = createMazeGraphWithRandomWalls();
            break;
        case GraphType.RecursiveDivision:
            newGraph = createMazeGraphUsingRecursiveDivision();
            break;
        default:
            newGraph = createBasicGridGraphDuringSubsequentRenders();
    }

    globalVariablesManager.setGraph(newGraph);
};

export const generateStartAndEndNodeForStandardGraph = (
    nodes: Nodes,
    gridSize: number,
): StartEndNodes => {
    const isValidNode = (node: number) => nodes[node] <= 10 && node < gridSize;

    let startNode;
    do {
        startNode = Math.floor(Math.random() * gridSize);
    } while (!isValidNode(startNode));

    let endNode;
    do {
        endNode = Math.floor(Math.random() * gridSize);
    } while (startNode === endNode || !isValidNode(endNode));

    return { startNode, endNode };
};

const generateAndStoreStartAndEndNodeForMazeGraph = (): StartEndNodes => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const gridSize = globalVariablesManager.getGridSize();
    const rows = Math.sqrt(gridSize);
    const cols = Math.sqrt(gridSize);

    // The maze graph's start and end nodes can be on one of each corner of the grid.
    const possibleMazeGraphStartEndIndices = [
        0, // Top left
        cols - 1, // Top right
        (rows - 1) * cols, // Bottom left
        gridSize - 1, // Bottom right
    ];

    const startNode = possibleMazeGraphStartEndIndices[Math.floor(Math.random() * 4)];
    let endNode: number;

    // Ensure startNode and endNode are different.
    do {
        endNode = possibleMazeGraphStartEndIndices[Math.floor(Math.random() * 4)];
    } while (startNode === endNode);

    globalVariablesManager.setStartNode(startNode);
    globalVariablesManager.setEndNode(endNode);

    return { startNode, endNode };
};

/**
 * Iterates through each node in the grid and establishes connections to its valid neighboring nodes.
 * Ensures that the connections are valid based on the grid's structure and the node's position.
 *
 * @param {Graph} graph - The graph structure to which connections will be added.
 * @param {number} gridSize - The size of the grid.
 */
const createGraphConnections = (graph: Graph, gridSize: number): void => {
    const numCols = Math.sqrt(gridSize);

    for (let i = 0; i < gridSize; i++) {
        // Initialize each node with an empty array of neighbors
        graph[i] = [];

        const up = i - numCols;
        const down = i + numCols;
        const left = i % numCols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % numCols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        // Add valid neighbors to the graph.
        if (up >= 0) graph[i].push(up);
        if (down < gridSize) graph[i].push(down);
        if (left !== -1) graph[i].push(left);
        if (right !== -1) graph[i].push(right);
    }
};

const createBasicGridGraphDuringSubsequentRenders = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const isWeighted = globalVariablesManager.getEnvironmentType() !== EnvironmentType.FlatTerrain;
    const gridSize = globalVariablesManager.getGridSize();
    const graphStorage = createBasicGridGraph(isWeighted, gridSize);

    globalVariablesManager.setStartNode(graphStorage.startNode);
    globalVariablesManager.setEndNode(graphStorage.endNode);

    return { graph: graphStorage.graph, nodes: graphStorage.nodes };
};

export const createBasicGridGraph = (isWeighted: boolean, gridSize: number): GraphStorage => {
    const graph: Graph = {};
    const nodes: Nodes = [];

    // Create nodes with random weights.
    for (let i = 0; i < gridSize; i++) {
        nodes[i] = isWeighted ? randomWeight(DEFAULT_WEIGHT) : 0;
    }

    createGraphConnections(graph, gridSize);
    const { startNode, endNode } = generateStartAndEndNodeForStandardGraph(nodes, gridSize);
    return { graph, nodes, startNode, endNode };
};

/**
 * Creates a maze graph using Depth-First Search (DFS) algorithm.
 *
 * Generates a maze graph with a defined start and end node. The DFS algorithm is used to create a path
 * from the start node to the end node. The resulting graph nodes that are not part of the final DFS path
 * are assigned a maximum weight, while those on the path are assigned a weight of 1.
 *
 * @returns {GraphStructure} The generated maze graph structure, including the graph connections and node weights.
 */
const createMazeGraphUsingDfs = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const gridSize = globalVariablesManager.getGridSize();

    // Generate and set the start and end nodes for the maze graph.
    const { startNode, endNode } = generateAndStoreStartAndEndNodeForMazeGraph();

    // Initialize the graph with no weights (all weights set to 0).
    const { graph, nodes } = createBasicGridGraph(false, gridSize);
    const finalPath = new Set<number>();

    // Recursive Depth-First Search function to explore the grid and generate the maze path.
    const dfs = (currentNode: number, path: number[], visited: Set<number>) => {
        if (visited.has(currentNode)) {
            return;
        }

        visited.add(currentNode);
        path.push(currentNode);

        if (currentNode === endNode) {
            // If the end node is reached, mark the path as the final path.
            path.forEach((node) => finalPath.add(node));
            return;
        }

        // Shuffle the neighbors so we visit them in a random order.
        let neighbors = shuffleArray(graph[currentNode]);

        neighbors.forEach((neighbor) => dfs(neighbor, path, visited));

        // Backtrack to explore alternative paths.
        path.pop();
    };

    // Start DFS from the start node to generate the maze.
    dfs(startNode, [], new Set());

    const isWeighted = globalVariablesManager.getEnvironmentType() !== EnvironmentType.FlatTerrain;

    // Assign maximum weight to nodes not in the final path, marking them as walls.
    for (let i = 0; i < gridSize; i++) {
        if (!finalPath.has(i)) {
            nodes[i] = Infinity;
        } else {
            nodes[i] = isWeighted ? randomWeight(MAX_WEIGHT / 2) : 0;
        }
    }

    createGraphConnections(graph, gridSize);

    return { graph, nodes };
};

/**
 * Generates a grid-based graph where certain cells are randomly designated as walls.
 *
 * This function creates a maze by randomly assigning some cells in the grid as walls, with a lower probability of generating walls to ensure more navigable paths.
 * The start and end nodes are always excluded from being walls.
 *
 * @returns {GraphStructure} The maze graph structure, including the graph connections and node weights.
 */
const createMazeGraphWithRandomWalls = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const gridSize = globalVariablesManager.getGridSize();

    // Generate and set the start and end nodes for the maze graph.
    const { startNode, endNode } = generateAndStoreStartAndEndNodeForMazeGraph();

    const graph: Graph = {};
    const nodes: Nodes = [];

    const walls = new Set<number>();

    // Set random cells as walls
    for (let i = 0; i < gridSize; i++) {
        if (i === startNode || i === endNode) continue;
        // Lower probability of generating walls to ensure more navigable paths
        if (Math.random() < 0.4) {
            walls.add(i);
        }
    }

    const isWeighted = globalVariablesManager.getEnvironmentType() !== EnvironmentType.FlatTerrain;

    // Assign maximum weight to wall nodes, minimal weight to path nodes
    for (let i = 0; i < gridSize; i++) {
        if (walls.has(i)) {
            nodes[i] = Infinity;
        } else {
            nodes[i] = isWeighted ? randomWeight(MAX_WEIGHT / 2) : 0;
        }
    }

    createGraphConnections(graph, gridSize);

    return { graph, nodes };
};

/**
 * Generates a grid-based graph where cells are divided recursively to create passages and walls with the following steps:
 * - Divides the grid into passages and walls based on random horizontal or vertical orientation.
 * - Ensures connectivity by marking certain cells as walls to define the maze structure.
 * - Assigns weights to nodes based on whether they are walls or paths.
 * - Establishes edges between adjacent nodes, respecting wall constraints and optionally considering node weights.
 *
 * @returns {GraphStructure} An object containing the generated graph structure with nodes and edges.
 */
const createMazeGraphUsingRecursiveDivision = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const gridSize = globalVariablesManager.getGridSize();
    const cols = Math.sqrt(gridSize);
    const rows = cols;

    const graph: Graph = {};
    const nodes: Nodes = [];

    const walls = new Set<number>();
    const passageMap = new Set<number>();

    // Start the recursive division process to create walls and passages.
    recrusiveDivide(0, rows - 1, 0, cols - 1, walls, passageMap);

    const isWeighted = globalVariablesManager.getEnvironmentType() !== EnvironmentType.FlatTerrain;

    // Assign maximum weight to wall nodes, minimal weight to path nodes
    for (let i = 0; i < gridSize; i++) {
        if (walls.has(i)) {
            nodes[i] = Infinity;
        } else {
            nodes[i] = isWeighted ? randomWeight(MAX_WEIGHT / 2) : 0;
        }
    }

    createGraphConnections(graph, gridSize);

    // Generate start and end nodes, ensuring they are placed in non-wall locations.
    let startNode, endNode;
    do {
        ({ startNode, endNode } = generateAndStoreStartAndEndNodeForMazeGraph());
    } while (walls.has(startNode) || walls.has(endNode));

    return { graph, nodes };
};

/**
 * Recursively divides the grid into passages and walls using either horizontal or vertical orientation.
 *
 * This function alternates between dividing the grid horizontally and vertically, creating walls with
 * a single passage in each division. It stops dividing when the available rows or columns are too small.
 *
 * @param {number} startRow - The starting row of the current division.
 * @param {number} endRow - The ending row of the current division.
 * @param {number} startCol - The starting column of the current division.
 * @param {number} endCol - The ending column of the current division.
 * @param {Set<number>} walls - A set to store the positions of the wall nodes.
 * @param {Set<number>} passageMap - A set to keep track of passages to avoid overlaps.
 */
const recrusiveDivide = (
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number,
    walls: Set<number>,
    passageMap: Set<number>,
) => {
    // Base case: Stop dividing if the available space is too small.
    if (endRow - startRow < 2 || endCol - startCol < 2) return;

    // Determine the orientation of the division.
    let availableRows = endRow - startRow - 1;
    let avaialbleCols = endCol - startCol - 1;
    let orientation;

    if (availableRows > avaialbleCols) {
        orientation = 'H';
    } else if (availableRows < avaialbleCols) {
        orientation = 'V';
    } else {
        orientation = Math.random() < 0.5 ? 'H' : 'V';
    }

    if (orientation === 'H') {
        // Perform a horizontal division.
        let wallRow = startRow + Math.floor(Math.random() * availableRows) + 1;
        let allowedRerenders = availableRows;
        while (passageMap.has(wallRow) && allowedRerenders--) {
            if (!allowedRerenders) return;
            wallRow = startRow + Math.floor(Math.random() * availableRows) + 1;
        }
        const passageCol = startCol + Math.floor(Math.random() * avaialbleCols) + 1;
        // Mark all cells on the row as walls except for one.
        for (let col = startCol; col <= endCol; col++) {
            if (col !== passageCol) {
                walls.add(getCellIdFromRowAndColumn(wallRow, col));
            }
        }
        passageMap.add(passageCol);
        recrusiveDivide(startRow, wallRow - 1, startCol, endCol, walls, passageMap);
        recrusiveDivide(wallRow + 1, endRow, startCol, endCol, walls, passageMap);
    } else {
        // Perform a vertical division.
        let wallCol = startCol + Math.floor(Math.random() * avaialbleCols) + 1;
        let allowedRerenders = avaialbleCols;
        while (passageMap.has(wallCol) && allowedRerenders--) {
            if (!allowedRerenders) return;
            wallCol = startCol + Math.floor(Math.random() * avaialbleCols) + 1;
        }
        // Mark all cells on the column as walls except for one.
        const passageRow = startRow + Math.floor(Math.random() * availableRows) + 1;
        for (let row = startRow; row <= endRow; row++) {
            if (row !== passageRow) {
                walls.add(getCellIdFromRowAndColumn(row, wallCol));
            }
        }
        passageMap.add(passageRow);
        recrusiveDivide(startRow, endRow, startCol, wallCol - 1, walls, passageMap);
        recrusiveDivide(startRow, endRow, wallCol + 1, endCol, walls, passageMap);
    }
};

/**
 * Calculates the weight between a current node and its neighbor based on the weight type setting.
 *
 * @param {number} currentNodeWeight - The weight of the current node.
 * @param {number} neighborNodeWeight - The weight of the neighboring node.
 * @returns {number} The calculated weight between the current node and its neighbor.
 */
export const getNeighborWeight = (
    currentNodeWeight: number,
    neighborNodeWeight: number,
    calculatingTotalWeight: boolean = false,
): number => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    switch (globalVariablesManager.getEnvironmentType()) {
        case EnvironmentType.FlatTerrain:
            return calculatingTotalWeight ? 0 : 1;
        case EnvironmentType.ElevatedTerrain:
            return neighborNodeWeight - currentNodeWeight >= 0
                ? calculatingTotalWeight
                    ? Math.max(neighborNodeWeight, 0)
                    : Math.max(neighborNodeWeight, 1)
                : -Math.floor(Math.sqrt(Math.abs(neighborNodeWeight - currentNodeWeight)));
        case EnvironmentType.RoadNetwork:
            return calculatingTotalWeight
                ? Math.max(neighborNodeWeight, 0)
                : Math.max(neighborNodeWeight, 1);
    }
};
