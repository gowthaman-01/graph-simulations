import { getCellIdFromRowAndColumn, randomWeight } from './general';
import { Graph, GraphStorage, GraphStructure, GraphType, Node, Nodes } from '../common/types';
import { GRID_SIZE, COLS, ROWS, MAX_WEIGHT } from '../common/constants';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import aStarExampleGraphs from '../examples/aStar-data.json';
import dijkstraExampleGraphs from '../examples/dijkstra-data.json';
import bellmanFordExampleGraphs from '../examples/bellmanFord-data.json';
import bfsExampleGraphs from '../examples/bfs-data.json';

/**
 * Recreates the grid graph on subsequent renders based on global variables.
 *
 * @returns {GraphStructure} The created grid graph as well as the collection of nodes.
 */
export const recreateGridGraph = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const maxWeight = globalVariablesManager.getMaxWeight();
    const graphType = globalVariablesManager.getGraphType();
    const isWeighted = globalVariablesManager.getIsWeighted();

    switch (graphType) {
        case GraphType.Dfs:
            return createMazeGraphUsingDfs();
        case GraphType.RandomWalls:
            return createMazeGraphWithRandomWalls();
        case GraphType.RecursiveDivision:
            return createMazeGraphUsingRecursiveDivision();
        default:
            return createGridGraph(maxWeight, isWeighted);
    }
};

/**
 * Creates a grid graph with the specified max weight and graphType.
 *
 * @returns {GraphStructure} The created grid graph as well as the collection of nodes.
 */
export const createGridGraph = (maxWeight: number, isWeighted: boolean): GraphStructure => {
    const graph: Graph = {};
    const nodes: Nodes = {};

    // Create nodes with random weights.
    for (let i = 0; i < GRID_SIZE; i++) {
        nodes[i] = { id: i.toString(), weight: randomWeight(maxWeight) };
    }

    // Create graph.
    for (let i = 0; i < GRID_SIZE; i++) {
        graph[i.toString()] = []; // Initialize each node with an empty array of neighbors
        const currentWeight = nodes[i].weight;

        // Direct neighbors
        const up = i - COLS;
        const down = i + COLS;
        const left = i % COLS !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % COLS !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        if (up >= 0)
            addAdjacentNode(
                graph,
                i,
                up,
                currentWeight,
                nodes[up.toString()].weight,
                isWeighted,
                false,
            );

        if (down < GRID_SIZE)
            addAdjacentNode(
                graph,
                i,
                down,
                currentWeight,
                nodes[down.toString()].weight,
                isWeighted,
                false,
            );

        if (left !== -1)
            addAdjacentNode(
                graph,
                i,
                left,
                currentWeight,
                nodes[left.toString()].weight,
                isWeighted,
                false,
            );

        if (right !== -1)
            addAdjacentNode(
                graph,
                i,
                right,
                currentWeight,
                nodes[right.toString()].weight,
                isWeighted,
                false,
            );
    }

    return { graph, nodes };
};

