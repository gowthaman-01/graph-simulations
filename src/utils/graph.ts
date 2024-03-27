import { randomDistance } from './general';
import { Distances, Graph } from '../common/types';
import { GRID_SIZE } from '../common/constants';

/**
 * Creates a grid graph with the specified number of rows and columns.
 *
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @returns {Graph} The created grid graph represented as an adjacency list.
 */
export const createGridGraph = (rows: number, cols: number): Graph => {
    const graph: Graph = {};
    const distances: Distances = {};

    for (let i = 0; i < GRID_SIZE; i++) {
        graph[i] = []; // Initialize each node with an empty array of neighbors

        // Direct neighbors
        const up = i - cols;
        const down = i + cols;
        const left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        if (up >= 0)
            graph[i].push({
                node: up.toString(),
                distance: getDistance(distances, up.toString(), i.toString()),
            });

        if (down < GRID_SIZE)
            graph[i].push({
                node: down.toString(),
                distance: getDistance(distances, down.toString(), i.toString()),
            });

        if (left !== -1)
            graph[i].push({
                node: left.toString(),
                distance: getDistance(distances, left.toString(), i.toString()),
            });

        if (right !== -1)
            graph[i].push({
                node: right.toString(),
                distance: getDistance(distances, right.toString(), i.toString()),
            });
    }

    return graph;
};

export const createMazeGraph = (rows: number, cols: number): Graph => {
    let maze: Graph = {};
    let visited: Set<string> = new Set();

    // Initialize all cells in the maze as isolated nodes
    for (let i = 0; i < GRID_SIZE; i++) {
        maze[i] = [];
    }

    // Converts row and column to node key
    const toNodeKey = (row: number, col: number): string => {
        return (row * cols + col).toString();
    };

    // Depth-first search to create paths
    const dfs = (row: number, col: number) => {
        visited.add(toNodeKey(row, col));
        const directions = [
            [0, 1], // Right
            [1, 0], // Down
            [0, -1], // Left
            [-1, 0], // Up
        ];

        // Shuffle directions to ensure maze variability
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        directions.forEach(([dRow, dCol]) => {
            const newRow = row + dRow;
            const newCol = col + dCol;
            const newNodeKey = toNodeKey(newRow, newCol);

            // Check for valid, unvisited cell to become a path
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                !visited.has(newNodeKey)
            ) {
                // For simplicity, assuming direct neighbors are at distance 1
                // Mark the path by setting distance between nodes
                maze[toNodeKey(row, col)].push({ node: newNodeKey, distance: 0 });
                maze[newNodeKey].push({ node: toNodeKey(row, col), distance: 0 });

                // Recursively visit the new cell
                dfs(newRow, newCol);
            }
            // Else, you could explicitly set the distance to Infinity if you need to represent walls within the graph
            // Though typically for a maze, you'd simply not have an edge/connection in the graph where a wall exists
        });
    };

    // Start DFS from the top-left cell
    dfs(0, 0);

    return maze;
};

/**
 * Gets the distance between two nodes in a graph.
 * If the distance between the nodes is not already calculated, it generates a random distance and stores it in the distances object.
 * This prevents adjacent nodes to have different distances.
 *
 * @param {Distances} distances - The distances object storing precalculated distances between nodes.
 * @param {string} node - The index of the first node.
 * @param {string} neighbor - The index of the second node.
 * @returns {number} The distance between the two nodes.
 */
const getDistance = (distances: Distances, node: string, neighbor: string): number => {
    // Generate key -> eg: node = '5', neighbor = '1', key = '1,5'.
    const key = parseInt(node) < parseInt(neighbor) ? node + ',' + neighbor : neighbor + ',' + node;

    // Check if the distance between the nodes is already calculated.
    if (!(key in distances)) {
        // If not, generate a random distance and store it in the distances object.
        distances[key] = randomDistance();
    }

    // Return the distance between the nodes
    return distances[key];
};
