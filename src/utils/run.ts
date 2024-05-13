import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/djikstra';
import { aStarSearch } from '../algorithms/aStarSearch';
import { AlgorithmType } from '../common/types';
import { bellmanFord } from '../algorithms/bellman';

/**
 * Runs the specified graph traversal algorithm on the given graph.
 * @param graph The graph structure containing nodes and their neighbors.
 * @param graphType The type of the graph (e.g., unweighted, weighted, directed).
 * @param nodes The collection of nodes in the graph.
 * @param startNode The ID of the starting node for the algorithm.
 * @param endNode The ID of the ending node for the algorithm.
 * @param algorithmType The type of algorithm to run (e.g., BFS, Dijkstra).
 * @param stepIncrement The step increment for visualization purposes.
 * @returns The results of running the algorithm.
 */
export const runAlgorithm = (algorithmType: AlgorithmType) => {
    const algorithm = getAlgorithmFromAlgorithmType(algorithmType);
    const runResults = algorithm();
    return runResults;
};

/**
 * Retrieves the algorithm function based on the specified algorithm type.
 * @param algorithmType The type of algorithm.
 * @returns The corresponding algorithm function.
 */
const getAlgorithmFromAlgorithmType = (algorithmType: AlgorithmType) => {
    switch (algorithmType) {
        case AlgorithmType.Bfs:
            return bfs;
        case AlgorithmType.BellmanFord:
            return bellmanFord;
        case AlgorithmType.Djikstra:
            return dijkstra;
        case AlgorithmType.AStar:
            return aStarSearch;
    }
};
