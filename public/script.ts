import { COLS, END_NODE, MAX_DISTANCE, ROWS, START_NODE } from '../src/common/constants';
import { getColorByDistance } from '../src/utils/color';
import { AlgorithmType } from '../src/common/types';
import { createGraph } from '../src/utils/graph';
import {
    displayInitialNodeState,
    displayAllRunResults,
    displayStep,
    displayTotalWeight,
} from '../src/utils/display';
import { runAlgorithm } from '../src/utils/run';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    // HTML elements
    const gridContainers = document.getElementsByClassName(
        'grid-container',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const runButton = document.getElementById('runAlgorithms') as HTMLButtonElement;
    const newGraphButton = document.getElementById('newGraph') as HTMLButtonElement;
    const changeStartButton = document.getElementById('changeStart') as HTMLButtonElement;
    const changeEndButton = document.getElementById('changeEnd') as HTMLButtonElement;
    const weight_checkbox = document.getElementById('weight-checkbox') as HTMLInputElement;
    const weight_switch = document.getElementById('weight-switch') as HTMLLabelElement;
    // const maze_checkbox = document.getElementById('maze-checkbox') as HTMLInputElement;
    // const maze_switch = document.getElementById('maze-switch') as HTMLLabelElement;
    const legendCells = document.getElementsByClassName(
        'legend-cell',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const weightSlider = document.getElementById('weight-slider') as HTMLInputElement;
    const stepsSlider = document.getElementById('steps-slider') as HTMLInputElement;
    const stepsCount = document.getElementById('steps-count') as HTMLParagraphElement;

    // Return early if an element is undefined.
    if (
        !gridContainers ||
        gridContainers.length === 0 ||
        !runButton ||
        !newGraphButton ||
        !changeStartButton ||
        !changeEndButton ||
        !weight_checkbox ||
        !weight_switch ||
        // !maze_checkbox ||
        // !maze_switch ||
        !legendCells ||
        !weightSlider ||
        !stepsSlider ||
        !stepsCount
    )
        return;

    // Initialise variables.
    let isMaze = false;
    let orientation: 'H' | 'V' = 'H';

    let maxDistance = 1;

    let startNode = START_NODE();
    let endNode = END_NODE();

    let firstRender = true;

    // Helper functions
    const disableWeightSlider = () => {
        weightSlider.style.cursor = 'not-allowed';
        weightSlider.disabled = true;
        document.documentElement.style.setProperty('--weight-slider-cursor', 'not-allowed');
    };

    const enableWeightSlider = () => {
        weightSlider.style.cursor = 'pointer';
        weightSlider.disabled = false;
        document.documentElement.style.setProperty('--weight-slider-cursor', 'pointer');
    };

    const disableWeightControls = () => {
        disableWeightSlider();
        weight_switch.style.cursor = 'not-allowed';
        weight_checkbox.disabled = true;
    };

    const enableWeightControls = () => {
        enableWeightSlider();
        weight_switch.style.cursor = 'pointer';
        weight_checkbox.disabled = false;
    };

    const disableGraphControls = () => {
        runButton.disabled = true;
        runButton.style.cursor = 'not-allowed';
        newGraphButton.disabled = true;
        newGraphButton.style.cursor = 'not-allowed';
        changeStartButton.disabled = true;
        changeStartButton.style.cursor = 'not-allowed';
        changeEndButton.disabled = true;
        changeEndButton.style.cursor = 'not-allowed';
        // maze_switch.style.cursor = 'not-allowed';
        // maze_checkbox.disabled = true;
    };

    const enableGraphControls = () => {
        runButton.disabled = false;
        runButton.style.cursor = 'pointer';
        newGraphButton.disabled = false;
        newGraphButton.style.cursor = 'pointer';
        changeStartButton.disabled = false;
        changeStartButton.style.cursor = 'pointer';
        changeEndButton.disabled = false;
        changeEndButton.style.cursor = 'pointer';
        // maze_switch.style.cursor = 'pointer';
        // maze_checkbox.disabled = false;
    };

    const setWeightColor = () => {
        const weightColor = getColorByDistance(maxDistance);
        document.documentElement.style.setProperty('--slider-thumb-bg', weightColor);
        document.documentElement.style.setProperty('--weight-switch-bg', weightColor);
    };

    const resetStepsSlider = () => {
        stepsSlider.value = '0';
        stepsCount.innerHTML = `Steps: 0`;
        document.documentElement.style.setProperty('--steps-slider-cursor', 'pointer');
    };

    const disableStepsSlider = () => {
        stepsSlider.style.cursor = 'not-allowed';
        stepsSlider.disabled = true;
        document.documentElement.style.setProperty('--steps-slider-cursor', 'not-allowed');
    };

    const enableStepsSlider = () => {
        stepsSlider.style.cursor = 'pointer';
        stepsSlider.disabled = false;
        document.documentElement.style.setProperty('--steps-slider-cursor', 'pointer');
    };

    const getRunResults = () => {
        const newRunResults = Object.values(AlgorithmType).map((algorithmType) =>
            runAlgorithm(graph, nodes, startNode, endNode, algorithmType),
        );

        stepsSlider.max = Math.max(
            ...newRunResults.map((result) => result.getTotalSteps()),
        ).toString();

        return newRunResults;
    };

    // Set slider thumb color.
    setWeightColor();
    disableWeightSlider();
    resetStepsSlider();

    let { graph, nodes } = createGraph(ROWS, COLS, maxDistance, isMaze, orientation);
    let runResults = getRunResults();

    // Display graph.
    displayInitialNodeState(
        gridContainers,
        nodes,
        startNode,
        endNode,
        Object.values(AlgorithmType),
    );

    // Event listeners
    runButton.addEventListener('click', async () => {
        disableGraphControls();
        disableWeightControls();
        disableStepsSlider();

        if (!firstRender) {
            runResults = getRunResults();

            displayInitialNodeState(
                gridContainers,
                nodes,
                startNode,
                endNode,
                Object.values(AlgorithmType),
            );
            resetStepsSlider();
        }

        firstRender = false;

        await displayAllRunResults(runResults, stepsSlider, stepsCount);

        enableGraphControls();
        enableWeightControls();
        enableStepsSlider();
    });

    newGraphButton.addEventListener('click', async () => {
        const { graph: newGraph, nodes: newNodes } = createGraph(
            ROWS,
            COLS,
            maxDistance,
            isMaze,
            orientation,
        );
        graph = newGraph;
        nodes = newNodes;
        runResults = getRunResults();

        displayInitialNodeState(
            gridContainers,
            nodes,
            startNode,
            endNode,
            Object.values(AlgorithmType),
        );
        resetStepsSlider();
    });

    changeStartButton.addEventListener('click', () => {
        startNode = START_NODE();
        runResults = getRunResults();

        displayInitialNodeState(
            gridContainers,
            nodes,
            startNode,
            endNode,
            Object.values(AlgorithmType),
        );
        resetStepsSlider();
    });

    changeEndButton.addEventListener('click', async () => {
        endNode = END_NODE();
        runResults = getRunResults();

        displayInitialNodeState(
            gridContainers,
            nodes,
            startNode,
            endNode,
            Object.values(AlgorithmType),
        );
        resetStepsSlider();
    });

    weight_checkbox.addEventListener('change', async () => {
        if (weight_checkbox.checked) {
            maxDistance = (Math.floor(parseInt(weightSlider.value)) / 100) * MAX_DISTANCE;
            setWeightColor();
            enableWeightSlider();

            const { graph: newGraph, nodes: newNodes } = createGraph(
                ROWS,
                COLS,
                maxDistance,
                isMaze,
                orientation,
            );
            graph = newGraph;
            nodes = newNodes;
            runResults = getRunResults();

            displayInitialNodeState(
                gridContainers,
                nodes,
                startNode,
                endNode,
                Object.values(AlgorithmType),
            );
            resetStepsSlider();
        } else {
            maxDistance = 1;
            setWeightColor();
            disableWeightSlider();

            const { graph: newGraph, nodes: newNodes } = createGraph(
                ROWS,
                COLS,
                maxDistance,
                isMaze,
                orientation,
            );
            graph = newGraph;
            nodes = newNodes;
            runResults = getRunResults();

            displayInitialNodeState(
                gridContainers,
                nodes,
                startNode,
                endNode,
                Object.values(AlgorithmType),
            );
            resetStepsSlider();
        }
    });

    weightSlider.addEventListener('input', async () => {
        maxDistance = (Math.floor(parseInt(weightSlider.value)) / 100) * MAX_DISTANCE;
        setWeightColor();
        const { graph: newGraph, nodes: newNodes } = createGraph(
            ROWS,
            COLS,
            maxDistance,
            isMaze,
            orientation,
        );
        graph = newGraph;
        nodes = newNodes;
        runResults = getRunResults();

        displayInitialNodeState(
            gridContainers,
            nodes,
            startNode,
            endNode,
            Object.values(AlgorithmType),
        );
        resetStepsSlider();
    });

    stepsSlider.addEventListener('input', async () => {
        displayInitialNodeState(
            gridContainers,
            nodes,
            startNode,
            endNode,
            Object.values(AlgorithmType),
        );
        stepsCount.innerHTML = `Steps: ${stepsSlider.value}`;
        runResults.forEach((runResult) => {
            displayStep(parseInt(stepsSlider.value), runResult);
        });

        if (stepsSlider.value === stepsSlider.max) {
            runResults.forEach((runResult) =>
                displayTotalWeight(runResult.getTotalWeights(), runResult.getAlgorithmType()),
            );
        }
    });
});
