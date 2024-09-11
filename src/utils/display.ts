import { DEFAULT_DELAY, GRID_WIDTH } from '../common/constants';
import { AlgorithmType, Node, NodeState, GraphDiv, ShortestPathNode } from '../common/types';
import { getColorByWeight } from './color';
import { delay, getAlgorithmDisplayName } from './general';
import { createMark, markCell } from './mark';
import RunResults from '../classes/RunResults';
import { getGlobalVariablesManagerInstance } from '../classes/GlobalVariablesManager';
import { getBestAlgorithm } from './run';

const globalVariablesManager = getGlobalVariablesManagerInstance();

/**
 * Resets the grid graph display. If an algorithm is specified, only the grid graph that shows that particular algorithm is reset..
 *
 * @param {AlgorithmType} [algorithmToClear] - Optional. The specific algorithm whose graph display should be reset. If not provided, all grid graphs will be reset.
 */
export const resetGrid = (algorithmToClear?: AlgorithmType): void => {
    const isEditor = algorithmToClear === AlgorithmType.Editor;
    const graphDivs = globalVariablesManager.getGraphDivs(isEditor);
    for (const graphDiv of graphDivs) {
        const algorithmType = graphDiv.algorithmType;
        // If a specific algorithm is provided, skip clearing statistics for other algorithms.
        if (algorithmToClear && algorithmToClear !== algorithmType) {
            continue;
        }
        displayGrid(graphDiv);
    }
};

export const displayGrid = (graphDiv: GraphDiv) => {
    const nodes = globalVariablesManager.getGraph().nodes;
    const startNode = globalVariablesManager.getStartNode();
    const endNode = globalVariablesManager.getEndNode();

    const gridSize = globalVariablesManager.getGridSize();
    const rows = Math.sqrt(gridSize);
    const cols = Math.sqrt(gridSize);
    const graphDivElement = graphDiv.graphDivElement;
    const graphPosition = graphDiv.position;

    // Create grid container.
    graphDivElement.innerHTML = '';
    graphDivElement.style.display = 'grid';
    graphDivElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    graphDivElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // Create grid cells using DocumentFragment to optimise performance.
    const fragment = document.createDocumentFragment();

    // Calculate and set the cell's width and height based on the number of rows.
    const cellSize = getCellWidth(rows);
    document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);

    for (let i = 0; i < gridSize; i++) {
        const cell = document.createElement('div');

        cell.id = `${graphDiv.position}-cell-${i}`;
        cell.className = 'grid-cell';
        cell.classList.add('noselect');
        cell.style.border = 'solid 1px #0C3547';

        // Set the cell's color based on its weight.
        const weight = nodes[i];
        cell.style.backgroundColor = getColorByWeight(weight);

        if (i === startNode || i === endNode) {
            // If the cell is the start or end node, create a mark to indicate it.
            const nodeState = i === startNode ? NodeState.StartNode : NodeState.EndNode;
            const mark = createMark(i, nodeState, graphPosition);
            cell.appendChild(mark);
        } else if (i !== startNode && i !== endNode && globalVariablesManager.shouldShowWeights()) {
            // If the cell is not a start or end node, display the weight of the node.
            const weight = createMark(i, NodeState.Unvisited, graphPosition);
            cell.appendChild(weight);
        }

        fragment.appendChild(cell);
    }

    graphDivElement.appendChild(fragment);
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
     * The specific scaling factors (0.035 for below midpoint, 0.034 for above midpoint) are chosen to create a smooth transition.
     */
    let scale: number;
    if (rows <= midPoint) {
        scale = 1 + ((midPoint - rows) / (midPoint - minRows)) * 0.035;
    } else {
        scale = 1 - ((rows - midPoint) / (maxRows - midPoint)) * 0.034;
    }

    // Ensure scale doesn't go below 0.
    scale = Math.max(scale, 0);

    const cellWidth = (GRID_WIDTH * scale) / rows;

    return cellWidth;
};

/**
 * Resets and updates the Run Statistics Table based on the current run results.
 */
export const resetStatisticTable = () => {
    const runResults = globalVariablesManager.getRunResults();
    const isEndNodeReachable = globalVariablesManager.isEndNodeReachable();

    // Initialize the HTML structure for the statistics table header.
    let tableHtml = ` 
    <tr>
        <th>Algorithm</th>
        <th>Steps</th>
        <th>Cost</th>
        <th>Nodes</th>
    </tr>`;

    // Populate the table rows with data for each algorithm.
    Object.values(AlgorithmType).forEach((algorithmType) => {
        const runResult = runResults.find(
            (runResult) => runResult.getAlgorithmType() === algorithmType,
        );

        // Add a row to the table with the algorithm's name, steps, total weight, and node count.
        if (runResult) {
            tableHtml += `
        <tr>
            <td>${getAlgorithmDisplayName(algorithmType)}</td>
            <td>${isEndNodeReachable ? runResult.getAlgorithmSteps().toString() : '-'}</td>
            <td>${isEndNodeReachable ? runResult.getTotalWeight().toString() : '-'}</td>
            <td>${isEndNodeReachable ? runResult.getShortestPath().length.toString() : '-'}</td>
        </tr>`;
        }
    });

    // Update the run statistics table in the DOM with the generated HTML.
    const runStatisticTable = document.getElementById('runStatistics') as HTMLTableElement;
    runStatisticTable.innerHTML = tableHtml;

    // Update the best algorithm display paragraph with the name of the best algorithm.
    const bestAlgorithmParagraphElement = document.getElementById(
        'bestAlgorithm',
    ) as HTMLParagraphElement;

    if (isEndNodeReachable) {
        bestAlgorithmParagraphElement.textContent = `Best algorithm: ${getAlgorithmDisplayName(
            getBestAlgorithm(),
        )}`;
    } else {
        bestAlgorithmParagraphElement.textContent =
            'End node not reachable from start node! Please generate a new graph.';
    }
};

