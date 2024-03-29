import { randomWeight } from './general';
import { Graph, GraphStructure, Nodes } from '../common/types';
import { GRID_SIZE, MAX_WEIGHT } from '../common/constants';

export const createGraph = (
    rows: number,
    cols: number,
    maxWeight: number,
    isMaze: boolean,
    orientation: 'H' | 'V',
) => {
    return isMaze ? createMazeGraph(rows, cols, orientation) : createGridGraph(cols, maxWeight);
};

/**
 * Creates a grid graph with the specified number of rows and columns.
 *
 * @param {number} cols - The number of columns in the grid.
 * @param {number} maxWeight - The maximum weight of each cell.
 * @returns {GraphStructure} The created grid graph as well as the collection of nodes.
 */
const createGridGraph = (cols: number, maxWeight: number): GraphStructure => {
    const graph: Graph = {};
    const nodes: Nodes = {};

    // Create nodes.
    for (let i = 0; i < GRID_SIZE; i++) {
        nodes[i] = { id: i.toString(), weight: randomWeight(maxWeight) };
    }

    // Create graph.
    for (let i = 0; i < GRID_SIZE; i++) {
        graph[i.toString()] = []; // Initialize each node with an empty array of neighbors

        // Direct neighbors
        const up = i - cols;
        const down = i + cols;
        const left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        if (up >= 0)
            graph[i].push({
                id: up.toString(),
                weight: nodes[up.toString()].weight,
            });

        if (down < GRID_SIZE)
            graph[i].push({
                id: down.toString(),
                weight: nodes[down.toString()].weight,
            });

        if (left !== -1)
            graph[i].push({
                id: left.toString(),
                weight: nodes[left.toString()].weight,
            });

        if (right !== -1)
            graph[i].push({
                id: right.toString(),
                weight: nodes[right.toString()].weight,
            });
    }

    return { graph, nodes };
};

const createMazeGraph = (rows: number, cols: number, orientation: 'H' | 'V'): GraphStructure => {
    const { graph, nodes } = createGridGraph(cols, 0);
    return createMazerecursiveDivision(
        graph,
        nodes,
        rows,
        cols,
        0,
        0,
        cols - 1,
        rows - 1,
        orientation,
    );
};

const createMazerecursiveDivision = (
    graph: Graph,
    nodes: Nodes,
    cols: number,
    rows: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    orientation: 'H' | 'V',
) => {
    if (
        startX < 0 ||
        endX >= cols ||
        startY < 0 ||
        endY >= rows ||
        endX - startX < 2 ||
        endY - startY < 2
    ) {
        // The section is too small to divide further.
        return { graph, nodes };
    }

    let wallX: number, wallY: number, passageX: number, passageY: number;

    if (orientation === 'H') {
        // Choose a horizontal wall line and a vertical passage
        wallY = randomEven(startY + 1, endY - 1);
        passageX = randomOdd(startX, endX);
        // Iterate over the cols in the current section to place the wall.
        for (let x = startX; x <= endX; x++) {
            if (x !== passageX) {
                // If the current col isn't the col for the passage.
                let nodeIndex = wallY * cols + x;
                if (nodeIndex >= GRID_SIZE) break;
                nodes[nodeIndex.toString()].weight = MAX_WEIGHT;
            }
        }

        // Recursively divide.
        createMazerecursiveDivision(graph, nodes, rows, cols, startX, startY, endX, wallY - 1, 'V');
        createMazerecursiveDivision(graph, nodes, rows, cols, startX, wallY + 1, endX, endY, 'V');
    } else {
        // Choose a vertical wall line and a horizontal passage
        wallX = randomEven(startX + 1, endX - 1);
        passageY = randomOdd(startY, endY);

        // Iterate over the rows in the current section to place the wall.
        for (let y = startY; y <= endY; y++) {
            if (y !== passageY) {
                // If the current row isn't the row for the passage.
                let nodeIndex = y * cols + wallX;
                if (nodeIndex >= GRID_SIZE) break;
                nodes[nodeIndex.toString()].weight = MAX_WEIGHT;
            }
        }

        // Recursively divide.
        createMazerecursiveDivision(graph, nodes, rows, cols, startX, startY, wallX - 1, endY, 'H');
        createMazerecursiveDivision(graph, nodes, rows, cols, wallX + 1, startY, endX, endY, 'H');
    }

    return { graph, nodes };
};

const randomEven = (start: number, end: number) => {
    let range = start + Math.floor(Math.random() * ((end - start) / 2));
    return 2 * range;
};

const randomOdd = (start: number, end: number) => {
    let range = start + Math.floor(Math.random() * ((end - start) / 2));
    return 2 * range + 1;
};
