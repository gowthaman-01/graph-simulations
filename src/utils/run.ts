import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/dijkstra';
import { aStarSearch } from '../algorithms/aStarSearch';
import { bellmanFord } from '../algorithms/bellman';
import { AlgorithmType, GraphDiv } from '../common/types';
import RunResults from './RunResults';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { greedy } from '../algorithms/greedy';
import { dfs } from '../algorithms/dfs';

/**
 * Executes the specified graph traversal algorithm.
 * @param {GraphDiv} graphDiv - The metadata of the HTML Div element that displays the graph.
 * @returns {RunResults} The results of running the selected algorithm, including step-by-step states and the final path.
 */
export const runAlgorithm = (
    graphDiv: GraphDiv | null,
    algorithmType: AlgorithmType,
): RunResults => {
    let algorithm = bfs;

    switch (algorithmType) {
        case AlgorithmType.BFS:
            algorithm = bfs;
            break;
        case AlgorithmType.DFS:
            algorithm = dfs;
            break;
        case AlgorithmType.BellmanFord:
            algorithm = bellmanFord;
            break;
        case AlgorithmType.Dijkstra:
            algorithm = dijkstra;
            break;
        case AlgorithmType.AStar:
            algorithm = aStarSearch;
            break;
        case AlgorithmType.Greedy:
            algorithm = greedy;
            break;
    }

    const runResults = algorithm();

    if (graphDiv) {
        runResults.setGraphDiv(graphDiv);
    }

    return runResults;
};

/**
 * Determines the most efficient algorithm based on the total weight of the path and the number of steps taken.
 *
 * This function evaluates the results of various algorithms that have been run on a graph.
 * It first selects the algorithms that yield the lowest total path weight, and among those, it identifies the one that requires the fewest steps to reach the result.
 *
 * @returns {AlgorithmType} The algorithm type that has the lowest total weight and requires the fewest steps.
 * If no suitable algorithm is found (an unlikely scenario), BFS is returned as a default.
 */
export const getBestAlgorithm = (): AlgorithmType => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const runResults = globalVariablesManager.getRunResults();

    // Get the lowest total weight and filter to find results that have this lowest weight.
    const lowestWeight = Math.min(...runResults.map((runResult) => runResult.getTotalWeight()));
    const filteredResults = runResults.filter(
        (runResult) => runResult.getTotalWeight() === lowestWeight,
    );

    // Get the lowest number of steps.
    const lowestStep = Math.min(
        ...filteredResults.map((runResult) => runResult.getAlgorithmSteps()),
    );

    // Identify the best algorithm as the one with the lowest weight and fewest steps.
    const bestAlgorithmRun = filteredResults.find(
        (runResult) => runResult.getAlgorithmSteps() === lowestStep,
    );

    // Return the type of the best algorithm, defaulting to BFS if none is found (though this should not occur).
    return bestAlgorithmRun ? bestAlgorithmRun.getAlgorithmType() : AlgorithmType.BFS;
};
