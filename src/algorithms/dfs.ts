import { AlgorithmType, Node, NodeState, VisitedSet } from '../common/types';
import { Queue } from '../data-structures/Queue';
import { shuffleArray } from '../utils/general';
import { getGlobalVariablesManagerInstance } from '../classes/GlobalVariablesManager';
import RunResults from '../classes/RunResults';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Finds the shortest path using Depth-First Search (DFS) algorithm from the startNode to endNode in the given graph.
 *
 * @returns {RunResults}
 */
export const dfs = (): RunResults => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const graph = globalVariablesManager.getGraph().graph;
    const runResults = new RunResults(AlgorithmType.DFS);

    // This will estimate the number of machine operations performed.
    // For more details, please refer to /docs/step_counting_stadards.md.
    // Note: Steps involved in adding to runResults and consolidating the shortest path are excluded from this calculation.
    let steps = 0;

    // Initialize visited set, queue and predecessors map.
    const visited: VisitedSet = [];
    const predecessors: Node[] = [];
    visited[startNode] = true;
    predecessors[startNode] = -1;

    steps += 40;

    const dfsHelper = (node: Node) => {
        if (node === endNode) {
            return true;
        }
        steps += 10;

        if (node !== startNode && node !== endNode) {
            runResults.addStep(steps, node, NodeState.Exploring);
        }

        let neighbors = shuffleArray(graph[node]);

        for (const neighbor of neighbors) {
            if (visited[neighbor] || globalVariablesManager.getGraph().nodes[neighbor] === Infinity)
                continue;
            visited[neighbor] = true;
            predecessors[neighbor] = node;
            steps += 40;

            if (dfsHelper(neighbor)) {
                return true;
            }
        }

        if (node !== startNode && node !== endNode) {
            runResults.addStep(steps, node, NodeState.Visited);
        }

        return false;
    };

    let shortestPath: Node[] = [];
    const endNodeReached = dfsHelper(startNode);

    if (endNodeReached) {
        let predecessor: Node = endNode;

        while (predecessor !== -1) {
            shortestPath.unshift(predecessor);
            predecessor = predecessors[predecessor];
        }
    }

    runResults.setShortestPath(shortestPath);
    return runResults;
};
