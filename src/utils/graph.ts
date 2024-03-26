import { randomDistance } from './general';
import { Distances, Graph } from '../common/types';

/**
 * Creates a grid graph with the specified number of rows and columns.
 *
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @returns {Graph} The created grid graph represented as an adjacency list.
 */
export const createGridGraph = (rows: number, cols: number): Graph => {
    const graph: Graph = {};
    const size = rows * cols;
    const distances: Distances = {};

    for (let i = 0; i < size; i++) {
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

        if (down < size)
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
