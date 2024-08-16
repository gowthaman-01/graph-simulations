import { GRID_SIZE } from '../common/constants';
import { AlgorithmType, Node, NodeState } from '../common/types';
import { getGlobalVariablesManagerInstance } from '../utils/GlobalVariablesManager';
import RunResults from '../utils/RunResults';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Finds the shortest path using Bellman-Ford algorithm from startNode to endNode in the given graph.
 *
 * @returns {RunResults}
 */
export const bellmanFord = (): RunResults => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const nodes = globalVariablesManager.getGraph().nodes;
    const graph = globalVariablesManager.getGraph().graph;

    const runResults = new RunResults(AlgorithmType.BellmanFord);

    let steps = 0; // This will count the number of operations performed. A single step equates to a O(1) operation.

    // Initialize distances and predecessors. Each step takes O(1) time.
    const distances: number[] = [];
    const predecessors: { [key: Node]: Node | null } = { [startNode]: null };

    // Set all distances to Infinity except the startNode, which is set to 0.
    for (let node = 0; node < GRID_SIZE; node++) {
        distances[node] = node === startNode ? 0 : Infinity;
    }

    steps += GRID_SIZE + 2;

    // Relax all edges V - 1 times, where V is the number of nodes in the Graph.
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        let distancesUpdated = false; // This flag checks if we made any changes to the distances map in this iteration.
        steps += 1;

        for (let currentNode = 0; currentNode < GRID_SIZE; currentNode++) {
            // Skip processing for nodes that are not yet reached.
            if (distances[currentNode] === Infinity) {
                steps += 2;
                continue;
            }

            if (currentNode !== startNode && currentNode !== endNode) {
                runResults.addStep(steps, currentNode, NodeState.Visiting);
            }

            for (const neighbor of graph[currentNode]) {
                const newWeight =
                    distances[currentNode] + Math.max(nodes[neighbor] - nodes[currentNode], 0);
                steps += 2;

                if (distances[neighbor] > newWeight) {
                    distances[neighbor] = newWeight;
                    predecessors[neighbor] = currentNode;
                    distancesUpdated = true;
                    steps += 3;

                    if (neighbor !== startNode && neighbor !== endNode) {
                        runResults.addStep(steps, neighbor, NodeState.Exploring);
                    }
                }
            }

            if (currentNode !== startNode && currentNode !== endNode) {
                runResults.addStep(steps, currentNode, NodeState.Visited);
            }
        }

        if (!distancesUpdated) break; // No change means we can exit early.
    }

    // Check for negative weight cycles
    for (const node in graph) {
        for (const neighbor of graph[node]) {
            if (distances[neighbor] > distances[node] + nodes[neighbor]) {
                console.error('Graph contains a negative weight cycle');
                return runResults; // Early exit if a negative cycle is detected
            }
        }
    }

    // Construct the path if there's no negative cycle
    let currentNode: Node | null = endNode;
    const shortestPath: Node[] = [];

    // If endNode is reachable.
    if (predecessors[currentNode]) {
        while (currentNode !== null && currentNode !== undefined) {
            shortestPath.unshift(currentNode);
            currentNode = predecessors[currentNode];
        }
    }
    runResults.setShortestPath(shortestPath);
    return runResults;
};
