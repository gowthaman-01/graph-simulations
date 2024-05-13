import { AlgorithmType, NewNodeState, Node, NodeState, VisitedSet } from '../common/types';
import { Queue } from '../data-structures/Queue';
import { getGlobalVariablesManagerInstance } from '../globals/GlobalVariablesManager';
import RunResults from '../results/RunResults';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Finds the shortest path using Breadth-First Search (BFS) algorithm from the startNode to endNode in the given graph.
 *
 * @returns {RunResults}
 */
export const bfs = (): RunResults => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const nodes = globalVariablesManager.getGraph().nodes;
    const graph = globalVariablesManager.getGraph().graph;

    const runResults = new RunResults(AlgorithmType.Bfs);
    // This will count the number of operations performed. A single step equates to a O(1) operation.
    let steps = 0;

    // Initialize visited set, queue and predecessors map.
    const visited: VisitedSet = {};
    const queue = new Queue<string>();
    const predecessorsMap: { [key: string]: string | null } = { [startNode]: null }; // 2 * O(1)

    // Add startNode to queue and mark it as visited.
    queue.enqueue(startNode.toString()); // 2 * O(1)
    visited[startNode] = true;

    steps += 7;

    while (queue.getSize() > 0) {
        // Dequeue node at the front of the queue.
        const currentNode = queue.dequeue();
        steps += 3; // getSize() and > operations are O(1) each.

        // Set shortest path if endNode is reached. No steps are added here.
        if (currentNode === endNode.toString()) {
            let shortestPath: Node[] = [];
            let current = currentNode;
            while (current !== null) {
                shortestPath.unshift({ id: current, weight: nodes[current].weight });
                current = predecessorsMap[current];
            }
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        // Explore neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor.id]) continue; // 2 * O(1)
            queue.enqueue(neighbor.id);
            visited[neighbor.id] = true;
            predecessorsMap[neighbor.id] = currentNode;
            steps += 5;

            // Set visiting marker. Steps are not added here.
            if (neighbor.id !== startNode.toString() && neighbor.id !== endNode.toString()) {
                const newNodeState: NewNodeState = {
                    id: neighbor.id,
                    newState: NodeState.Visiting,
                };
                runResults.addStep(steps, [newNodeState]);
            }
        }

        // Set visited marker. Steps are not added here.
        if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
            const newNodeState: NewNodeState = {
                id: currentNode,
                newState: NodeState.Visited,
            };
            runResults.addStep(steps, [newNodeState]);
        }
    }

    // Code will only reach here if endNode is not reachable from the startNode.
    return runResults;
};
