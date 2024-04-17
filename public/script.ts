import {
    COLS,
    DEFAULT_STEP_DIFFERENCE,
    END_NODE,
    MAX_WEIGHT,
    ROWS,
    START_NODE,
} from '../src/common/constants';
import { getColorByWeight } from '../src/utils/color';
import { AlgorithmType, GraphType } from '../src/common/types';
import { createGraph, getNodeWithMaxWeight, getNodeWithMinWeight } from '../src/utils/graph';
import {
    displayInitialNodeState,
    displayAllRunResults,
    displayStep,
    displayTotalWeight,
    displayShortestPath,
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
    const graphDropdown = document.getElementById('graph-dropdown') as HTMLInputElement;
    const legendCells = document.getElementsByClassName(
        'legend-cell',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const weightSlider = document.getElementById('weight-slider') as HTMLInputElement;
    const stepsSlider = document.getElementById('steps-slider') as HTMLInputElement;
    const stepsCount = document.getElementById('steps-count') as HTMLParagraphElement;
    const speedSlider = document.getElementById('speed-slider') as HTMLInputElement;

    // Return early if an element is undefined.
    if (
        !gridContainers ||
        gridContainers.length === 0 ||
        !runButton ||
        !newGraphButton ||
        !changeStartButton ||
        !changeEndButton ||
        !graphDropdown ||
        // !maze_checkbox ||
        // !maze_switch ||
        !legendCells ||
        !weightSlider ||
        !stepsSlider ||
        !stepsCount ||
        !speedSlider
    )
        return;

    // Initialise variables.
    let graphType = GraphType.Unweighted;

    let maxWeight = 1;
    let stepDifference = DEFAULT_STEP_DIFFERENCE;

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
    };

    const enableWeightControls = () => {
        enableWeightSlider();
    };

    const disableGraphControls = () => {
        runButton.disabled = true;
        newGraphButton.disabled = true;
        changeStartButton.disabled = true;
        changeEndButton.disabled = true;
    };

    const enableGraphControls = () => {
        runButton.disabled = false;
        newGraphButton.disabled = false;
        if (graphType !== GraphType.Directed) {
            changeStartButton.disabled = false;
            changeEndButton.disabled = false;
        }
    };

    const setWeightColor = () => {
        const weightColor = getColorByWeight(maxWeight);
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

    const disableSpeedSlider = () => {
        speedSlider.style.cursor = 'not-allowed';
        speedSlider.disabled = true;
        document.documentElement.style.setProperty('--speed-slider-cursor', 'not-allowed');
    };

    const enableSpeedSlider = () => {
        speedSlider.style.cursor = 'pointer';
        speedSlider.disabled = false;
        document.documentElement.style.setProperty('--speed-slider-cursor', 'pointer');
    };

    const disableStartEndNodeButton = () => {
        changeStartButton.disabled = true;
        changeEndButton.disabled = true;
    };

    const enableStartEndNodeButton = () => {
        changeStartButton.disabled = false;
        changeEndButton.disabled = false;
    };

    const getRunResults = () => {
        const newRunResults = Object.values(AlgorithmType).map((algorithmType) =>
            runAlgorithm(
                graph,
                graphType,
                nodes,
                startNode,
                endNode,
                algorithmType,
                stepDifference,
            ),
        );
        stepsSlider.max = Math.max(
            ...newRunResults.map((result) => result.getAlgorithmSteps()),
        ).toString();

        return newRunResults;
    };

    // Set slider thumb color.
    setWeightColor();
    disableWeightSlider();
    resetStepsSlider();
    enableSpeedSlider();

    let { graph, nodes } = createGraph(ROWS, COLS, maxWeight, graphType);
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
        disableSpeedSlider();

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

        await displayAllRunResults(runResults, stepsSlider, stepsCount, stepDifference);

        enableGraphControls();
        enableWeightControls();
        enableStepsSlider();
        enableSpeedSlider();
    });

    newGraphButton.addEventListener('click', async () => {
        const { graph: newGraph, nodes: newNodes } = createGraph(ROWS, COLS, maxWeight, graphType);
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

    graphDropdown.addEventListener('change', async () => {
        graphType = graphDropdown.value as GraphType;
        if (graphType === GraphType.Unweighted) {
            graphType = GraphType.Unweighted;
            maxWeight = 0;
            setWeightColor();
            disableWeightSlider();
        } else {
            graphType = graphDropdown.value as GraphType;
            maxWeight = (Math.floor(parseInt(weightSlider.value)) / 100) * MAX_WEIGHT;
            setWeightColor();
            enableWeightSlider();
        }

        const { graph: newGraph, nodes: newNodes } = createGraph(ROWS, COLS, maxWeight, graphType);
        graph = newGraph;
        nodes = newNodes;
        runResults = getRunResults();

        if (graphType == GraphType.Directed) {
            startNode = parseInt(getNodeWithMaxWeight(nodes).id);
            endNode = parseInt(getNodeWithMinWeight(nodes).id);
            disableStartEndNodeButton();
        } else {
            enableStartEndNodeButton();
        }

        displayInitialNodeState(
            gridContainers,
            nodes,
            startNode,
            endNode,
            Object.values(AlgorithmType),
        );
        resetStepsSlider();
    });

    weightSlider.addEventListener('input', async () => {
        graphType = GraphType.Weighted;
        maxWeight = (Math.floor(parseInt(weightSlider.value)) / 100) * MAX_WEIGHT;
        setWeightColor();
        const { graph: newGraph, nodes: newNodes } = createGraph(ROWS, COLS, maxWeight, graphType);
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

        stepsCount.innerHTML = `Steps: ${Math.min(
            parseInt(stepsSlider.value),
            Math.max(...runResults.map((result) => result.getAlgorithmSteps())),
        ).toString()}`;
        runResults.forEach((runResult) => {
            displayStep(parseInt(stepsSlider.value), runResult);
        });

        if (stepsSlider.value === stepsSlider.max) {
            const maxSteps = Math.max(...runResults.map((result) => result.getTotalSteps()));
            runResults.forEach((runResult) => {
                if (runResult.getTotalSteps() === maxSteps) {
                    displayShortestPath(
                        gridContainers,
                        nodes,
                        startNode,
                        endNode,
                        runResult.getShortestPath(),
                        runResult.getAlgorithmType(),
                        stepDifference,
                    );
                }

                displayTotalWeight(runResult.getTotalWeights(), runResult.getAlgorithmType());
            });
        }
    });

    speedSlider.addEventListener('input', async () => {
        stepDifference = parseInt(speedSlider.value);
        runResults = getRunResults();
    });
});
