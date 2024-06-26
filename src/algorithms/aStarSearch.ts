import { GRID_SIZE } from '../common/constants';
import {
    AStarHeuristicType,
    AlgorithmType,
    HeapNode,
    NewNodeState,
    Node,
    NodeState,
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
    const visited: { [key: string]: boolean } = {};
    const weights: { [key: string]: number } = {};
    const predecessors: { [key: string]: string | null } = { [startNode]: null };

    // Set all weights to infinity except the startNode, which is set to 0. This takes O(GRID_SIZE) time.
    Object.keys(graph).forEach((node) => {
        weights[node] = node === startNode.toString() ? 0 : Infinity;
    });

    // Initialize the min heap with the start node
    const heap = new MinHeap<HeapNode>(heapNodeComparator); // 2 O(1) steps.
    let heapPushSteps = heap.push({ id: startNode.toString(), priority: 0 });

    steps += heapPushSteps + GRID_SIZE + 5;

    while (!heap.isEmpty()) {
        // Pop the node with the minimum weight and mark it as visited.
        const heapPopResult = heap.pop();
        if (heapPopResult === null) continue;
        let [{ id: currentNode }, heapPopSteps] = heapPopResult;

        visited[currentNode] = true; // O(1)

        steps += heapPopSteps + 2;

        if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
            const newNodeState: NewNodeState = {
                id: currentNode,
                newState: NodeState.Visiting,
            };
            runResults.addStep(steps, [newNodeState]);
        }

        // If the end node is reached.
        if (currentNode === endNode.toString()) {
            let shortestPath: Node[] = [];
            let predecessor: string | null = currentNode;
            while (predecessor !== null) {
                shortestPath.unshift({ id: predecessor, weight: nodes[predecessor].weight });
                predecessor = predecessors[predecessor];
            }
            runResults.setShortestPath(shortestPath);
            return runResults;
        }

        for (const neighbor of graph[currentNode]) {
            const { id: neighborId, weight: neighborWeight } = neighbor;
            if (visited[neighborId]) continue;
            const newWeight = weights[currentNode] + neighborWeight;
            const newWeightWithHeuristic =
                newWeight + heuristicAlgorithm(neighborId, endNode.toString());

            steps += 4;
            // If a shorter path is found.
            if (newWeight < weights[neighborId]) {
                weights[neighborId] = newWeight;
                predecessors[neighborId] = currentNode;
                heapPushSteps = heap.push({ id: neighborId, priority: newWeightWithHeuristic });
                steps += heapPushSteps + 3;

                if (neighborId !== startNode.toString() && neighborId !== endNode.toString()) {
                    const newNodeState: NewNodeState = {
                        id: neighbor.id,
                        newState: NodeState.Exploring,
                    };
                    runResults.addStep(steps, [newNodeState]);
                }
            } else {
                steps += 1;
            }
        }

        if (currentNode !== startNode.toString() && currentNode !== endNode.toString()) {
            const newNodeState: NewNodeState = {
                id: currentNode,
                newState: NodeState.Visited,
            };
            runResults.addStep(steps, [newNodeState]);
        }
    }

    return runResults;
};
