import {
    AlgorithmType,
    Graph,
    NewNodeState,
    Node,
    NodeState,
    Nodes,
    VisitedSet,
} from '../common/types';
import { Queue } from '../data-structures/Queue';
import { RunResults } from '../results/RunResults';

/**
 * Finds the shortest path using Breadth-First Search (BFS) algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {Nodes} nodes - The collection of nodes in the graph.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @param {number} stepDifference - The stepDifference of execution.
 * @returns {RunResults} A promise that resolves once the shortest path is found and marked.
 */
export const bfs = (
    graph: Graph,
    nodes: Nodes,
    startNode: number,
    endNode: number,
    stepDifference: number,
): RunResults => {
    const runResults = new RunResults(nodes, startNode, endNode, AlgorithmType.Bfs, stepDifference);
    let steps = 0;

    // Initialize visited set, queue and parent map.
    const visited: VisitedSet = {};
    const queue = new Queue<string>();
    const parentMap: { [key: string]: string | null } = { [startNode]: null };
    let shortestPath: Node[] = [];

    // Add startNode to queue.
    queue.enqueue(startNode.toString());
    visited[startNode] = true;

    steps += 6;

    while (queue.getSize() > 0) {
        // Dequeue node.
        const currentNode = queue.dequeue();
        steps += 3;

        // Mark shortest path if endNode is reached.
        if (currentNode === endNode.toString()) {
            let current = currentNode;
            while (current !== null) {
                shortestPath.push({ id: current, distance: nodes[current].distance });
                current = parentMap[current];
            }
            shortestPath.reverse();
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        // Explore neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor.id]) continue;
            queue.enqueue(neighbor.id);
            visited[neighbor.id] = true;
            parentMap[neighbor.id] = currentNode;
            steps += 5;

            if (neighbor.id !== startNode.toString() && neighbor.id !== endNode.toString()) {
                const newNodeState: NewNodeState = {
                    id: neighbor.id,
                    newState: NodeState.Visiting,
                };
                runResults.addStep(steps, [newNodeState]);
            }
        }

        if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
            const newNodeState: NewNodeState = {
                id: currentNode,
                newState: NodeState.Visited,
            };
            runResults.addStep(steps, [newNodeState]);
        }
    }

    // If endNode is not reachable from startNode
    return runResults;
};
