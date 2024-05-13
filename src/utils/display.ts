import { COLS, DEFAULT_DELAY, GRID_SIZE, ROWS } from '../common/constants';
import { AlgorithmType, Nodes, Node, StepMetadata, NodeState } from '../common/types';
import { getColorByWeight } from './color';
import { delay, getAlgorithmDisplayName } from './general';
import { markCell } from './mark';
import RunResults from './RunResults';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Displays an empty grid graph for the given algorithms.
 * @param gridContainers The collection of grid containers to display the graphs in.
 * @param algorithms The list of algorithms whose grid graphs need to be cleared.
 */
export const displayEmptyGrid = (
    gridContainers: HTMLCollectionOf<HTMLDivElement>,
    algorithms: AlgorithmType[],
) => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const nodes = globalVariablesManager.getGraph().nodes;

    for (const gridContainer of Array.from(gridContainers)) {
        const algorithmType: AlgorithmType = gridContainer.id as AlgorithmType;

        // If algorithmType not the list of algorithms to be cleared.
        if (!algorithms.includes(algorithmType)) {
            continue;
        }

        // Clear total weight display.
        const weightParagraphElement = document.getElementById(
            `${algorithmType}-weight`,
        ) as HTMLParagraphElement;
        weightParagraphElement.innerHTML = getAlgorithmDisplayName(algorithmType);

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
            cell.style.border = `solid 1px #59595d`;
            cell.style.backgroundColor = color;

            const mark = document.createElement('img');
            mark.style.width = '90%';
            mark.classList.add('mark');

            if (i == startNode) {
                mark.id = `${algorithmType}-cell-${i}-${NodeState.StartNode}`;
                mark.src = `./assets/start.png`;
            } else if (i == endNode) {
                mark.id = `${algorithmType}-cell-${i}-mark-${NodeState.EndNode}`;
                mark.src = `./assets/end.png`;
            }

            if (i == startNode || i == endNode) {
                cell.appendChild(mark);
            }

            gridContainer.appendChild(cell);
        }
    }
};

/**
 * Displays all run results step by step.
 * @param runResultList The list of run results to display.
 * @param stepsSlider The steps slider element.
 * @param stepsCount The paragraph element displaying the current steps count.
 */
export const displayAllRunResults = async (
    runResultList: RunResults[],
    stepsSlider: HTMLInputElement,
    stepsCount: HTMLParagraphElement,
) => {
    const stepIncrement = globalVariablesManager.getStepIncrement();

    const maxTotalSteps = Math.max(...runResultList.map((result) => result.getTotalSteps()));
    const maxAlgorithmSteps = Math.max(
        ...runResultList.map((result) => result.getAlgorithmSteps()),
    );
    let step = parseInt(stepsSlider.value);
    stepsSlider.max = maxAlgorithmSteps.toString();

    // Display each step.
    while (step <= maxTotalSteps) {
        for (const runResult of runResultList) {
            if (runResult.isDisplayComplete()) continue;
            if (step >= runResult.getTotalSteps()) {
                displayTotalWeight(runResult.getTotalWeight(), runResult.getAlgorithmType());
                runResult.setDisplayComplete();
                continue;
            }
            displayStep(step, runResult);
        }

        step += stepIncrement;
        stepsCount.innerHTML = `Steps: ${parseInt(stepsSlider.value).toString()}`;
        stepsSlider.value = step.toString();
        await delay(DEFAULT_DELAY);
    }

    // Display the total weight for the slowest algorithm.
    runResultList
        .filter((runResult) => !runResult.isDisplayComplete())
        .forEach((runResult) =>
            displayTotalWeight(runResult.getTotalWeight(), runResult.getAlgorithmType()),
        );
};

/**
 * Displays the total weight of the path found by the algorithm.
 * @param totalWeight The total weight of the path.
 * @param algorithmType The type of algorithm used to find the path.
 */
export const displayTotalWeight = (totalWeight: number, algorithmType: AlgorithmType) => {
    const weightParagraphElement = document.getElementById(
        `${algorithmType}-weight`,
    ) as HTMLParagraphElement;
    weightParagraphElement.innerHTML = `${getAlgorithmDisplayName(
        algorithmType,
    )} | Total weight = ${totalWeight}`;
};

/**
 * Displays a single step of the algorithm visualization.
 * @param step The step number to display.
 * @param runResult The run result object.
 */
export const displayStep = (step: number, runResult: RunResults) => {
    const currentStep = findNearestStep(runResult.getStepMetadataList(), step);
    Object.values(currentStep.nodeMetaDataMap).forEach((nodeMetaData) => {
        markCell(nodeMetaData.id, nodeMetaData.state, runResult.getAlgorithmType());
    });
};

/**
 * Finds the nearest step metadata to the provided step number.
 * @param stepMetadataList The list of step metadata.
 * @param currentStep The current step number.
 * @returns The nearest step metadata to the current step.
 */
const findNearestStep = (stepMetadataList: StepMetadata[], currentStep: number) => {
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
 * @param gridContainers The collection of grid containers to display the grid in.
 * @param nodes The collection of nodes.
 * @param startNode The index of the starting node.
 * @param endNode The index of the ending node.
 * @param shortestPath The nodes in the shortest path.
 * @param algorithmType The algorithm type to display the shortest path.
 * @param stepIncrement The step increment for visualization.
 */
export const displayShortestPath = async (
    gridContainers: HTMLCollectionOf<HTMLDivElement>,
    shortestPath: Node[],
    algorithmType: AlgorithmType,
) => {
    const stepIncrement = globalVariablesManager.getStepIncrement();

    displayEmptyGrid(gridContainers, [algorithmType]);
    for (let i = 0; i < shortestPath.length; i++) {
        const node = shortestPath[i];
        // Mark every shortest path node except the start and the end.
        if (i !== 0 && i !== shortestPath.length - 1) {
            markCell(node.id, NodeState.ShortestPath, algorithmType);
            await delay(stepIncrement);
        }
    }
};
