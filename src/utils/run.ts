import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/dijkstra';
import { aStarSearch } from '../algorithms/aStarSearch';
import { bellmanFord } from '../algorithms/bellman';
import { AlgorithmType } from '../common/types';
import RunResults from './RunResults';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';

/**
 * Runs the specified graph traversal algorithm on the given graph.
 * @param {AlgorithmType} algorithmType - The type of algorithm to run (e.g., BFS, Dijkstra).
 * @returns {RunResults[]} The results of running the algorithm.
 */
export const runAlgorithm = (algorithmType: AlgorithmType): RunResults => {
    const algorithm = getAlgorithmFromAlgorithmType(algorithmType);
    const runResults = algorithm();
    return runResults;
};

/**
 * Retrieves the algorithm function based on the specified algorithm type.
 * @param {AlgorithmType} algorithmType - The type of algorithm.
 * @returns The corresponding algorithm function.
 */
const getAlgorithmFromAlgorithmType = (algorithmType: AlgorithmType): (() => RunResults) => {
    switch (algorithmType) {
        case AlgorithmType.Bfs:
            return bfs;
        case AlgorithmType.BellmanFord:
            return bellmanFord;
        case AlgorithmType.Dijkstra:
            return dijkstra;
        case AlgorithmType.AStar:
            return aStarSearch;
        default:
            return bfs;
    }
};

/**
 * Determines the best algorithm based on the total weight and steps taken.
 * @returns {AlgorithmType} The best algorithm type.
 */
export const getBestAlgorithm = (): AlgorithmType => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    let runResults = globalVariablesManager.getRunResults();

    // Get algorithms that result in a shortest path with the lowest weight.
    const lowestWeight = Math.min(...runResults.map((runResult) => runResult.getTotalWeight()));
    runResults = runResults.filter((runResult) => runResult.getTotalWeight() === lowestWeight);

    // Get algorithm that executes the fastest.
    const lowestStep = Math.min(...runResults.map((runResult) => runResult.getAlgorithmSteps()));

    const bestAlgorithmRun = runResults.find(
        (runResult) => runResult.getAlgorithmSteps() === lowestStep,
    );

    // If theres is no best algorithm, we set the default best to BFS. In reality, this should never happen.
    return bestAlgorithmRun ? bestAlgorithmRun.getAlgorithmType() : AlgorithmType.Bfs;
};
