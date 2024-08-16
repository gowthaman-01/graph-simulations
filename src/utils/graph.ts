import { getCellIdFromRowAndColumn, randomWeight } from './general';
import {
    Graph,
    GraphStorage,
    GraphStructure,
    GraphType,
    Nodes,
    StartEndNodes,
} from '../common/types';
import { MAX_WEIGHT } from '../common/constants';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import aStarExampleGraphs from '../examples/aStar-data.json';
import dijkstraExampleGraphs from '../examples/dijkstra-data.json';
import bellmanFordExampleGraphs from '../examples/bellmanFord-data.json';
import bfsExampleGraphs from '../examples/bfs-data.json';

/**
 * Recreates the graph on subsequent renders.
 *
 * @returns {GraphStructure} The recreated graph as well as the collection of nodes.
 */
export const recreateGraph = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const graphType = globalVariablesManager.getGraphType();

    switch (graphType) {
        case GraphType.Dfs:
            return createMazeGraphUsingDfs();
        case GraphType.RandomWalls:
            return createMazeGraphWithRandomWalls();
        case GraphType.RecursiveDivision:
            return createMazeGraphUsingRecursiveDivision();
        default:
            const maxWeight = globalVariablesManager.getMaxWeight();
            return createBasicGridGraph(maxWeight);
    }
};

/**
 * Creates a basic grid graph with the specified max weight and graphType.
 */
export const createBasicGridGraph = (maxWeight: number, gridSize?: number): GraphStructure => {
    const graph: Graph = {};
    const nodes: Nodes = [];

    if (!gridSize) {
        const globalVariablesManager = getGlobalVariablesManagerInstance();
        gridSize = globalVariablesManager.getGridSize();

        // Reset Start and End nodes if they are not within grid limits.
        if (
            globalVariablesManager.getStartNode() >= gridSize ||
            globalVariablesManager.getEndNode() >= gridSize
        ) {
            const { startNode, endNode } = generateStartAndEndNode(gridSize);
            globalVariablesManager.setStartNode(startNode);
            globalVariablesManager.setEndNode(endNode);
        }
    }

    const cols = Math.sqrt(gridSize);

    // Create nodes with random weights.
    for (let i = 0; i < gridSize; i++) {
        nodes[i] = randomWeight(maxWeight);
    }

    // Create graph.
    for (let i = 0; i < gridSize; i++) {
        // Initialize each node with an empty array of neighbors
        graph[i] = [];

        const up = i - cols;
        const down = i + cols;
        const left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        // Collate valid neighbors.
        const neighbors = [];
        if (up >= 0) neighbors.push(up);
        if (down < gridSize) neighbors.push(down);
        if (left !== -1) neighbors.push(left);
        if (right !== -1) neighbors.push(right);

        // Add valid neighbors.
        neighbors.forEach((neighbor) => {
            graph[i].push(neighbor);
        });
    }

    return { graph, nodes };
};

/**
 * Creates a maze graph using Depth-First Search (DFS) algorithm.
 *
 * Generates a maze graph with a defined start and end node. The DFS algorithm is used to create a path
 * from the start node to the end node. The resulting graph nodes that are not part of the final DFS path
 * are assigned a maximum weight, while those on the path are assigned a weight of 1.
 *
 * @returns {GraphStructure} The maze graph with nodes and their weights.
 */
