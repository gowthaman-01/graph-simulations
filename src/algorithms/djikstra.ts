import { DEFAULT_DELAY } from '../common/constants';
import { AlgorithmType, Graph, HeapNode, HighlightType } from '../common/types';
import { MinHeap, heapNodeComparator } from '../data-structures/MinHeap';
import { highlightCell } from '../utils/highlight';

/**
 * Finds the shortest path using Dijkstra's algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @returns {Promise<void>} A promise that resolves once the shortest path is found and highlighted.
 */
export const dijkstra = async (graph: Graph, startNode: string, endNode: string): Promise<void> => {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    const visited: { [key: string]: boolean } = {};

    // Initialize distances and previous
    Object.keys(graph).forEach((node) => {
        distances[node] = Infinity;
        previous[node] = null;
    });

    // Set distance to the startNode as 0
    distances[startNode] = 0;

    // Initialize the min heap with the start node
    const heap = new MinHeap<HeapNode>(heapNodeComparator);
    heap.add({ node: startNode, priority: 0 });

    while (!heap.isEmpty()) {
        const { node: currentNode } = heap.pop()!;
        visited[currentNode] = true;

        await highlightCell(
            currentNode,
            HighlightType.Visiting,
            AlgorithmType.Djikstra,
            Math.log2(Object.keys(graph).length) * DEFAULT_DELAY,
        );

        if (currentNode === endNode) {
            let current = endNode;
            while (current !== null) {
                await highlightCell(current, HighlightType.ShortestPath, AlgorithmType.Djikstra);
                current = previous[current];
            }
            return;
        }

        for (const neighbor of graph[currentNode]) {
            const { node, distance } = neighbor;
            if (visited[node]) continue;
            const newDistance = distances[currentNode] + distance;

            // If a shorter path is found.
            if (newDistance < distances[node]) {
                distances[node] = newDistance;
                previous[node] = currentNode;
                heap.add({ node, priority: newDistance });
            }
        }

        await highlightCell(currentNode, HighlightType.Visited, AlgorithmType.Djikstra);
    }

    // If the endNode is not reachable, return an empty array
    return;
};
