import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/djikstra';
import { AlgorithmType, Graph, GraphType, Nodes } from '../common/types';

export const runAlgorithm = (
    graph: Graph,
    graphType: GraphType,
    nodes: Nodes,
    startNode: number,
    endNode: number,
    algorithmType: AlgorithmType,
    stepDifference: number,
) => {
    const algorithm = getAlgorithmFromAlgorithmType(algorithmType);
    const runResults = algorithm(graph, graphType, nodes, startNode, endNode, stepDifference);
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
