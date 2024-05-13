import {
    AStarHeuristicInfluence,
    AStarHeuristicType,
    AlgorithmType,
    GraphType,
} from '../src/common/types';
import { getGlobalVariablesManagerInstance } from '../src/globals/GlobalVariablesManager';
import { getColorByWeight } from '../src/utils/color';
import {
    displayEmptyGrid,
    displayAllRunResults,
    displayStep,
    displayTotalWeight,
    displayShortestPath,
} from '../src/utils/display';
import { getMaxWeight } from '../src/utils/general';
import { recreateGridGraph } from '../src/utils/graph';
import { runAlgorithm } from '../src/utils/run';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    // Load HTML elements
    const aStarHeuristicTypeDropDown = document.getElementById(
        'aStarHeuristicTypeDropdown',
    ) as HTMLInputElement;
    const aStarHeuristicInfluenceDropdown = document.getElementById(
        'aStarHeuristicInfluenceDropdown',
    ) as HTMLInputElement;
    const changeEndNodeButton = document.getElementById('changeEnd') as HTMLButtonElement;
    const changeStartNodeButton = document.getElementById('changeStart') as HTMLButtonElement;
    const generateNewGraphButton = document.getElementById('newGraph') as HTMLButtonElement;
    const graphTypeDropdown = document.getElementById('graphDropdown') as HTMLInputElement;
    const gridContainers = document.getElementsByClassName(
        'grid',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const legendCells = document.getElementsByClassName(
        'legend-cell',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const runButton = document.getElementById('runAlgorithms') as HTMLButtonElement;
    const speedSlider = document.getElementById('speedSlider') as HTMLInputElement;
    const stepsCount = document.getElementById('stepCount') as HTMLParagraphElement;
    const stepsSlider = document.getElementById('stepSlider') as HTMLInputElement;
    const weightSlider = document.getElementById('weightSlider') as HTMLInputElement;

    // Return early if an element is undefined.
    if (
        !aStarHeuristicTypeDropDown ||
        !aStarHeuristicInfluenceDropdown ||
        !changeEndNodeButton ||
        !changeStartNodeButton ||
        !generateNewGraphButton ||
        !graphTypeDropdown ||
        !gridContainers ||
        !legendCells ||
        !runButton ||
        !speedSlider ||
        !stepsCount ||
        !stepsSlider ||
        !weightSlider
    ) {
        return;
    }

    const globalVariablesManager = getGlobalVariablesManagerInstance();

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

    const setWeightColor = () => {
        const weightColor = getColorByWeight(globalVariablesManager.getMaxWeight());
        document.documentElement.style.setProperty('--slider-thumb-bg', weightColor);
        document.documentElement.style.setProperty('--weight-switch-bg', weightColor);
    };

    const disableGraphControls = () => {
        runButton.disabled = true;
        generateNewGraphButton.disabled = true;
        changeStartNodeButton.disabled = true;
        changeEndNodeButton.disabled = true;
        graphTypeDropdown.disabled = true;
        aStarHeuristicTypeDropDown.disabled = true;
        aStarHeuristicInfluenceDropdown.disabled = true;
    };

    const enableGraphControls = () => {
        runButton.disabled = false;
        generateNewGraphButton.disabled = false;
        changeStartNodeButton.disabled = false;
        changeEndNodeButton.disabled = false;
        graphTypeDropdown.disabled = false;
        aStarHeuristicTypeDropDown.disabled = false;
        aStarHeuristicInfluenceDropdown.disabled = false;
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
        changeStartNodeButton.disabled = true;
        changeEndNodeButton.disabled = true;
    };

    const enableStartEndNodeButton = () => {
        changeStartNodeButton.disabled = false;
        changeEndNodeButton.disabled = false;
    };

    const getRunResults = () => {
        // Obtain run results for all algorithms.
        const newRunResults = Object.values(AlgorithmType).map((algorithmType) =>
            runAlgorithm(algorithmType),
        );

        // Set the slider's max value to be the maximum steps from all algorithms executed.
        stepsSlider.max = Math.max(
            ...newRunResults.map((result) => result.getAlgorithmSteps()),
        ).toString();
        return newRunResults;
    };

    const resetGridAndRerun = () => {
        runResults = getRunResults();
        displayEmptyGrid(gridContainers, Object.values(AlgorithmType));
        resetStepsSlider();
    };

    // Setup of controls and sliders on initial page load.
    setWeightColor();
    resetStepsSlider();
    enableStepsSlider();
    enableSpeedSlider();
    enableGraphControls();
    disableWeightSlider(); // Weight slider disable for the default unweighted graph type.

    // Generate graph and results from algorithms.
    let runResults = getRunResults();

    // Display graph.
    displayEmptyGrid(gridContainers, Object.values(AlgorithmType));
    // Event listeners
    runButton.addEventListener('click', async () => {
        disableGraphControls();
        disableWeightSlider();
        disableStepsSlider();
        disableSpeedSlider();

        // Reset grid for subsequent renders.
        if (!globalVariablesManager.isFirstRender()) {
            runResults = getRunResults();
            displayEmptyGrid(gridContainers, Object.values(AlgorithmType));
            resetStepsSlider();
        }

        globalVariablesManager.setFirstRender(false);

        // Displaying simulation.
        await displayAllRunResults(runResults, stepsSlider, stepsCount);

        enableGraphControls();
        enableWeightSlider();
        enableStepsSlider();
        enableSpeedSlider();
    });

    generateNewGraphButton.addEventListener('click', async () => {
        const { graph: newGraph, nodes: newNodes } = recreateGridGraph();
        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
        resetGridAndRerun();
    });

    changeStartNodeButton.addEventListener('click', () => {
        console.log(globalVariablesManager.getStartNode());
        globalVariablesManager.generateNewStartNode();
        console.log(globalVariablesManager.getStartNode());
        resetGridAndRerun();
    });

    changeEndNodeButton.addEventListener('click', async () => {
        globalVariablesManager.generateNewEndNode();
        resetGridAndRerun();
    });

    graphTypeDropdown.addEventListener('change', async () => {
        const graphType = graphTypeDropdown.value as GraphType;
        globalVariablesManager.setGraphType(graphType);
        if (graphType === GraphType.Unweighted) {
            globalVariablesManager.setMaxWeight(0);
            disableWeightSlider();
        } else {
            globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));
            enableWeightSlider();
        }

        setWeightColor();

        const { graph: newGraph, nodes: newNodes } = recreateGridGraph();
        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });

        resetGridAndRerun();
    });

    weightSlider.addEventListener('input', async () => {
        globalVariablesManager.setGraphType(GraphType.Weighted);
        globalVariablesManager.setMaxWeight(parseInt(weightSlider.value));
        setWeightColor();

        const { graph: newGraph, nodes: newNodes } = recreateGridGraph();

        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });

        resetGridAndRerun();
    });

    stepsSlider.addEventListener('input', async () => {
        displayEmptyGrid(gridContainers, Object.values(AlgorithmType));
        stepsCount.innerHTML = `Steps: ${parseInt(stepsSlider.value).toString()}`;

        // Display the current step.
        runResults.forEach((runResult) => {
            displayStep(parseInt(stepsSlider.value), runResult);
        });

        // When slider reaches the maximum value (extreme right).
        if (stepsSlider.value === stepsSlider.max) {
            const maxStepsOfAllAlgorithms = Math.max(
                ...runResults.map((result) => result.getTotalSteps()),
            );
            runResults.forEach((runResult) => {
                // Show the shortest path for the slowest algorithm.
                // Shortest paths for other algorithms are displayed as part of the run results.
                if (runResult.getTotalSteps() === maxStepsOfAllAlgorithms) {
                    displayShortestPath(
                        gridContainers,
                        runResult.getShortestPath(),
                        runResult.getAlgorithmType(),
                    );
                }

                displayTotalWeight(runResult.getTotalWeight(), runResult.getAlgorithmType());
            });
        }
    });

    speedSlider.addEventListener('input', async () => {
        globalVariablesManager.setStepIncrement(parseInt(speedSlider.value));
        resetGridAndRerun();
    });

    aStarHeuristicTypeDropDown.addEventListener('change', async () => {
        const aStarHeuristicType = aStarHeuristicTypeDropDown.value as AStarHeuristicType;
        globalVariablesManager.setAStarHeuristicType(aStarHeuristicType);

        resetGridAndRerun();
    });

    aStarHeuristicInfluenceDropdown.addEventListener('change', async () => {
        const aStarHeuristicInfluence =
            aStarHeuristicInfluenceDropdown.value as AStarHeuristicInfluence;
        globalVariablesManager.setAStartHeuristicInfluence(aStarHeuristicInfluence);

        resetGridAndRerun();
    });
});
