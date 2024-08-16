import { DEFAULT_DELAY, GRID_WIDTH } from '../common/constants';
import { AlgorithmType, Node, NodeState, GraphDiv } from '../common/types';
import { getColorByWeight } from './color';
import { delay, getAlgorithmDisplayName } from './general';
import { createMark, markCell } from './mark';
import RunResults from './RunResults';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { getBestAlgorithm } from './run';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Resets the grid graph display. If an algorithm is specified, only that algorithm's statistics will be reset.
 *
 * @param {AlgorithmType} [algorithmToClear] - Optional. The specific algorithm whose statistics should be reset. If not provided, all visible algorithms will be reset.
 */
export const resetGrid = (algorithmToClear?: AlgorithmType): void => {
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();
    const nodes = globalVariablesManager.getGraph().nodes;
    const gridSize = globalVariablesManager.getGridSize();
    const rows = Math.sqrt(gridSize);
    const cols = Math.sqrt(gridSize);

    const graphDivs = globalVariablesManager.getGraphDivs();

    for (const graphDiv of graphDivs) {
        const algorithmType = graphDiv.algorithmType;
        const graphDivElement = graphDiv.graphDivElement;
        const graphPosition = graphDiv.position;

        // If a specific algorithm is provided, skip clearing statistics for other algorithms.
        if (algorithmToClear && algorithmToClear !== algorithmType) {
            continue;
        }

        // Create grid container.
        graphDivElement.innerHTML = '';
        graphDivElement.style.display = 'grid';
        graphDivElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        graphDivElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        // Create grid cells using DocumentFragment for performance.
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < gridSize; i++) {
            const cell = document.createElement('div');

            cell.id = `${graphDiv.position}-cell-${i}`;
            cell.className = 'grid-cell';
            cell.style.border = 'solid 1px #0C3547';

            const cellWidth = getCellWidth(rows);

            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellWidth}px`;

            const weight = nodes[i];
            cell.style.backgroundColor = getColorByWeight(weight);

            if (i === startNode || i === endNode) {
                // Mark
                const nodeState = i === startNode ? NodeState.StartNode : NodeState.EndNode;
                const mark = createMark(graphPosition, i, nodeState);
                cell.appendChild(mark);
            } else {
                // Weight
                const weight = createMark(graphPosition, i, NodeState.Unvisited);
                cell.appendChild(weight);
            }

            fragment.appendChild(cell);
        }

        graphDivElement.appendChild(fragment);
    }
};

/**
 * Calculates the width of each cell in a grid based on the number of rows.
 *
 * @param {number} rows - The number of rows in the grid.
 * @returns {number} - The calculated width of each cell.
 *
 */
const getCellWidth = (rows: number): number => {
    // Define the minimum and maximum number of rows for scaling
    const minRows = 10;
    const maxRows = 30;
    const midPoint = 20;

    /**
     * Scale factor that adjusts the width of each cell based on the number of rows.
     *
     * - If the number of rows is below the midpoint, the scale increases as the number of rows decreases.
     * - If the number of rows is above the midpoint, the scale decreases as the number of rows increases.
     *
     * The specific scaling factors (0.028 for below midpoint, 0.042 for above midpoint) are chosen to create a smooth transition.
     */
    let scale: number;
    if (rows <= midPoint) {
        // Increase the scale as the number of rows decreases below the midpoint
        scale = 1 + ((midPoint - rows) / (midPoint - minRows)) * 0.035;
    } else {
        // Decrease the scale as the number of rows increases above the midpoint
        scale = 1 - ((rows - midPoint) / (maxRows - midPoint)) * 0.034;
    }

    // Ensure scale doesn't go below 0
    scale = Math.max(scale, 0);

    // Calculate the cell width based on the grid width, scale, and number of rows
    const cellWidth = (GRID_WIDTH * scale) / rows;

    return cellWidth;
};

/**
 * Resets the Run Statistics Table.
 */
export const resetStatisticTable = () => {
    const graphDivs = globalVariablesManager.getGraphDivs();
    const runResults = globalVariablesManager.getRunResults();
    const isEndNodeReachable = globalVariablesManager.isEndNodeReachable();

    // Initialize the HTML structure.
    let tableHtml = ` 
    <tr>
        <th>Algorithm</th>
        <th>Steps</th>
        <th>Weight</th>
        <th>Nodes</th>
    </tr>`;

    for (const graphDiv of graphDivs) {
        const algorithmType = graphDiv.algorithmType;

        const runResult = runResults.find(
            (runResult) => runResult.getAlgorithmType() === algorithmType,
        );
        if (!runResult) continue;

        tableHtml += `
        <tr>
            <td>${getAlgorithmDisplayName(algorithmType)}</td>
            <td>${isEndNodeReachable ? runResult.getAlgorithmSteps().toString() : '-'}</td>
            <td>${isEndNodeReachable ? runResult.getTotalWeight().toString() : '-'}</td>
            <td>${isEndNodeReachable ? runResult.getShortestPath().length.toString() : '-'}</td>
        </tr>`;

        const bestAlgorithmParagraphElement = document.getElementById(
            'bestAlgorithm',
        ) as HTMLParagraphElement;

        bestAlgorithmParagraphElement.textContent = isEndNodeReachable
            ? `Best algorithm: ${getAlgorithmDisplayName(getBestAlgorithm())}`
            : 'End node not reachable from start node! Please regenerate the graph.';
    }

    const runStatisticTable = document.getElementById('runStatistics') as HTMLTableElement;
    runStatisticTable.innerHTML = tableHtml;
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
    const graphDiv = runResult.getGraphDiv();
    if (!graphDiv) {
        return;
    }
    const currentStep = findNearestStep(runResult.getStepList(), step);
    runResult.getNodeStateList()[currentStep].forEach((nodeState, node) => {
        markCell(node, nodeState, graphDiv.position);
    });
};

/**
 * Finds the nearest step to the provided step number using binary search.
 * @param {StepMetadata[]} stepList - The list of all the steps taken by the algorithm..
 * @param {number} currentStep - The current step number.
 * @returns {number} The nearest step to the current step.
 */
const findNearestStep = (stepList: number[], currentStep: number): number => {
    let start = 0;
    let end = stepList.length - 1;
    let nearestStep = 0;

    // Binary search.
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (stepList[mid] === currentStep) {
            return mid;
        } else if (stepList[mid] < currentStep) {
            nearestStep = mid;
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }

    return nearestStep;
};

/**
 * Displays the shortest path of the algorithm.
 * @param {Node[]} shortestPath - The nodes in the shortest path.
 * @param {GraphDiv} graphDiv - The Graph div metadata of the graph in which the shortest path has to be shown.
 */
export const displayShortestPath = async (
    shortestPath: Node[],
    graphDiv: GraphDiv,
): Promise<void> => {
    // Once the algorithm is complete, an empty grid is shown for a split second before the shortest path is shown.
    resetGrid(graphDiv.algorithmType);

    for (let i = 0; i < shortestPath.length; i++) {
        const node = shortestPath[i];
        // Mark every shortest path node except the start and the end.
        if (i !== 0 && i !== shortestPath.length - 1) {
            markCell(node, NodeState.ShortestPath, graphDiv.position);

            // We use a longer step increment to slow down the simulation when the shortest path is displayed.
            await delay(globalVariablesManager.getStepIncrement());
        }
    }
};
