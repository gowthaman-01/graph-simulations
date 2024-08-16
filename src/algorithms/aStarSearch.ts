import { GRID_SIZE } from '../common/constants';
import {
    AStarHeuristicType,
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

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Finds the shortest path using Dijkstra's algorithm from startNode to endNode in the given graph.
 *
 * @returns {RunResults}
 */
export const aStarSearch = (): RunResults => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const nodes = globalVariablesManager.getGraph().nodes;
    const graph = globalVariablesManager.getGraph().graph;
    const heuristicAlgorithm =
        globalVariablesManager.getAStarHeuristicType() === AStarHeuristicType.Manhattan
            ? calculateManhattanDistance
            : calculateEuclideanDistance;
    const runResults = new RunResults(AlgorithmType.AStar);
    // This will count the number of operations performed. A single step equates to a O(1) operation.
    let steps = 0;

    // Initialize visited set, weight set and predecessors map. Each line takes O(1) time.
    const visited: VisitedSet = [];
    const weights: number[] = [];
    const predecessors: { [key: Node]: Node | null } = { [startNode]: null };

    // Set all weights to infinity except the startNode, which is set to 0. This takes O(GRID_SIZE) time.
    for (let node = 0; node < GRID_SIZE; node++) {
        weights[node] = node === startNode ? 0 : Infinity;
    }

    // Initialize the min heap with the start node
    const heap = new MinHeap<HeapNode>(heapNodeComparator); // 2 O(1) steps.
    let heapPushSteps = heap.push({ id: startNode, priority: 0 });

    steps += heapPushSteps + GRID_SIZE + 5;

    while (!heap.isEmpty()) {
        // Pop the node with the minimum weight and mark it as visited.
        const heapPopResult = heap.pop();
        if (heapPopResult === null) continue;
        let [{ id: currentNode }, heapPopSteps] = heapPopResult;

        visited[currentNode] = true; // O(1)

        steps += heapPopSteps + 2;

        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visiting);
        }

        // If the end node is reached.
        if (currentNode === endNode) {
            let shortestPath: Node[] = [];
            let predecessor: Node | null = currentNode;
            while (predecessor !== null) {
                shortestPath.unshift(predecessor);
                predecessor = predecessors[predecessor];
            }
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        for (const neighbor of graph[currentNode]) {
            if (visited[neighbor]) continue;
            const newWeight = weights[currentNode] + nodes[neighbor];
            const newWeightWithHeuristic = newWeight + heuristicAlgorithm(neighbor, endNode);

            steps += 4;
            // If a shorter path is found.
            if (newWeight < weights[neighbor]) {
                weights[neighbor] = newWeight;
                predecessors[neighbor] = currentNode;
                heapPushSteps = heap.push({ id: neighbor, priority: newWeightWithHeuristic });
                steps += heapPushSteps + 3;

                if (neighbor !== startNode && neighbor !== endNode) {
                    runResults.addStep(steps, neighbor, NodeState.Exploring);
                }
            } else {
                steps += 1;
            }
        }

        if (currentNode !== startNode && currentNode !== endNode) {
            runResults.addStep(steps, currentNode, NodeState.Visited);
        }
    }

    return runResults;
};
