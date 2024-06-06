// import { writeFileSync, readFileSync, existsSync } from 'fs';
// import { join } from 'path';
// import { AlgorithmType, GraphStructure, GraphType } from '../common/types';
// import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
// import { recreateGridGraph } from './graph';
// import { runAlgorithm } from './run';
// import { getBestAlgorithm } from './display';

// const globalVariablesManager = getGlobalVariablesManagerInstance();

// // Function to store graphs to a JSON file
// export const storeGraphs = (graphs: GraphStructure[], algorithmType: AlgorithmType): void => {
//     const filePath = join(__dirname, `${algorithmType}-data.json`);

//     const jsonData = JSON.stringify(graphs);
//     writeFileSync(filePath, jsonData, 'utf-8');
// };

// // Function to load stored graphs from the JSON file
// export const loadStoredGraphs = (algorithmType: AlgorithmType): GraphStructure[] => {
//     const filePath = join(__dirname, `${algorithmType}-data.json`);

//     if (existsSync(filePath)) {
//         const data = readFileSync(filePath, 'utf-8');
//         return JSON.parse(data);
//     }
//     return [];
// };

// const getRunResults = () => {
//     // Obtain run results for all algorithms.
//     const newRunResults = Object.values(AlgorithmType).map((algorithmType) =>
//         runAlgorithm(algorithmType),
//     );

//     globalVariablesManager.setRunResults(newRunResults);

//     return newRunResults;
// };

// // Find graphs that each algorithm works best for
// globalVariablesManager.setGraphType(GraphType.Weighted);
// globalVariablesManager.setMaxWeight(100);
// const bestDjikstra: GraphStructure[] = [];
// const bestBellmanFord: GraphStructure[] = [];
// const bestAstar: GraphStructure[] = [];
// const bestBfs: GraphStructure[] = [];
// let i = 1;

// while (bestDjikstra.length < 3) {
//     const { graph: newGraph, nodes: newNodes } = recreateGridGraph();
//     globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
//     globalVariablesManager.setRunResults(getRunResults());
//     const best = getBestAlgorithm();
//     console.log(best);
//     if (best === AlgorithmType.Djikstra) {
//         console.log(i++, 'djikstra');
//         bestDjikstra.push({ graph: newGraph, nodes: newNodes });
//     }
// }

// while (bestAstar.length < 3) {
//     const { graph: newGraph, nodes: newNodes } = recreateGridGraph();
//     globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
//     globalVariablesManager.setRunResults(getRunResults());

//     if (getBestAlgorithm() === AlgorithmType.AStar) {
//         console.log('astar');
//         bestAstar.push({ graph: newGraph, nodes: newNodes });
//     }
// }

// // while (bestBfs.length < 1) {
// //     const { graph: newGraph, nodes: newNodes } = recreateGridGraph();
// //     globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
// //     globalVariablesManager.setRunResults(getRunResults());

// //     if (getBestAlgorithm() === AlgorithmType.Bfs) {
// //         console.log('bfs');
// //         bestBfs.push({ graph: newGraph, nodes: newNodes });
// //     }
// // }

// // while (bestBellmanFord.length < 1) {
// //     const { graph: newGraph, nodes: newNodes } = recreateGridGraph();
// //     globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
// //     globalVariablesManager.setRunResults(getRunResults());

// //     if (getBestAlgorithm() === AlgorithmType.BellmanFord) {
// //         console.log('bellmanford');
// //         bestBellmanFord.push({ graph: newGraph, nodes: newNodes });
// //     }
// // }

// storeGraphs(bestDjikstra, AlgorithmType.Djikstra);
// storeGraphs(bestBfs, AlgorithmType.Bfs);
// storeGraphs(bestAstar, AlgorithmType.AStar);
// storeGraphs(bestBellmanFord, AlgorithmType.BellmanFord);
