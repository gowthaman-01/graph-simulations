import { AlgorithmType, Graph, MarkType, Node, Nodes, VisitedSet } from '../common/types';
import { Queue } from '../data-structures/Queue';
import { markCell, unmarkCell } from '../utils/mark';

/**
 * Finds the shortest path using Breadth-First Search (BFS) algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {Nodes} nodes - The collection of nodes in the graph.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @returns {Promise<Node[]>} A promise that resolves once the shortest path is found and marked.
 */
export const bfs = async (
    graph: Graph,
    nodes: Nodes,
    startNode: number,
    endNode: number,
): Promise<Node[]> => {
    // Initialize visited set, queue and parent map.
    const visited: VisitedSet = {};
    const queue = new Queue<string>();
    const parentMap: { [key: string]: string | null } = { [startNode]: null };
    let shortestPath: Node[] = [];

    // Add startNode to queue.
    queue.enqueue(startNode.toString());
    visited[startNode] = true;

    while (queue.getSize() > 0) {
        // Dequeue node.
        const currentNode = queue.dequeue();
        if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
            await markCell(currentNode, MarkType.Visited, AlgorithmType.Bfs);
        }

        // Mark shortest path if endNode is reached.
        if (currentNode === endNode.toString()) {
            let current = currentNode;
            while (current !== null) {
                shortestPath.push({ id: current, distance: nodes[current].distance });
                current = parentMap[current];
            }
            return shortestPath.reverse();
        }

        // Explore neighbors of the current node
        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor.id]) continue;
            queue.enqueue(neighbor.id);
            visited[neighbor.id] = true;
            parentMap[neighbor.id] = currentNode;
            if (neighbor.id !== startNode.toString() && neighbor.id !== endNode.toString()) {
                await markCell(neighbor.id, MarkType.Visiting, AlgorithmType.Bfs);
            }
        }
    }

    // If endNode is not reachable from startNode
    return shortestPath;
};