const createMazeGraphUsingDfs = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const isWeighted = globalVariablesManager.getIsWeighted();

    const { startNode, endNode } = generateStartAndEndNodeForMazeGraph();

    globalVariablesManager.setStartNode(startNode);
    globalVariablesManager.setEndNode(endNode);

    const { graph, nodes } = createGridGraph(0, false);

    let endNodeReached = false;
    const visited = new Set<number>();
    const path: number[] = [];
    const finalPath = new Set<number>();

    const dfs = (currentNode: number) => {
        if (endNodeReached || visited.has(currentNode)) {
            return;
        }

        visited.add(currentNode);
        path.push(currentNode);

        if (currentNode === endNode) {
            endNodeReached = true;
            for (const node of path) {
                finalPath.add(node);
            }
            return;
        }

        let neighbors = graph[currentNode];
        // Shuffle the neighbors so we visit them in a random order.
        neighbors = neighbors.sort(() => Math.random() - 0.5);

        for (const { id: neighborId } of neighbors) {
            dfs(parseInt(neighborId));
        }

        path.pop();
    };

    dfs(startNode);

    const wallWeight = MAX_WEIGHT;
    const pathWeight = 1;

    for (let i = 0; i < GRID_SIZE; i++) {
        // We mark nodes that are not in the final DFS path with the max weight.
        if (!finalPath.has(i)) {
            nodes[i] = { id: i.toString(), weight: wallWeight };
            // If maze is not weighted, the nodes that are not in the final DFS path will not be added to the graph.
            if (!isWeighted) {
                continue;
            }
        } else {
            // We add the neighbors of nodes that are in the final DFS path.
            // These nodes will have 0 weight.
            nodes[i] = { id: i.toString(), weight: pathWeight };
        }
    }

    for (let i = 0; i < GRID_SIZE; i++) {
        graph[i.toString()] = [];
        const currentWeight = nodes[i].weight;

        // Direct neighbors
        const up = i - COLS;
        const down = i + COLS;
        const left = i % COLS !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % COLS !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        if (up >= 0 && (isWeighted || (!isWeighted && finalPath.has(up))))
            addAdjacentNode(
                graph,
                i,
                up,
                currentWeight,
                nodes[up.toString()].weight,
                isWeighted,
                true,
            );

        if (down < GRID_SIZE && (isWeighted || (!isWeighted && finalPath.has(down))))
            addAdjacentNode(
                graph,
                i,
                down,
                currentWeight,
                nodes[down.toString()].weight,
                isWeighted,
                true,
            );

        if (left !== -1 && (isWeighted || (!isWeighted && finalPath.has(left))))
            addAdjacentNode(
                graph,
                i,
                left,
                currentWeight,
                nodes[left.toString()].weight,
                isWeighted,
                true,
            );

        if (right !== -1 && (isWeighted || (!isWeighted && finalPath.has(right))))
            addAdjacentNode(
                graph,
                i,
                right,
                currentWeight,
                nodes[right.toString()].weight,
                isWeighted,
                true,
            );
    }

    return { graph, nodes };
};

const createMazeGraphWithRandomWalls = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const isWeighted = globalVariablesManager.getIsWeighted();

    const { startNode, endNode } = generateStartAndEndNodeForMazeGraph();

    globalVariablesManager.setStartNode(startNode);
    globalVariablesManager.setEndNode(endNode);

    const graph: Graph = {};
    const nodes: Nodes = {};

    const walls = new Set<number>();

    // Set random cells as walls
    for (let i = 0; i < GRID_SIZE; i++) {
        if (i === startNode || i === endNode) continue;
        if (Math.random() < 0.3) {
            walls.add(i);
        }
    }

    const wallWeight = MAX_WEIGHT;
    const pathWeight = 1;

    for (let i = 0; i < GRID_SIZE; i++) {
        graph[i.toString()] = [];
        // We mark walls with the max weight.
        if (walls.has(i)) {
            nodes[i] = { id: i.toString(), weight: wallWeight };
            // If maze is not weighted, the walls will not be added to the graph.
            if (!globalVariablesManager.getIsWeighted()) {
                continue;
            }
        } else {
            // The rest of the nodes will have 0 weight.
            nodes[i] = { id: i.toString(), weight: pathWeight };
        }
    }
    for (let i = 0; i < GRID_SIZE; i++) {
        const currentWeight = nodes[i].weight;

        // Direct neighbors
        const up = i - COLS;
        const down = i + COLS;
        const left = i % COLS !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % COLS !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        if (up >= 0 && (isWeighted || (!isWeighted && !walls.has(up))))
            addAdjacentNode(
                graph,
                i,
                up,
                currentWeight,
                nodes[up.toString()].weight,
                isWeighted,
                true,
            );

        if (down < GRID_SIZE && (isWeighted || (!isWeighted && !walls.has(down))))
            addAdjacentNode(
                graph,
                i,
                down,
                currentWeight,
                nodes[down.toString()].weight,
                isWeighted,
                true,
            );

        if (left !== -1 && (isWeighted || (!isWeighted && !walls.has(left))))
            addAdjacentNode(
                graph,
                i,
                left,
                currentWeight,
                nodes[left.toString()].weight,
                isWeighted,
                true,
            );

        if (right !== -1 && (isWeighted || (!isWeighted && !walls.has(right))))
            addAdjacentNode(
                graph,
                i,
                right,
                currentWeight,
                nodes[right.toString()].weight,
                isWeighted,
                true,
            );
    }
    return { graph, nodes };
};

