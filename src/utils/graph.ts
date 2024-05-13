import { randomWeight } from './general';
import { Graph, GraphStructure, GraphType, Node, Nodes } from '../common/types';
import { GRID_SIZE, COLS } from '../common/constants';
import { getGlobalVariablesManagerInstance } from '../globals/GlobalVariablesManager';

/**
 * Recreates the grid graph on subsequent renders based on global variables.
 *
 * @returns {GraphStructure} The created grid graph as well as the collection of nodes.
 */
export const recreateGridGraph = (): GraphStructure => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const maxWeight = globalVariablesManager.getMaxWeight();
    const graphType = globalVariablesManager.getGraphType();
    return createGridGraph(maxWeight, graphType);
};

/**
 * Creates a grid graph with the specified max weight and graphType on the first render.
 *
 * @returns {GraphStructure} The created grid graph as well as the collection of nodes.
 */
export const createGridGraph = (maxWeight: number, graphType: GraphType): GraphStructure => {
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

/**
 * Adds an adjacent node to the graph with the specified properties.
 * @param graph The graph structure.
 * @param currentId The ID of the current node.
 * @param neighborId The ID of the neighboring node.
 * @param currentWeight The weight of the current node.
 * @param neighborWeight The weight of the neighboring node.
 * @param graphType The type of graph (e.g., unweighted, weighted, directed).
 */
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

/**
 * Returns the node with the maximum weight from the given nodes.
 * @param nodes The collection of nodes.
 * @returns The node with the maximum weight.
 */
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

/**
 * Returns the node with the minimum weight from the given nodes.
 * @param nodes The collection of nodes.
 * @returns The node with the minimum weight.
 */
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

/**
 * Generates a random start node index within the grid size.
 * @returns A random start node index.
 */
export const generateStartNode = () => Math.floor(Math.random() * GRID_SIZE);

/**
 * Generates a random end node index within the grid size.
 * @returns A random end node index.
 */
export const generateEndNode = () => Math.floor(Math.random() * GRID_SIZE);
