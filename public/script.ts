import { GRID_SIZE, MAX_WEIGHT } from '../src/common/constants';
import { AStarHeuristicType, AlgorithmType, GraphType, NodeState } from '../src/common/types';
import { getGlobalVariablesManagerInstance } from '../src/utils/GlobalVariablesManager';
import { getColorByWeight } from '../src/utils/color';
import {
    resetGrid,
    displayAllRunResults,
    displayStep,
    displayShortestPath,
} from '../src/utils/display';
import { getMaxWeight, getNodeIdFromCellElementId } from '../src/utils/general';
import { getExampleGraph, recreateGridGraph } from '../src/utils/graph';
import { setMarkImage, unmarkCell } from '../src/utils/mark';
import { runAlgorithm } from '../src/utils/run';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    // Load HTML elements
    const aStarHeuristicTypeDropDown = document.getElementById(
        'aStarHeuristicTypeDropdown',
    ) as HTMLInputElement;
    // const aStarHeuristicInfluenceDropdown = document.getElementById(
    //     'aStarHeuristicInfluenceDropdown',
    // ) as HTMLInputElement;
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
        // !aStarHeuristicInfluenceDropdown ||
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
        const weightColor = getColorByWeight(MAX_WEIGHT * 0.9);

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
        // aStarHeuristicInfluenceDropdown.disabled = true;
    };

    const enableGraphControls = () => {
        runButton.disabled = false;
        generateNewGraphButton.disabled = false;
        changeStartNodeButton.disabled = false;
        changeEndNodeButton.disabled = false;
        graphTypeDropdown.disabled = false;
        aStarHeuristicTypeDropDown.disabled = false;
        // aStarHeuristicInfluenceDropdown.disabled = false;
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

        globalVariablesManager.setRunResults(newRunResults);

        return newRunResults;
    };

    const resetGridAndRerun = () => {
        runResults = getRunResults();
        resetGrid(gridContainers, Object.values(AlgorithmType));
        resetStepsSlider();
    };

    const markCellsForUserInput = (nodeState: NodeState) => {
        for (const algorithmType of Object.values(AlgorithmType)) {
            for (let i = 0; i < GRID_SIZE; i++) {
                // When the user clicks the 'Change Start Node' button, all cells will
                // temporarily show the startNode image except the endNode and vice versa.
                if (
                    (nodeState === NodeState.StartNode &&
                        i === globalVariablesManager.getEndNode()) ||
                    (nodeState === NodeState.EndNode && i === globalVariablesManager.getStartNode())
                ) {
                    continue;
                }

                const graphType = globalVariablesManager.getGraphType();
                // If graph is a maze, only path cells will be highlighted.
                if (
                    (graphType === GraphType.MazeDfs ||
                        graphType === GraphType.MazeRandom ||
                        graphType === GraphType.MazeRecursiveDivision) &&
                    globalVariablesManager.getGraph().nodes[i].weight === MAX_WEIGHT
                ) {
                    continue;
                }

                const cell = document.getElementById(`${algorithmType}-cell-${i}`);
                if (!cell) return;

                unmarkCell(cell);

                // Set mark based on nodeState.
                const mark = document.createElement('img');
                mark.id = `${algorithmType}-cell-${i}-${nodeState}`;
                setMarkImage(mark, nodeState);

                // The mark will have lower opacity so that its easier for user to choose their preferred Start / End node.
                mark.style.opacity = `0.2`;

                mark.classList.add('mark');
                mark.classList.add('mark-hover');

                cell.appendChild(mark);

                // Once user clicks on the new node, the graph is reset with the new Start / End node.
                cell.addEventListener('mousedown', () => {
                    if (nodeState === NodeState.StartNode) {
                        globalVariablesManager.setStartNode(getNodeIdFromCellElementId(cell.id));
                    } else {
                        globalVariablesManager.setEndNode(getNodeIdFromCellElementId(cell.id));
                    }
                    resetGridAndRerun();
                });
            }
        }
    };

    // Setup of controls and sliders on initial page load.
    setWeightColor();
    resetStepsSlider();
    enableStepsSlider();
    enableSpeedSlider();
    enableGraphControls();
    disableWeightSlider(); // Weight slider disabled for the default unweighted graph type.

    // Generate graph and results from algorithms.
    let runResults = getRunResults();

    // Display graph.
    resetGrid(gridContainers, Object.values(AlgorithmType));

    // Event listeners
    runButton.addEventListener('click', async () => {
        disableGraphControls();
        disableWeightSlider();
        disableStepsSlider();
        disableSpeedSlider();

        // Reset grid for subsequent renders.
        if (!globalVariablesManager.isFirstRender()) {
            runResults = getRunResults();
            resetGrid(gridContainers, Object.values(AlgorithmType));
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
        const graphType = graphTypeDropdown.value as GraphType;
        const isExampleGraph =
            graphType === GraphType.AStarExample || graphType === GraphType.DjikstraExample;

        const { graph: newGraph, nodes: newNodes } = isExampleGraph
            ? getExampleGraph(graphType)
            : recreateGridGraph();
        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
        resetGridAndRerun();
    });

    changeStartNodeButton.addEventListener('click', () => {
        resetGrid(gridContainers, Object.values(AlgorithmType));
        markCellsForUserInput(NodeState.StartNode);
    });

    changeEndNodeButton.addEventListener('click', async () => {
        resetGrid(gridContainers, Object.values(AlgorithmType));
        markCellsForUserInput(NodeState.EndNode);
    });

    graphTypeDropdown.addEventListener('change', async () => {
        const graphType = graphTypeDropdown.value as GraphType;
        globalVariablesManager.setGraphType(graphType);

        const isExampleGraph =
            graphType === GraphType.AStarExample || graphType === GraphType.DjikstraExample;

        switch (graphType) {
            case GraphType.MazeDfs:
            case GraphType.MazeRandom:
            case GraphType.MazeRecursiveDivision:
                globalVariablesManager.setMaxWeight(MAX_WEIGHT);
                disableWeightSlider();
                break;
            case GraphType.Unweighted:
                globalVariablesManager.setMaxWeight(0);
                disableWeightSlider();
                break;
            case GraphType.AStarExample:
            case GraphType.DjikstraExample:
                break;
            case GraphType.Weighted:
                globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));
                enableWeightSlider();
        }

        setWeightColor();
        const { graph: newGraph, nodes: newNodes } = isExampleGraph
            ? getExampleGraph(graphType)
            : recreateGridGraph();

        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });

        resetGridAndRerun();
    });

    weightSlider.addEventListener('input', async () => {
        globalVariablesManager.setGraphType(GraphType.Weighted);
        globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));

        setWeightColor();

        const { graph: newGraph, nodes: newNodes } = recreateGridGraph();

        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });

        resetGridAndRerun();
    });

    stepsSlider.addEventListener('input', async () => {
        resetGrid(gridContainers, Object.values(AlgorithmType));
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

    // aStarHeuristicInfluenceDropdown.addEventListener('change', async () => {
    //     const aStarHeuristicInfluence =
    //         aStarHeuristicInfluenceDropdown.value as AStarHeuristicInfluence;
    //     globalVariablesManager.setAStartHeuristicInfluence(aStarHeuristicInfluence);

    //     resetGridAndRerun();
    // });
});
