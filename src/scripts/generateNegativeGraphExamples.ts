import { AlgorithmType, GraphStorage, GraphType, WeightType } from '../common/types';
import { getGlobalVariablesManagerInstance } from '../utils/GlobalVariablesManager';
import { generateNewGraph } from '../utils/graph';
import { runAlgorithm } from '../utils/run';
import * as fs from 'fs';

const globalVariablesManager = getGlobalVariablesManagerInstance();
globalVariablesManager.setWeightType(WeightType.Negative);

const generateGraphs = (graphType: GraphType, graphList: GraphStorage[]) => {
    while (graphList.length < 2) {
        globalVariablesManager.setGraphType(graphType);
        generateNewGraph();
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
        `./src/scripts/negative${graphType}GraphExamples.json`,
        JSON.stringify(graphList),
    );
};

const negativeStandardGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.Standard, negativeStandardGraphExamples);

const negativeRecursiveDivisionGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.RecursiveDivision, negativeRecursiveDivisionGraphExamples);

const negativeDfsGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.DFS, negativeDfsGraphExamples);

const negativeRandomWallGraphExamples: GraphStorage[] = [];
generateGraphs(GraphType.RandomWalls, negativeRandomWallGraphExamples);

try {
    // Write the generated graphs to a JSON file
    saveGraphsToFile(GraphType.Standard, negativeStandardGraphExamples);
    saveGraphsToFile(GraphType.RecursiveDivision, negativeRecursiveDivisionGraphExamples);
    saveGraphsToFile(GraphType.DFS, negativeDfsGraphExamples);
    saveGraphsToFile(GraphType.RandomWalls, negativeRandomWallGraphExamples);
} catch (err) {
    console.error(err);
}
