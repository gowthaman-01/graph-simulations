import {
    HeuristicType,
    AlgorithmType,
    HeapNode,
    Node,
    NodeState,
    VisitedSet,
} from '../common/types';
import { MinHeap, heapNodeComparator } from '../data-structures/MinHeap';
import { getGlobalVariablesManagerInstance } from '../utils/GlobalVariablesManager';
import RunResults from '../utils/RunResults';
import { calculateEuclideanDistance, calculateManhattanDistance } from '../utils/general';
import { getNeighborWeight } from '../utils/graph';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Finds the shortest path using the A* Search algorithm from startNode to endNode in the given graph.
 *
 * @returns {RunResults}
 */
export const aStarSearch = (): RunResults => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const nodes = globalVariablesManager.getGraph().nodes;
    const graph = globalVariablesManager.getGraph().graph;
    const heuristicAlgorithm =
        globalVariablesManager.getHeuristicType() === HeuristicType.Manhattan
            ? calculateManhattanDistance
            : calculateEuclideanDistance;
    const runResults = new RunResults(AlgorithmType.AStar);
    const gridSize = globalVariablesManager.getGridSize();

    // This will estimate the number of machine operations performed.
    // For more details, please refer to /docs/step_counting_stadards.md.
    // Note: Steps involved in adding to runResults and consolidating the shortest path are excluded from this calculation.
    let steps = 0;

    // Initialize visited set, weight set and predecessors map. Each line takes O(1) time.
    const visited: VisitedSet = [];
    const weights: number[] = [];
    const predecessors: Node[] = [];
    predecessors[startNode] = -1;
    steps += 4;

    // Set all weights to infinity except the startNode, which is set to 0. This takes O(gridSize) time.
    for (let node = 0; node < gridSize; node++) {
        weights[node] = node === startNode ? 0 : Infinity;
        steps += 3;
    }

    // Initialize the min heap with the start node
    const heap = new MinHeap<HeapNode>(heapNodeComparator);
    let heapPushSteps = heap.push({ id: startNode, priority: 0 });
    steps += heapPushSteps + 1;

    while (!heap.isEmpty()) {
        // Pop the node with the minimum weight and mark it as visited.
        const heapPopResult = heap.pop();
        if (heapPopResult === null) continue;
        let [{ id: currentNode }, heapPopSteps] = heapPopResult;

        visited[currentNode] = true;
        steps += heapPopSteps + 3;

        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visiting);
        }

        // If the end node is reached.
        if (currentNode === endNode) {
            let shortestPath: Node[] = [];
            let predecessor: Node = currentNode;
            while (predecessor !== -1) {
                shortestPath.unshift(predecessor);
                predecessor = predecessors[predecessor];
            }
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor] || nodes[neighbor] === Infinity) continue;
            const neighborWeight = getNeighborWeight(nodes[currentNode], nodes[neighbor]);
            const newWeight = weights[currentNode] + neighborWeight;
            // Calculating the heuristic takes approximately 13 steps.
            const newWeightWithHeuristic = newWeight + heuristicAlgorithm(neighbor, endNode);
            steps += 24;

            // If a shorter path is found.
            if (newWeight < weights[neighbor]) {
                weights[neighbor] = newWeight;
                predecessors[neighbor] = currentNode;
                heapPushSteps = heap.push({ id: neighbor, priority: newWeightWithHeuristic });
                steps += heapPushSteps + 3;

                if (neighbor !== startNode && neighbor !== endNode) {
                    runResults.addStep(steps, neighbor, NodeState.Exploring);
                }
            }

            steps += 1;
        }

        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visited);
        }
    }

    return runResults;
};
