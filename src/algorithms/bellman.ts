import { AlgorithmType, Node, NodeState } from '../common/types';
import { getGlobalVariablesManagerInstance } from '../utils/GlobalVariablesManager';
import { getNeighborWeight } from '../utils/graph';
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
    const gridSize = globalVariablesManager.getGridSize();

    // This will estimate the number of machine operations performed.
    // For more details, please refer to /docs/step_counting_stadards.md.
    // Note: Steps involved in adding to runResults and consolidating the shortest path are excluded from this calculation.
    let steps = 0;

    // Initialize weights and predecessors. Each step takes O(1) time.
    const weights: number[] = [];
    const predecessors: Node[] = [];
    predecessors[startNode] = -1;
    steps += 3;

    // Set all weights to Infinity except the startNode, which is set to 0.
    for (let node = 0; node < gridSize; node++) {
        weights[node] = node === startNode ? 0 : Infinity;
        steps += 3;
    }

    // Relax all edges V - 1 times, where V is the number of nodes in the Graph.
    for (let i = 0; i < gridSize - 1; i++) {
        let distancesUpdated = false; // This flag checks if we made any changes to the weights map in this iteration.
        steps += 2;

        for (let currentNode = 0; currentNode < gridSize; currentNode++) {
            // Skip processing for nodes that are not yet reached.
            if (weights[currentNode] === Infinity || nodes[currentNode] === Infinity) {
                continue;
            }

            steps += 3;

            if (currentNode !== startNode && currentNode !== endNode) {
                runResults.addStep(steps, currentNode, NodeState.Visiting);
            }

            for (const neighbor of graph[currentNode]) {
                const neighborWeight = getNeighborWeight(nodes[currentNode], nodes[neighbor]);
                const newWeight = weights[currentNode] + neighborWeight;
                steps += 8;

                if (newWeight < weights[neighbor]) {
                    weights[neighbor] = newWeight;
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
            if (
                weights[neighbor] >
                weights[node] + getNeighborWeight(nodes[node], nodes[neighbor])
            ) {
                globalVariablesManager.setContainsNegativeWeightCycle(true);
                return runResults;
            }
        }
    }

    let currentNode: Node | null = endNode;
    const shortestPath: Node[] = [];

    // If endNode is reachable.
    if (predecessors[currentNode]) {
        while (currentNode !== -1) {
            shortestPath.unshift(currentNode);
            currentNode = predecessors[currentNode];
        }
    }
    runResults.setShortestPath(shortestPath);
    return runResults;
};
