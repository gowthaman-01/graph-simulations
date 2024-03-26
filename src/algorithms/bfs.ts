import { AlgorithmType, Graph, HighlightType, VisitedSet } from '../common/types';
import { Queue } from '../data-structures/Queue';
import { highlightCell } from '../utils/highlight';

/**
 * Finds the shortest path using Breadth-First Search (BFS) algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @returns {Promise<void>} A promise that resolves once the shortest path is found and highlighted.
 */
export const bfs = async (graph: Graph, startNode: string, endNode: string): Promise<void> => {
    // Initialize visited set, queue and parent map.
    const visited: VisitedSet = {};
    const queue = new Queue<string>();
    const parentMap: { [key: string]: string | null } = { [startNode]: null };

    // Add startNode to queue.
    queue.enqueue(startNode);
    visited[startNode] = true;

    while (queue.getSize() > 0) {
        // Dequeue node.
        const currentNode = queue.dequeue();
        await highlightCell(currentNode, HighlightType.Visited, AlgorithmType.Bfs);

        // Hightlight shortest path if endNode is reached.
        if (currentNode === endNode) {
            let current = currentNode;
            while (current !== null) {
                await highlightCell(current, HighlightType.ShortestPath, AlgorithmType.Bfs);
                current = parentMap[current];
            }
            return;
        }

        // Explore neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor.node]) continue;
            queue.enqueue(neighbor.node);
            visited[neighbor.node] = true;
            parentMap[neighbor.node] = currentNode;
            await highlightCell(neighbor.node, HighlightType.Visiting, AlgorithmType.Bfs);
        }
    }

    // If endNode is not reachable from startNode
    return;
};
