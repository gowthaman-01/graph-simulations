import { AlgorithmType, Node, NodeState, VisitedSet } from '../common/types';
import { Queue } from '../data-structures/Queue';
import { getGlobalVariablesManagerInstance } from '../utils/GlobalVariablesManager';
import RunResults from '../utils/RunResults';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Finds the shortest path using Breadth-First Search (BFS) algorithm from the startNode to endNode in the given graph.
 *
 * @returns {RunResults}
 */
export const bfs = (): RunResults => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const graph = globalVariablesManager.getGraph().graph;

    const runResults = new RunResults(AlgorithmType.Bfs);
    // This will count the number of operations performed. A single step equates to a O(1) operation.
    let steps = 0;

    // Initialize visited set, queue and predecessors map.
    const visited: VisitedSet = [];
    const queue = new Queue<Node>();
    const predecessorsMap: { [key: Node]: Node | null } = { [startNode]: null }; // 2 * O(1)

    // Add startNode to queue and mark it as visited.
    queue.enqueue(startNode); // 2 * O(1)
    visited[startNode] = true;

    steps += 7;

    while (queue.getSize() > 0) {
        // Dequeue node at the front of the queue.
        const currentNode = queue.dequeue();
        if (currentNode === null) continue;
        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visiting);
        }
        steps += 3; // getSize() and > operations are O(1) each.

        // Set shortest path if endNode is reached. No steps are added here.
        if (currentNode === endNode) {
            let shortestPath: Node[] = [];
            let predecessor: Node | null = currentNode;
            while (predecessor !== null) {
                shortestPath.unshift(predecessor);
                predecessor = predecessorsMap[predecessor];
            }
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        // Explore neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor]) continue; // 2 * O(1)
            queue.enqueue(neighbor);
            visited[neighbor] = true;
            predecessorsMap[neighbor] = currentNode;
            steps += 5;

            // Set visiting marker. Steps are not added here.
            if (neighbor !== startNode && neighbor !== endNode) {
                runResults.addStep(steps, neighbor, NodeState.Exploring);
            }
        }

        // Set visited marker. Steps are not added here.
        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visited);
        }
    }

    // Code will only reach here if endNode is not reachable from the startNode.
    return runResults;
};
