import { DEFAULT_DELAY } from '../common/constants';
import { AlgorithmType, Graph, HeapNode, MarkType, Node, Nodes } from '../common/types';
import { MinHeap, heapNodeComparator } from '../data-structures/MinHeap';
import { markCell } from '../utils/mark';

/**
 * Finds the shortest path using Dijkstra's algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {Nodes} nodes - The collection of nodes in the graph.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @returns {Promise<Node[]>} A promise that resolves once the shortest path is found and marked.
 */
export const dijkstra = async (
    graph: Graph,
    nodes: Nodes,
    startNode: number,
    endNode: number,
): Promise<Node[]> => {
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
    heap.push({ id: startNode.toString(), priority: 0 });

    while (!heap.isEmpty()) {
        const { id: currentNode } = heap.pop()!;
        visited[currentNode] = true;

        if (currentNode === endNode.toString()) {
            let current = endNode.toString();
            while (current !== null) {
                shortestPath.push({ id: current, distance: nodes[current].distance });
                current = previous[current];
            }
            return shortestPath.reverse();
        }

        for (const neighbor of graph[currentNode]) {
            const { id: neighborId, distance: neighborDistance } = neighbor;
            if (visited[neighborId]) continue;
            const newDistance = distances[currentNode] + neighborDistance;

            // If a shorter path is found.
            if (newDistance < distances[neighborId]) {
                distances[neighborId] = newDistance;
                previous[neighborId] = currentNode;
                heap.push({ id: neighborId, priority: newDistance });
                if (neighborId !== startNode.toString() && neighborId !== endNode.toString()) {
                    await markCell(
                        neighborId,
                        MarkType.Visiting,
                        AlgorithmType.Djikstra,
                        Math.log2(Object.keys(graph).length) * DEFAULT_DELAY,
                    );
                }
            }
        }

        if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
            await markCell(currentNode, MarkType.Visited, AlgorithmType.Djikstra);
        }
    }
};
