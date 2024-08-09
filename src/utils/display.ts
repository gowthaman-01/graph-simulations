import {
    COLS,
    DEFAULT_DELAY,
    GRID_SIZE,
    ROWS,
    SHORTEST_PATH_DELAY_MULTIPLIER,
} from '../common/constants';
import { AlgorithmType, Node, StepMetadata, NodeState } from '../common/types';
import { getColorByWeight } from './color';
import { delay, getAlgorithmDisplayName } from './general';
import { createMark, markCell } from './mark';
import RunResults from './RunResults';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { getBestAlgorithm } from './run';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Displays an empty grid graph for the given algorithms, and updates the statistics table.
 * @param {HTMLCollectionOf<HTMLDivElement>} gridContainers - The collection of grid containers to display the graphs in.
 * @param {AlgorithmType[]} algorithms - The list of algorithms whose grid graphs need to be cleared.
 */
export const resetGridAndStatisticTable = (
    gridContainers: HTMLCollectionOf<HTMLDivElement>,
    algorithms: AlgorithmType[],
): void => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const nodes = globalVariablesManager.getGraph().nodes;
    const runResults = globalVariablesManager.getRunResults();

    for (const gridContainer of Array.from(gridContainers)) {
        const algorithmType: AlgorithmType = gridContainer.id as AlgorithmType;

        // If algorithmType not the list of algorithms to be cleared, we skip it.
        if (!algorithms.includes(algorithmType)) {
            continue;
        }

        // Create grid container.
        gridContainer.innerHTML = '';
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${COLS}, 140fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;

        // Create grid cells using DocumentFragment for performance.
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < GRID_SIZE; i++) {
            const cell = document.createElement('div');

            cell.id = `${gridContainer.id}-cell-${i}`;
            cell.className = 'grid-cell';
            cell.style.border = 'solid 1px #0C3547';

            const weight = nodes[i.toString()].weight;
            cell.style.backgroundColor = getColorByWeight(weight);

            if (i === startNode || i === endNode) {
                // Mark
                const nodeState = i === startNode ? NodeState.StartNode : NodeState.EndNode;
                const mark = createMark(algorithmType, i.toString(), nodeState);
                cell.appendChild(mark);
            } else {
                // Weight
                const weight = createMark(algorithmType, i.toString(), NodeState.Unvisited);
                cell.appendChild(weight);
            }

            fragment.appendChild(cell);
        }

        gridContainer.appendChild(fragment);

        // Update statistics table.
        const weightTableElement = document.getElementById(
            `${algorithmType}Weight`,
        ) as HTMLTableCellElement;
        const stepsTableElement = document.getElementById(
            `${algorithmType}Steps`,
        ) as HTMLTableCellElement;
        const nodesTableElement = document.getElementById(
            `${algorithmType}Nodes`,
        ) as HTMLTableCellElement;
        const bestAlgorithmParagraphElement = document.getElementById(
            'bestAlgorithm',
        ) as HTMLParagraphElement;

        const runResult = runResults.find(
            (runResult) => runResult.getAlgorithmType() === algorithmType,
        );

        if (!runResult) continue;

        const isEndNodeReachable = globalVariablesManager.isEndNodeReachable();

        weightTableElement.textContent = isEndNodeReachable
            ? runResult.getTotalWeight().toString()
            : '-';
        stepsTableElement.textContent = isEndNodeReachable
            ? runResult.getAlgorithmSteps().toString()
            : '-';
        // Number of nodes in the shortest path is equal to its length.
        nodesTableElement.textContent = isEndNodeReachable
            ? runResult.getShortestPath().length.toString()
            : '-';
        bestAlgorithmParagraphElement.textContent = isEndNodeReachable
            ? `Best algorithm: ${getAlgorithmDisplayName(getBestAlgorithm())}`
            : 'End node not reachable from start node! Please regenerate the graph.';
    }
};

/**
 * Displays all run results step by step.
 * @param stepsSlider The steps slider element.
 * @param stepsCount The paragraph element displaying the current steps count.
 */
export const displayAllRunResults = async (
    stepsSlider: HTMLInputElement,
    stepsCount: HTMLParagraphElement,
): Promise<void> => {
    const runResults = globalVariablesManager.getRunResults();

    const maxTotalSteps = Math.max(
        ...runResults.map((runResult) => runResult.getLatestTotalSteps()),
    );
    // maxAlgorithmSteps represent the number of steps that the algorithm took to run, excluding the steps that display the shortest path.
    const maxAlgorithmSteps = Math.max(
        ...runResults.map((runResult) => runResult.getAlgorithmSteps()),
    );

    stepsSlider.max = maxAlgorithmSteps.toString();
    let step = parseInt(stepsSlider.value);

    // Display each step.
    while (step <= maxTotalSteps) {
        for (const runResult of runResults) {
            if (step >= runResult.getLatestTotalSteps() && !runResult.isDisplayComplete()) {
                runResult.setDisplayComplete();
            } else {
                displayStep(step, runResult);
            }
        }

        step += globalVariablesManager.getStepIncrement();
        stepsSlider.value = step.toString();
        stepsCount.innerHTML = `Steps: ${parseInt(stepsSlider.value).toString()}`;

        await delay(DEFAULT_DELAY);
    }
};

/**
 * Displays a single step of the algorithm visualization.
 * @param {number} step - The step number to display.
 * @param {RunResults} runResult - The run result object.
 */
export const displayStep = (step: number, runResult: RunResults): void => {
    const currentStep = findNearestStep(runResult.getStepMetadataList(), step);
    Object.values(currentStep.nodeMetadataMap).forEach((nodeMetadata) => {
        markCell(nodeMetadata.id, nodeMetadata.state, runResult.getAlgorithmType());
    });
};

/**
 * Finds the nearest step metadata to the provided step number using binary search.
 * @param {StepMetadata[]} stepMetadataList - The list of step metadata.
 * @param {number} currentStep - The current step number.
 * @returns {StepMetadata} The nearest step metadata to the current step.
 */
const findNearestStep = (stepMetadataList: StepMetadata[], currentStep: number): StepMetadata => {
    let start = 0;
    let end = stepMetadataList.length - 1;
    let nearestStep = stepMetadataList[0];

    // Binary search.
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (stepMetadataList[mid].steps === currentStep) {
            return stepMetadataList[mid];
        } else if (stepMetadataList[mid].steps < currentStep) {
            nearestStep = stepMetadataList[mid];
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return nearestStep;
};

/**
 * Displays the shortest path of the algorithm.
 * @param {HTMLCollectionOf<HTMLDivElement>} gridContainers - The collection of grid containers to display the grid in.
 * @param {Node[]} shortestPath - The nodes in the shortest path.
 * @param {AlgorithmType} algorithmType - The algorithm type to display the shortest path.
 */
export const displayShortestPath = async (
    gridContainers: HTMLCollectionOf<HTMLDivElement>,
    shortestPath: Node[],
    algorithmType: AlgorithmType,
): Promise<void> => {
    // Once the algorithm is complete, an empty grid is shown for a split second before the shortest path is shown.
    resetGridAndStatisticTable(gridContainers, [algorithmType]);

    for (let i = 0; i < shortestPath.length; i++) {
        const node = shortestPath[i];
        // Mark every shortest path node except the start and the end.
        if (i !== 0 && i !== shortestPath.length - 1) {
            markCell(node.id, NodeState.ShortestPath, algorithmType);

            // We use a longer step increment to slow down the simulation when the shortest path is displayed.
            await delay(globalVariablesManager.getStepIncrement() * SHORTEST_PATH_DELAY_MULTIPLIER);
        }
    }
};
