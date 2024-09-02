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

    // This will estimate the number of machine operations performed.
    // For more details, please refer to /docs/step_counting_stadards.md.
    // Note: Steps involved in adding to runResults and consolidating the shortest path are excluded from this calculation.
    let steps = 0;

    // Initialize visited set, queue and predecessors list.
    const visited: VisitedSet = [];
    const queue = new Queue<Node>();
    const predecessors: Node[] = [];
    steps += 3;

    // Add startNode to queue and mark it as visited.
    queue.enqueue(startNode);
    visited[startNode] = true;
    predecessors[startNode] = -1;
    steps += 8;

    while (queue.getSize() > 0) {
        // Dequeue node at the front of the queue.
        const currentNode = queue.dequeue();
        if (currentNode === null) continue;
        steps += 10;

        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visiting);
        }

        // Set shortest path if endNode is reached. No steps are added here.
        if (currentNode === endNode) {
            let shortestPath: Node[] = [];
            let predecessor: Node = currentNode;
            while (predecessor !== -1) {
                shortestPath.unshift(predecessor);
                predecessor = predecessors[predecessor];
            }
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        // Explore neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor]) continue;
            queue.enqueue(neighbor);
            visited[neighbor] = true;
            predecessors[neighbor] = currentNode;
            steps += 10;

            if (neighbor !== startNode && neighbor !== endNode) {
                runResults.addStep(steps, neighbor, NodeState.Exploring);
            }
        }

        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visited);
        }
    }

    // Code will only reach here if endNode is not reachable from the startNode.
    return runResults;
};
