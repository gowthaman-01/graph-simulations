import { AlgorithmType, GraphStorage, GraphType, EnvironmentType } from '../common/types';
import { getGlobalVariablesManagerInstance } from '../classes/GlobalVariablesManager';
import { generateNewGraphWithReachableEndNode } from '../utils/graph';
import { runAlgorithm } from '../utils/run';
import * as fs from 'fs';

const globalVariablesManager = getGlobalVariablesManagerInstance();
globalVariablesManager.setWeightType(EnvironmentType.ElevatedTerrain);

const generateGraphs = (graphType: GraphType, graphList: GraphStorage[]) => {
    while (graphList.length < 100) {
        globalVariablesManager.setGraphType(graphType);
        generateNewGraphWithReachableEndNode(() => {});
        const [dijkstraRunResult, bellmanFordRunResult, aStarRunResult] = [
            AlgorithmType.Dijkstra,
            AlgorithmType.BellmanFord,
            AlgorithmType.AStar,
        ].map((algorithmType) => runAlgorithm(null, algorithmType));

        if (
            bellmanFordRunResult.getTotalWeight() < dijkstraRunResult.getTotalWeight() &&
            bellmanFordRunResult.getTotalWeight() < aStarRunResult.getTotalWeight()
        ) {
            graphList.push({
                startNode: globalVariablesManager.getStartNode(),
                endNode: globalVariablesManager.getEndNode(),
                graph: globalVariablesManager.getGraph().graph,
                nodes: globalVariablesManager
                    .getGraph()
                    .nodes.map((node) => (node === Infinity ? -1 : node)),
            });

            console.log(graphList.length, ` ${graphType} Graphs added`);
        }
    }
};

const saveGraphsToFile = (graphType: GraphType, graphList: GraphStorage[]) => {
    fs.writeFileSync(
        `./src/scripts/negativeWeighted${graphType}GraphExamples.json`,
        JSON.stringify(graphList),
    );
};

const negativeWeightedStandardGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.Standard, negativeWeightedStandardGraphExamples);

const negativeWeightedRecursiveDivisionGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.RecursiveDivision, negativeWeightedRecursiveDivisionGraphExamples);

const negativeWeightedDfsGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.DFS, negativeWeightedDfsGraphExamples);

const negativeWeightedRandomWallGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.RandomWalls, negativeWeightedRandomWallGraphExamples);

try {
    // Write the generated graphs to a JSON file
    saveGraphsToFile(GraphType.Standard, negativeWeightedStandardGraphExamples);
    saveGraphsToFile(GraphType.RecursiveDivision, negativeWeightedRecursiveDivisionGraphExamples);
    saveGraphsToFile(GraphType.DFS, negativeWeightedDfsGraphExamples);
    saveGraphsToFile(GraphType.RandomWalls, negativeWeightedRandomWallGraphExamples);
} catch (err) {
    console.error(err);
}
