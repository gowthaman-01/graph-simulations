import { GRID_SIZE } from '../common/constants';
import {
    AlgorithmType,
    Graph,
    HeapNode,
    NewNodeState,
    Node,
    NodeState,
    Nodes,
} from '../common/types';
import { MinHeap, heapNodeComparator } from '../data-structures/MinHeap';
import { RunResults } from '../results/RunResults';

/**
 * Finds the shortest path using Dijkstra's algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {Nodes} nodes - The collection of nodes in the graph.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @param {number} stepDifference - The stepDifference of execution.
 * @returns {RunResults} A promise that resolves once the shortest path is found and marked.
 */
export const dijkstra = (
    graph: Graph,
    nodes: Nodes,
    startNode: number,
    endNode: number,
    stepDifference: number,
): RunResults => {
    const runResults = new RunResults(
        nodes,
        startNode,
        endNode,
        AlgorithmType.Djikstra,
        stepDifference,
    );
    let steps = 0;

    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const visited: { [key: string]: boolean } = {};
    let shortestPath: Node[] = [];

    // Initialize distances and previous
    Object.keys(graph).forEach((node) => {
        distances[node] = Infinity;
        previous[node] = null;
    });

    // Set distance to the startNode as 0
    distances[startNode] = 0;

    // Initialize the min heap with the start node
    const heap = new MinHeap<HeapNode>(heapNodeComparator);
    let heapPushSteps = heap.push({ id: startNode.toString(), priority: 0 });

    steps += heapPushSteps + 6;

    while (!heap.isEmpty()) {
        const [{ id: currentNode }, heapPopSteps] = heap.pop();
        visited[currentNode] = true;

        steps += heapPopSteps + 2;

        if (currentNode === endNode.toString()) {
            let current = endNode.toString();
            while (current !== null) {
                shortestPath.push({ id: current, distance: nodes[current].distance });
                current = previous[current];
            }
            shortestPath.reverse();
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        for (const neighbor of graph[currentNode]) {
            const { id: neighborId, distance: neighborDistance } = neighbor;
            if (visited[neighborId]) continue;
            const newDistance = distances[currentNode] + neighborDistance;

            steps += 4;

            // If a shorter path is found.
            if (newDistance < distances[neighborId]) {
                distances[neighborId] = newDistance;
                previous[neighborId] = currentNode;
                heapPushSteps = heap.push({ id: neighborId, priority: newDistance });
                steps += heapPushSteps + 3;
                if (neighborId !== startNode.toString() && neighborId !== endNode.toString()) {
                    const newNodeState: NewNodeState = {
                        id: neighbor.id,
                        newState: NodeState.Visiting,
                    };
                    runResults.addStep(steps, [newNodeState]);
                }
            } else {
                steps += 1;
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

    return runResults;
};
