import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/djikstra';
import { AlgorithmType, Graph, Nodes } from '../common/types';

export const runAlgorithm = (
    graph: Graph,
    nodes: Nodes,
    startNode: number,
    endNode: number,
    algorithmType: AlgorithmType,
    stepDifference: number,
) => {
    const algorithm = getAlgorithmFromAlgorithmType(algorithmType);
    const runResults = algorithm(graph, nodes, startNode, endNode, stepDifference);
    return runResults;
};

const getAlgorithmFromAlgorithmType = (algorithmType: AlgorithmType) => {
    switch (algorithmType) {
        case AlgorithmType.Bfs:
            return bfs;
        case AlgorithmType.Djikstra:
            return dijkstra;
    }
};