export const createMazeGraphUsingRecursiveDivision = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const isWeighted = globalVariablesManager.getIsWeighted();

    const graph: Graph = {};
    const nodes: Nodes = {};
    const walls = new Set<number>();
    const passageMap = new Set<number>();

    recrusiveDivide(0, ROWS - 1, 0, COLS - 1, walls, passageMap);

    const wallWeight = MAX_WEIGHT;
    const pathWeight = 1;

    for (let i = 0; i < GRID_SIZE; i++) {
        graph[i.toString()] = [];
        // We mark walls with the max weight.
        if (walls.has(i)) {
            nodes[i] = { id: i.toString(), weight: wallWeight };
            // If maze is not weighted, the walls will not be added to the graph.
            if (!globalVariablesManager.getIsWeighted()) {
                continue;
            }
        } else {
            // The rest of the nodes will have 0 weight.
            nodes[i] = { id: i.toString(), weight: pathWeight };
        }
    }

    for (let i = 0; i < GRID_SIZE; i++) {
        const currentWeight = nodes[i].weight;

        // Direct neighbors
        const up = i - COLS;
        const down = i + COLS;
        const left = i % COLS !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % COLS !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        if (up >= 0 && (isWeighted || (!isWeighted && !walls.has(up))))
            addAdjacentNode(
                graph,
                i,
                up,
                currentWeight,
                nodes[up.toString()].weight,
                isWeighted,
                true,
            );

        if (down < GRID_SIZE && (isWeighted || (!isWeighted && !walls.has(down))))
            addAdjacentNode(
                graph,
                i,
                down,
                currentWeight,
                nodes[down.toString()].weight,
                isWeighted,
                true,
            );

        if (left !== -1 && (isWeighted || (!isWeighted && !walls.has(left))))
            addAdjacentNode(
                graph,
                i,
                left,
                currentWeight,
                nodes[left.toString()].weight,
                isWeighted,
                true,
            );

        if (right !== -1 && (isWeighted || (!isWeighted && !walls.has(right))))
            addAdjacentNode(
                graph,
                i,
                right,
                currentWeight,
                nodes[right.toString()].weight,
                isWeighted,
                true,
            );
    }

    let { startNode, endNode } = generateStartAndEndNode();

    while (walls.has(startNode)) {
        startNode = generateStartAndEndNode().startNode;
    }
    while (walls.has(endNode)) {
        endNode = generateStartAndEndNode().endNode;
    }

    globalVariablesManager.setStartNode(startNode);
    globalVariablesManager.setEndNode(endNode);

    return { graph, nodes };
};

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
                walls.add(parseInt(getCellIdFromRowAndColumn(wallRow, col)));
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
                walls.add(parseInt(getCellIdFromRowAndColumn(row, wallCol)));
            }
        }
        passageMap.add(passageRow);
        recrusiveDivide(startRow, endRow, startCol, wallCol - 1, walls, passageMap);
        recrusiveDivide(startRow, endRow, wallCol + 1, endCol, walls, passageMap);
    }
};

/**
 * Adds an adjacent node to the graph with the specified properties.
 * @param graph The graph structure.
 * @param currentId The ID of the current node.
 * @param neighborId The ID of the neighboring node.
 * @param currentWeight The weight of the current node.
 * @param neighborWeight The weight of the neighboring node.
 * @param isWeighted Whether the graph is weighted.
 * @param isMaze Whether the graph is a maze.
 *
 */