const createMazeGraphUsingDfs = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const gridSize = globalVariablesManager.getGridSize();
    const cols = Math.sqrt(gridSize);

    const { startNode, endNode } = generateStartAndEndNodeForMazeGraph(gridSize);
    globalVariablesManager.setStartNode(startNode);
    globalVariablesManager.setEndNode(endNode);

    const { graph, nodes } = createBasicGridGraph(0);
    const finalPath = new Set<number>();

    const dfs = (currentNode: number, path: number[], visited: Set<number>) => {
        if (visited.has(currentNode)) {
            return;
        }

        visited.add(currentNode);
        path.push(currentNode);

        if (currentNode === endNode) {
            path.forEach((node) => finalPath.add(node));
            return;
        }

        let neighbors = graph[currentNode];
        // Shuffle the neighbors so we visit them in a random order.
        neighbors = neighbors.sort(() => Math.random() - 0.5);

        neighbors.forEach((neighbor) => dfs(neighbor, path, visited));

        path.pop();
    };

    dfs(startNode, [], new Set());

    for (let i = 0; i < gridSize; i++) {
        // We mark nodes that are not in the final DFS path with the max weight.
        if (!finalPath.has(i)) {
            nodes[i] = MAX_WEIGHT;
        } else {
            nodes[i] = 1;
        }
    }

    const isWeighted = globalVariablesManager.getIsWeighted();

    for (let i = 0; i < gridSize; i++) {
        graph[i] = [];

        const up = i - cols;
        const down = i + cols;
        const left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        // Collate valid neighbors.
        const neighbors = [];
        if (up >= 0 && (isWeighted || (!isWeighted && finalPath.has(up)))) neighbors.push(up);
        if (down < gridSize && (isWeighted || (!isWeighted && finalPath.has(down))))
            neighbors.push(down);
        if (left !== -1 && (isWeighted || (!isWeighted && finalPath.has(left))))
            neighbors.push(left);
        if (right !== -1 && (isWeighted || (!isWeighted && finalPath.has(right))))
            neighbors.push(right);

        // Add valid neighbors.
        neighbors.forEach((neighbor) => {
            graph[i].push(neighbor);
        });
    }

    return { graph, nodes };
};

/**
 * Generates a grid-based graph where certain cells are randomly designated as walls,
 * @returns {GraphStructure} The maze graph with nodes and their weights.
 */
const createMazeGraphWithRandomWalls = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const gridSize = globalVariablesManager.getGridSize();
    const cols = Math.sqrt(gridSize);

    const { startNode, endNode } = generateStartAndEndNodeForMazeGraph(gridSize);
    globalVariablesManager.setStartNode(startNode);
    globalVariablesManager.setEndNode(endNode);

    const graph: Graph = {};
    const nodes: Nodes = [];

    const walls = new Set<number>();

    // Set random cells as walls
    for (let i = 0; i < gridSize; i++) {
        if (i === startNode || i === endNode) continue;
        // We want to generate less walls than paths.
        if (Math.random() < 0.4) {
            walls.add(i);
        }
    }

    for (let i = 0; i < gridSize; i++) {
        // We mark walls with the max weight.
        if (walls.has(i)) {
            nodes[i] = MAX_WEIGHT;
        } else {
            nodes[i] = 1;
        }
    }

    const isWeighted = globalVariablesManager.getIsWeighted();

    for (let i = 0; i < gridSize; i++) {
        graph[i] = [];

        const up = i - cols;
        const down = i + cols;
        const left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        // Collate valid neighbors.
        const neighbors = [];
        if (up >= 0 && (isWeighted || (!isWeighted && !walls.has(up)))) neighbors.push(up);
        if (down < gridSize && (isWeighted || (!isWeighted && !walls.has(down))))
            neighbors.push(down);
        if (left !== -1 && (isWeighted || (!isWeighted && !walls.has(left)))) neighbors.push(left);
        if (right !== -1 && (isWeighted || (!isWeighted && !walls.has(right))))
            neighbors.push(right);

        // Add valid neighbors.
        neighbors.forEach((neighbor) => {
            graph[i].push(neighbor);
        });
    }
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

    recrusiveDivide(0, rows - 1, 0, cols - 1, walls, passageMap);

    for (let i = 0; i < gridSize; i++) {
        // We mark walls with the max weight.
        if (walls.has(i)) {
            nodes[i] = MAX_WEIGHT;
        } else {
            nodes[i] = 1;
        }
    }

    const isWeighted = globalVariablesManager.getIsWeighted();

    for (let i = 0; i < gridSize; i++) {
        graph[i] = [];

        // Direct neighbors
        const up = i - cols;
        const down = i + cols;
        const left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        // Collate valid neighbors.
        const neighbors = [];
        if (up >= 0 && (isWeighted || (!isWeighted && !walls.has(up)))) neighbors.push(up);
        if (down < gridSize && (isWeighted || (!isWeighted && !walls.has(down))))
            neighbors.push(down);
        if (left !== -1 && (isWeighted || (!isWeighted && !walls.has(left)))) neighbors.push(left);
        if (right !== -1 && (isWeighted || (!isWeighted && !walls.has(right))))
            neighbors.push(right);

        // Add valid neighbors.
        neighbors.forEach((neighbor) => {
            graph[i].push(neighbor);
        });
    }

    let { startNode, endNode } = generateStartAndEndNode(gridSize);

    while (walls.has(startNode)) {
        startNode = generateStartAndEndNode(gridSize).startNode;
    }
    while (walls.has(endNode)) {
        endNode = generateStartAndEndNode(gridSize).endNode;
    }

    globalVariablesManager.setStartNode(startNode);
    globalVariablesManager.setEndNode(endNode);

    return { graph, nodes };
};

