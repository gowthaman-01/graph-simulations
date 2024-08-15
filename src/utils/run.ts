import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/dijkstra';
import { aStarSearch } from '../algorithms/aStarSearch';
import { bellmanFord } from '../algorithms/bellman';
import { AlgorithmType, GraphDiv } from '../common/types';
import RunResults from './RunResults';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';

/**
 * Runs the specified graph traversal algorithm on the given graph.
 * @param {GraphDiv} graphDiv - The metadata of the Div element in which the graph is displayed.
 * @returns {RunResults[]} The results of running the algorithm.
 */
export const runAlgorithm = (graphDiv: GraphDiv): RunResults => {
    let algorithm = bfs;
    switch (graphDiv.algorithmType) {
        case AlgorithmType.Bfs:
            algorithm = bfs;
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
    }

    const runResults = algorithm();
    runResults.setGraphDiv(graphDiv);

    return runResults;
};

/**
 * Determines the best algorithm based on the total weight and steps taken.
 * @returns {AlgorithmType} The best algorithm type.
 */
export const getBestAlgorithm = (): AlgorithmType => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    const runResults = globalVariablesManager.getRunResults();

    // Get the lowest total weight and filter results with this weight.
    const lowestWeight = Math.min(...runResults.map((runResult) => runResult.getTotalWeight()));
    const filteredResults = runResults.filter(
        (runResult) => runResult.getTotalWeight() === lowestWeight,
    );

    // Get the lowest number of steps among the filtered results.
    const lowestStep = Math.min(
        ...filteredResults.map((runResult) => runResult.getAlgorithmSteps()),
    );

    // The best algorithm is the algorithm with the lowest weight and lowest step.
    const bestAlgorithmRun = filteredResults.find(
        (runResult) => runResult.getAlgorithmSteps() === lowestStep,
    );

    // If there is no best algorithm, default to BFS. This scenario should never happen.
    return bestAlgorithmRun ? bestAlgorithmRun.getAlgorithmType() : AlgorithmType.Bfs;
};