const addAdjacentNode = (
    graph: Graph,
    currentId: number,
    neighborId: number,
    currentWeight: number,
    neighborWeight: number,
    isWeighted: boolean,
    isMazeGraph: boolean,
): void => {
    let weight = 1;
    if (isWeighted) {
        weight = isMazeGraph ? neighborWeight : Math.max(neighborWeight - currentWeight, 0);
    }
    graph[currentId].push({ id: neighborId.toString(), weight: weight });
};

export const getExampleGraph = (graphType: GraphType) => {
    switch (graphType) {
        case GraphType.IdealAStar:
            return aStarExampleGraphs[
                Math.floor(Math.random() * aStarExampleGraphs.length)
            ] as GraphStorage;
        case GraphType.IdealDijkstra:
            return dijkstraExampleGraphs[
                Math.floor(Math.random() * dijkstraExampleGraphs.length)
            ] as GraphStorage;
            break;
        case GraphType.IdealBellmanFord:
            return bellmanFordExampleGraphs[
                Math.floor(Math.random() * bellmanFordExampleGraphs.length)
            ] as GraphStorage;
            break;
        case GraphType.IdealBfs:
            return bfsExampleGraphs[
                Math.floor(Math.random() * bfsExampleGraphs.length)
            ] as GraphStorage;
            break;
    }
};

/**
 * Returns the node with the maximum weight from the given nodes.
 * @param nodes The collection of nodes.
 * @returns The node with the maximum weight.
 */
export const getNodeWithMaxWeight = (nodes: Nodes): Node => {
    let maxWeightNode: Node = nodes[0];
    let maxWeight = 0;

    for (const id in nodes) {
        const currentNode = nodes[id];
        if (currentNode.weight >= maxWeight) {
            maxWeight = currentNode.weight;
            maxWeightNode = currentNode;
        }
    }

    return maxWeightNode;
};

/**
 * Returns the node with the minimum weight from the given nodes.
 * @param nodes The collection of nodes.
 * @returns The node with the minimum weight.
 */
export const getNodeWithMinWeight = (nodes: Nodes): Node => {
    let minWeightNode: Node = nodes[0];
    let minWeight = Number.POSITIVE_INFINITY;

    for (const id in nodes) {
        const currentNode = nodes[id];
        if (currentNode.weight <= minWeight) {
            minWeight = currentNode.weight;
            minWeightNode = currentNode;
        }
    }

    return minWeightNode;
};

interface StartEndNodes {
    startNode: number;
    endNode: number;
}
/**
 * Generates a random start and end node indices within the grid size.
 * @returns An object containing both start and end node indices
 */
export const generateStartAndEndNode = (): StartEndNodes => {
    const newStartNode = Math.floor(Math.random() * GRID_SIZE);
    let newEndNode;
    do {
        newEndNode = Math.floor(Math.random() * GRID_SIZE);
    } while (newStartNode === newEndNode);
    return { startNode: newStartNode, endNode: newEndNode };
};

const generateStartAndEndNodeForMazeGraph = (): { startNode: number; endNode: number } => {
    // The maze graph's start and end nodes can be on one of each corner of the grid.
    const possibleMazeGraphStartEndIndices = [
        0, // Top left
        COLS - 1, // Top right
        (ROWS - 1) * COLS, // Bottom left
        GRID_SIZE - 1, // Bottom right
    ];

    const startNode = possibleMazeGraphStartEndIndices[Math.floor(Math.random() * 4)];
    let endNode = possibleMazeGraphStartEndIndices[Math.floor(Math.random() * 4)];
    // Ensure startNode and endNode are different.
    while (startNode === endNode) {
        endNode = possibleMazeGraphStartEndIndices[Math.floor(Math.random() * 4)];
    }

    return { startNode, endNode };
};
