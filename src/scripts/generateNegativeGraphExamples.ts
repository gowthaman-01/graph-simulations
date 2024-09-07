import { AlgorithmType, GraphStorage, WeightType } from '../common/types';
import { getGlobalVariablesManagerInstance } from '../utils/GlobalVariablesManager';
import { generateNewGraph } from '../utils/graph';
import { runAlgorithm } from '../utils/run';
import * as fs from 'fs';

const globalVariablesManager = getGlobalVariablesManagerInstance();
globalVariablesManager.setWeightType(WeightType.Negative);

let graphCount = 0;
const generatedGraphs: GraphStorage[] = [];

// Generate 3 graphs where Bellman-Ford gives a shorter path than Dijkstra.
while (graphCount < 100) {
    generateNewGraph();
    const [dijkstraRunResult, bellmanFordRunResult] = [
        AlgorithmType.Dijkstra,
        AlgorithmType.BellmanFord,
    ].map((algorithmType) => runAlgorithm(null, algorithmType));

    if (
        dijkstraRunResult &&
        bellmanFordRunResult &&
        bellmanFordRunResult.getTotalWeight() < dijkstraRunResult.getTotalWeight()
    ) {
        graphCount++;
        generatedGraphs.push({
            startNode: globalVariablesManager.getStartNode(),
            endNode: globalVariablesManager.getEndNode(),
            graph: globalVariablesManager.getGraph().graph,
            nodes: globalVariablesManager.getGraph().nodes,
        });

        console.log(graphCount, ' graphs added');
    }
}

try {
    // Write the generated graphs to a JSON file
    fs.writeFileSync('./src/scripts/negativeGraphExamples.json', JSON.stringify(generatedGraphs));
    console.log('File written');
} catch (err) {
    console.error(err);
}