/**
 * Displays all run results step by step, updating the UI elements accordingly.
 *
 * @param {HTMLInputElement} stepsSlider - The slider element that controls the step progress.
 * @param {HTMLParagraphElement} stepsCount - The paragraph element displaying the current steps count.
 * @returns {Promise<void>} A promise that resolves when all steps have been displayed.
 */
export const displayAllRunResults = async (stepsSlider: HTMLInputElement): Promise<void> => {
    const isEditor = false;
    const visibleAlgorithms = globalVariablesManager
        .getGraphDivs(isEditor)
        .map((graphDiv) => graphDiv.algorithmType);

    const runResults = visibleAlgorithms.flatMap((algorithmType) =>
        globalVariablesManager
            .getRunResults()
            .filter((runResult) => runResult.getAlgorithmType() === algorithmType),
    );

    const maxTotalSteps = Math.max(
        ...runResults.map((runResult) => runResult.getLatestTotalSteps()),
    );

    // Determine the maximum algorithm steps, excluding those for the shortest path display.;
    let maxAlgorithmSteps = Math.max(
        ...runResults.map((runResult) => runResult.getAlgorithmSteps()),
    );

    if (maxAlgorithmSteps === 0) {
        maxAlgorithmSteps = Math.max(
            ...runResults.map((runResult) => runResult.getLatestTotalSteps()),
        );
    }

    // Set the maximum value of the steps slider to the maximum algorithm steps.
    stepsSlider.max = maxAlgorithmSteps.toString();
    let step = parseInt(stepsSlider.value);

    // Loop through and display each step until the maximum total steps are reached.
    while (step <= maxTotalSteps) {
        if (!globalVariablesManager.getIsSimulationRunning()) {
            return;
        }
        for (const runResult of runResults) {
            displayStep(step, runResult);
        }
        // Increment the step counter by the defined step increment.
        step += globalVariablesManager.getStepIncrement();

        // Update the steps count in the UI to reflect the current step.
        stepsSlider.value = step.toString();

        // Pause for a predefined delay before displaying the next step.
        await delay(DEFAULT_DELAY);
    }
};

/**
 * Displays a single step of the algorithm visualization on the grid.
 * @param {number} step - The step number to display.
 * @param {RunResults} runResult - The run result object containing the algorithm's execution data.
 */
export const displayStep = (step: number, runResult: RunResults): void => {
    const graphDiv = runResult.getGraphDiv();
    if (!graphDiv) {
        return;
    }

    // Find the nearest step in the step list that matches or is closest to the desired step number.
    const currentStep = findNearestStep(runResult.getStepList(), step);

    // Iterate over the node states at the current step and update the grid cells.
    runResult.getNodeStateList()[currentStep].forEach((nodeState, node) => {
        markCell(node, nodeState, graphDiv.position);
    });
};

/**
 * Finds the nearest step to the provided step number using binary search.
 * @param {StepMetadata[]} stepList - The list of all the steps taken by the algorithm..
 * @param {number} currentStep -  The current step number for which the nearest step is to be found.
 * @returns {number} The index of the nearest step to the current step in the step list.
 */
const findNearestStep = (stepList: number[], currentStep: number): number => {
    let start = 0;
    let end = stepList.length - 1;
    let nearestStep = 0;

    // Perform binary search to find the nearest step.
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
 * Displays the shortest path found by the algorithm on the grid.
 * @param {Node[]} shortestPath - An array of nodes that constitute the shortest path.
 * @param {GraphDiv} graphDiv - The metadata of the graph div where the shortest path should be displayed.
 */
export const displayShortestPath = async (
    shortestPath: ShortestPathNode[],
    graphDiv: GraphDiv,
): Promise<void> => {
    // Reset the grid to clear previous visualizations before displaying the shortest path.
    // This shows an empty grid for a split second before the shortest path is rendered.
    resetGrid(graphDiv.algorithmType);

    for (let i = 0; i < shortestPath.length; i++) {
        const node = shortestPath[i];
        // Skip marking the start and end nodes; only mark intermediate nodes.
        if (i !== 0 && i !== shortestPath.length - 1) {
            markCell(node.nodeId, node.direction, graphDiv.position);

            // Introduce a delay between marking nodes to slow down the visualization.
            await delay(1);
        }
    }
};