/**
 * Recursive function to divide the grid into passages and walls using either horizontal or vertical orientation.
 */
const recrusiveDivide = (
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number,
    walls: Set<number>,
    passageMap: Set<number>,
) => {
    if (endRow - startRow < 2 || endCol - startCol < 2) return;

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
        // Mark all cells on the column as walls except for one.
        let wallCol = startCol + Math.floor(Math.random() * avaialbleCols) + 1;
        let allowedRerenders = avaialbleCols;
        while (passageMap.has(wallCol) && allowedRerenders--) {
            if (!allowedRerenders) return;
            wallCol = startCol + Math.floor(Math.random() * avaialbleCols) + 1;
        }
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

export const getExampleGraph = (graphType: GraphType): GraphStorage => {
    switch (graphType) {
        // case GraphType.IdealAStar:
        //     return aStarExampleGraphs[
        //         Math.floor(Math.random() * aStarExampleGraphs.length)
        //     ] as GraphStorage;
        // case GraphType.IdealDijkstra:
        //     return dijkstraExampleGraphs[
        //         Math.floor(Math.random() * dijkstraExampleGraphs.length)
        //     ] as GraphStorage;
        // case GraphType.IdealBellmanFord:
        //     return bellmanFordExampleGraphs[
        //         Math.floor(Math.random() * bellmanFordExampleGraphs.length)
        //     ] as GraphStorage;
        // case GraphType.IdealBfs:
        //     return bfsExampleGraphs[
        //         Math.floor(Math.random() * bfsExampleGraphs.length)
        //     ] as GraphStorage;
        default:
            throw new Error(
                `Invalid graph type: ${graphType}. Expected one of: IdealAStar, IdealDijkstra, IdealBellmanFord, IdealBfs.`,
            );
    }
};

/**
 * Generates a random start and end node indices within the grid size.
 * @returns An object containing both start and end node indices
 */
export const generateStartAndEndNode = (gridSize: number): StartEndNodes => {
    const newStartNode = Math.floor(Math.random() * gridSize);
    let newEndNode;
    do {
        newEndNode = Math.floor(Math.random() * gridSize);
    } while (newStartNode === newEndNode);
    return { startNode: newStartNode, endNode: newEndNode };
};

/**
 * Generates start and end nodes for a maze graph, ensuring they are placed on different corners of the grid.
 * @returns An object containing both start and end node indices
 */
const generateStartAndEndNodeForMazeGraph = (gridSize: number): StartEndNodes => {
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
    let endNode = possibleMazeGraphStartEndIndices[Math.floor(Math.random() * 4)];

    // Ensure startNode and endNode are different.
    while (startNode === endNode) {
        endNode = possibleMazeGraphStartEndIndices[Math.floor(Math.random() * 4)];
    }

    return { startNode, endNode };
};
