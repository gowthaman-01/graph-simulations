import { COLS, DEFAULT_DELAY, GRID_SIZE, ROWS } from '../common/constants';
import { AlgorithmType, Nodes, Node, StepMetadata, NodeState } from '../common/types';
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

        // Create grid cells.
        for (let i = 0; i < GRID_SIZE; i++) {
            const cell = document.createElement('div');
            const weight = nodes[i.toString()].weight;
            const color = getColorByWeight(weight);
            cell.id = `${gridContainer.id}-cell-${i}`;
            cell.className = 'grid-cell';
            cell.style.border = `solid 1px #0C3547`;
            cell.style.backgroundColor = color;

            // Mark the start and end nodes with the appropriate image.
            if (i == startNode || i == endNode) {
                const nodeState = i === startNode ? NodeState.StartNode : NodeState.EndNode;
                const mark = createMark(algorithmType, i.toString(), nodeState);
                cell.appendChild(mark);
            }

            gridContainer.appendChild(cell);
        }

        // Update statistics table.
        const weightTableElement = document.getElementById(
            `${algorithmType}-weight`,
        ) as HTMLTableCellElement;
        const stepsTableElement = document.getElementById(
            `${algorithmType}-steps`,
        ) as HTMLTableCellElement;
        const nodesTableElement = document.getElementById(
            `${algorithmType}-nodes`,
        ) as HTMLTableCellElement;
        const bestAlgorithmParagraphElement = document.getElementById(
            'best-algorithm',
        ) as HTMLParagraphElement;

        const runResult = runResults.find(
            (runResult) => runResult.getAlgorithmType() === algorithmType,
        );
        if (!runResult) continue;

        weightTableElement.innerHTML = runResult.getTotalWeight().toString();
        stepsTableElement.innerHTML = runResult.getAlgorithmSteps().toString();
        // Number of nodes in the shortest path is equal to its length.
        nodesTableElement.innerHTML = runResult.getShortestPath().length.toString();
        bestAlgorithmParagraphElement.innerHTML = `Best algorithm: ${getAlgorithmDisplayName(
            getBestAlgorithm(),
        )}`;
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
    const runResultList = globalVariablesManager.getRunResults();
    const stepIncrement = globalVariablesManager.getStepIncrement();

    // maxAlgorithmSteps represent the number of steps that the algorithm took to run, excluding the steps that display the shortest path.
    const maxTotalSteps = Math.max(...runResultList.map((result) => result.getLatestTotalSteps()));
    const maxAlgorithmSteps = Math.max(
        ...runResultList.map((result) => result.getAlgorithmSteps()),
    );

    let step = parseInt(stepsSlider.value);
    stepsSlider.max = maxAlgorithmSteps.toString();

    // Display each step.
    while (step <= maxTotalSteps) {
        for (const runResult of runResultList) {
            if (runResult.isDisplayComplete()) continue;
            if (step >= runResult.getLatestTotalSteps()) {
                runResult.setDisplayComplete();
                continue;
            }
            displayStep(step, runResult);
        }

        step += stepIncrement;
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
    Object.values(currentStep.nodeMetaDataMap).forEach((nodeMetaData) => {
        markCell(nodeMetaData.id, nodeMetaData.state, runResult.getAlgorithmType());
    });
};

/**
 * Finds the nearest step metadata to the provided step number.
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
            await delay(DEFAULT_DELAY * 3);
        }
    }
};
