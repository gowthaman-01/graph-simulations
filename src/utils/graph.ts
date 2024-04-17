import { randomWeight } from './general';
import { Graph, GraphStructure, GraphType, Node, Nodes } from '../common/types';
import { GRID_SIZE, MAX_WEIGHT } from '../common/constants';

export const createGraph = (
    rows: number,
    cols: number,
    maxWeight: number,
    graphType: GraphType,
    // isMaze: boolean,
    // orientation: 'H' | 'V',
) => {
    return createGridGraph(cols, maxWeight, graphType);
};

/**
 * Creates a grid graph with the specified number of rows and columns.
 *
 * @param {number} cols - The number of columns in the grid.
 * @param {number} maxWeight - The maximum weight of each cell.
 * @param {GraphType} graphType - The type of graph to be created.
 * @returns {GraphStructure} The created grid graph as well as the collection of nodes.
 */
const createGridGraph = (cols: number, maxWeight: number, graphType: GraphType): GraphStructure => {
    const graph: Graph = {};
    const nodes: Nodes = {};

    // Create nodes.
    for (let i = 0; i < GRID_SIZE; i++) {
        nodes[i] = { id: i.toString(), weight: randomWeight(maxWeight) };
    }

    // Create graph.
    for (let i = 0; i < GRID_SIZE; i++) {
        graph[i.toString()] = []; // Initialize each node with an empty array of neighbors
        const currentWeight = nodes[i].weight;
        // Direct neighbors
        const up = i - cols;
        const down = i + cols;
        const left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        const right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.

        if (up >= 0)
            addAdjacentNode(graph, i, up, currentWeight, nodes[up.toString()].weight, graphType);

        if (down < GRID_SIZE)
            addAdjacentNode(
                graph,
                i,
                down,
                currentWeight,
                nodes[down.toString()].weight,
                graphType,
            );

        if (left !== -1)
            addAdjacentNode(
                graph,
                i,
                left,
                currentWeight,
                nodes[left.toString()].weight,
                graphType,
            );

        if (right !== -1)
            addAdjacentNode(
                graph,
                i,
                right,
                currentWeight,
                nodes[right.toString()].weight,
                graphType,
            );
    }

    return { graph, nodes };
};

const addAdjacentNode = (
    graph: Graph,
    currentId: number,
    neighborId: number,
    currentWeight: number,
    neighborWeight: number,
    graphType: GraphType,
): void => {
    let weight = 1;
    switch (graphType) {
        case GraphType.Weighted:
            weight = Math.max(neighborWeight - currentWeight, 0);
            break;
        case GraphType.NegativeWeight:
            weight = neighborWeight - currentWeight;
            break;
        case GraphType.Directed:
            weight = neighborWeight - currentWeight <= 0 ? neighborWeight - currentWeight : null;
            break;
        default:
            break;
    }

    if (weight !== null) {
        graph[currentId].push({ id: neighborId.toString(), weight: weight });
    }
};

export const getNodeWithMaxWeight = (nodes: Nodes): Node => {
    let maxWeightNode: Node;
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

export const getNodeWithMinWeight = (nodes: Nodes): Node => {
    let minWeightNode: Node;
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

// const createMazeGraph = (rows: number, cols: number, orientation: 'H' | 'V'): GraphStructure => {
//     const { graph, nodes } = createGridGraph(cols, 0);
//     return createMazerecursiveDivision(
//         graph,
//         nodes,
//         rows,
//         cols,
//         0,
//         0,
//         cols - 1,
//         rows - 1,
//         orientation,
//     );
// };

// const createMazerecursiveDivision = (
//     graph: Graph,
//     nodes: Nodes,
//     cols: number,
//     rows: number,
//     startX: number,
//     startY: number,
//     endX: number,
//     endY: number,
//     orientation: 'H' | 'V',
// ) => {
//     if (
//         startX < 0 ||
//         endX >= cols ||
//         startY < 0 ||
//         endY >= rows ||
//         endX - startX < 2 ||
//         endY - startY < 2
//     ) {
//         // The section is too small to divide further.
//         return { graph, nodes };
//     }

//     let wallX: number, wallY: number, passageX: number, passageY: number;

//     if (orientation === 'H') {
//         // Choose a horizontal wall line and a vertical passage
//         wallY = randomEven(startY + 1, endY - 1);
//         passageX = randomOdd(startX, endX);
//         // Iterate over the cols in the current section to place the wall.
//         for (let x = startX; x <= endX; x++) {
//             if (x !== passageX) {
//                 // If the current col isn't the col for the passage.
//                 let nodeIndex = wallY * cols + x;
//                 if (nodeIndex >= GRID_SIZE) break;
//                 nodes[nodeIndex.toString()].weight = MAX_WEIGHT;
//             }
//         }

//         // Recursively divide.
//         createMazerecursiveDivision(graph, nodes, rows, cols, startX, startY, endX, wallY - 1, 'V');
//         createMazerecursiveDivision(graph, nodes, rows, cols, startX, wallY + 1, endX, endY, 'V');
//     } else {
//         // Choose a vertical wall line and a horizontal passage
//         wallX = randomEven(startX + 1, endX - 1);
//         passageY = randomOdd(startY, endY);

//         // Iterate over the rows in the current section to place the wall.
//         for (let y = startY; y <= endY; y++) {
//             if (y !== passageY) {
//                 // If the current row isn't the row for the passage.
//                 let nodeIndex = y * cols + wallX;
//                 if (nodeIndex >= GRID_SIZE) break;
//                 nodes[nodeIndex.toString()].weight = MAX_WEIGHT;
//             }
//         }

//         // Recursively divide.
//         createMazerecursiveDivision(graph, nodes, rows, cols, startX, startY, wallX - 1, endY, 'H');
//         createMazerecursiveDivision(graph, nodes, rows, cols, wallX + 1, startY, endX, endY, 'H');
//     }

//     return { graph, nodes };
// };

// const randomEven = (start: number, end: number) => {
//     let range = start + Math.floor(Math.random() * ((end - start) / 2));
//     return 2 * range;
// };

// const randomOdd = (start: number, end: number) => {
//     let range = start + Math.floor(Math.random() * ((end - start) / 2));
//     return 2 * range + 1;
// };
