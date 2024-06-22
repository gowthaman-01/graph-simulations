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
    const distances: { [key: string]: number } = {};
    const predecessors: { [key: string]: string | null } = { [startNode]: null };

    // Set all distances to Infinity except the startNode, which is set to 0.
    Object.keys(nodes).forEach((node) => {
        distances[node] = node === startNode.toString() ? 0 : Infinity;
    });

    steps += GRID_SIZE + 2;

    // Relax all edges.
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        let distancesUpdated = false; // This flag checks if we made any changes to the distances map in this iteration.
        steps += 1;

        for (const currentNode in graph) {
            // Skip processing for nodes that are not yet reached.
            if (distances[currentNode] === Infinity) {
                steps += 2;
                continue;
            }

            if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
                runResults.addStep(steps, [
                    {
                        id: currentNode,
                        newState: NodeState.Visiting,
                    },
                ]);
            }

            for (const neighbor of graph[currentNode]) {
                const { id: neighborId, weight: neighborWeight } = neighbor;
                const newWeight = distances[currentNode] + neighborWeight;
                steps += 2;

                if (distances[neighborId] > newWeight) {
                    distances[neighborId] = newWeight;
                    predecessors[neighborId] = currentNode;
                    distancesUpdated = true;
                    steps += 3;

                    if (neighborId !== startNode.toString() && neighborId !== endNode.toString()) {
                        runResults.addStep(steps, [
                            {
                                id: neighborId,
                                newState: NodeState.Exploring,
                            },
                        ]);
                    }
                }
            }

            if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
                runResults.addStep(steps, [
                    {
                        id: currentNode,
                        newState: NodeState.Visited,
                    },
                ]);
            }
        }

        if (!distancesUpdated) break; // No change means we can exit early.
    }

    // Check for negative weight cycles
    for (const node in graph) {
        for (const neighbor of graph[node]) {
            const { id: neighborId, weight: neighborWeight } = neighbor;
            if (distances[neighborId] > distances[node] + neighborWeight) {
                console.error('Graph contains a negative weight cycle');
                return runResults; // Early exit if a negative cycle is detected
            }
        }
    }

    // Construct the path if there's no negative cycle
    let currentNode: string | null = endNode.toString();
    const shortestPath: Node[] = [];

    // If endNode is reachable.
    if (predecessors[currentNode]) {
        while (currentNode !== null && currentNode !== undefined) {
            shortestPath.unshift({ id: currentNode, weight: nodes[currentNode].weight });
            currentNode = predecessors[currentNode];
        }
    }
    runResults.setShortestPath(shortestPath);
    return runResults;
};
