import { GRID_SIZE, MAX_WEIGHT } from '../src/common/constants';
import {
    AStarHeuristicType,
    AlgorithmType,
    GraphType,
    MazeType,
    NodeState,
    PrimaryGraphType,
    SecondaryGraphType,
} from '../src/common/types';
import { getGlobalVariablesManagerInstance } from '../src/utils/GlobalVariablesManager';
import { getColorByWeight } from '../src/utils/color';
import {
    resetGrid,
    displayAllRunResults,
    displayStep,
    displayShortestPath,
} from '../src/utils/display';
import {
    getAlgorithmDisplayName,
    getMaxWeight,
    getNodeIdFromCellElementId,
} from '../src/utils/general';
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
    const primaryGraphTypeDropdown = document.getElementById(
        'primaryGraphTypeDropdown',
    ) as HTMLSelectElement;
    const secondaryGraphTypeDropdown = document.getElementById(
        'secondaryGraphTypeDropdown',
    ) as HTMLSelectElement;
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
    const weightControls = document.getElementById('weightControls') as HTMLDivElement;
    const weightCheckbox = document.getElementById('weightCheckbox') as HTMLInputElement;
    const weightSwitch = document.getElementById('weightSwitch') as HTMLLabelElement;
    const weightSlider = document.getElementById('weightSlider') as HTMLInputElement;

    // Return early if an element is undefined.
    if (
        !aStarHeuristicTypeDropDown ||
        // !aStarHeuristicInfluenceDropdown ||
        !changeEndNodeButton ||
        !changeStartNodeButton ||
        !generateNewGraphButton ||
        !primaryGraphTypeDropdown ||
        !secondaryGraphTypeDropdown ||
        !gridContainers ||
        !legendCells ||
        !runButton ||
        !speedSlider ||
        !stepsCount ||
        !stepsSlider ||
        !weightControls ||
        !weightCheckbox ||
        !weightSwitch ||
        !weightSlider
    ) {
        return;
    }

    const globalVariablesManager = getGlobalVariablesManagerInstance();

    // Helper functions
    const setWeightColor = () => {
        const weightColor = getColorByWeight(MAX_WEIGHT * 0.9);
        document.documentElement.style.setProperty('--weight-color', weightColor);
    };

    const disableWeightSlider = () => {
        weightSlider.style.cursor = 'not-allowed';
        weightSlider.disabled = true;
    };

    const enableWeightSlider = () => {
        weightSlider.style.cursor = 'pointer';
        weightSlider.disabled = false;
    };

    const hideWeightSlider = () => {
        weightSlider.style.display = 'none';
    };

    const showWeightSlider = () => {
        weightSlider.style.display = 'block';
    };

    const hideWeightControls = () => {
        weightControls.style.display = 'none';
    };

    const showWeightControls = () => {
        weightControls.style.display = 'block';
    };

    const disableWeightControls = () => {
        weightCheckbox.disabled = true;
        weightSwitch.style.cursor = 'not-allowed';
        disableWeightSlider();
    };

    const enableWeightControls = () => {
        weightCheckbox.disabled = false;
        weightSwitch.style.cursor = 'pointer';
        enableWeightSlider();
    };

    const disableGraphControls = () => {
        runButton.disabled = true;
        generateNewGraphButton.disabled = true;
        changeStartNodeButton.disabled = true;
        changeEndNodeButton.disabled = true;
        primaryGraphTypeDropdown.disabled = true;
        secondaryGraphTypeDropdown.disabled = true;
        aStarHeuristicTypeDropDown.disabled = true;
    };

    const enableGraphControls = () => {
        runButton.disabled = false;
        generateNewGraphButton.disabled = false;
        changeStartNodeButton.disabled = false;
        changeEndNodeButton.disabled = false;
        primaryGraphTypeDropdown.disabled = false;
        secondaryGraphTypeDropdown.disabled = false;
        aStarHeuristicTypeDropDown.disabled = false;
    };

    const disableSecondaryGraphTypeDropdown = () => {
        secondaryGraphTypeDropdown.style.display = 'none';
        secondaryGraphTypeDropdown.style.cursor = 'default';
    };

    const enableSecondaryGraphTypeDropdown = () => {
        secondaryGraphTypeDropdown.style.display = 'block';
        secondaryGraphTypeDropdown.style.cursor = 'pointer';
    };

    const disableStepsSlider = () => {
        stepsSlider.style.cursor = 'not-allowed';
        stepsSlider.disabled = true;
    };

    const enableStepsSlider = () => {
        stepsSlider.style.cursor = 'pointer';
        stepsSlider.disabled = false;
    };

    const resetStepsSlider = () => {
        stepsSlider.value = '0';
        stepsCount.innerHTML = `Steps: 0`;
        enableStepsSlider();
    };

    const disableSpeedSlider = () => {
        speedSlider.style.cursor = 'not-allowed';
        speedSlider.disabled = true;
    };

    const enableSpeedSlider = () => {
        speedSlider.style.cursor = 'pointer';
        speedSlider.disabled = false;
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
    };

    const resetGridAndRerun = () => {
        getRunResults();
        resetGrid(gridContainers, Object.values(AlgorithmType));
        resetStepsSlider();
    };

    const setNewStartEndNode = (nodeState: NodeState) => {
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
                    (graphType === GraphType.Dfs ||
                        graphType === GraphType.RandomWalls ||
                        graphType === GraphType.RecursiveDivision) &&
                    !(globalVariablesManager.getGraph().nodes[i].weight === 1)
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

    const generateNewGraph = () => {
        if (globalVariablesManager.isExampleGraph()) {
            // Generating new start and end nodes for example graphs is not allowed.
            hideWeightControls();
            disableStartEndNodeButton();
            const exampleGraph = getExampleGraph(globalVariablesManager.getGraphType());
            if (exampleGraph) {
                const {
                    graph: newGraph,
                    nodes: newNodes,
                    startNode: newStartNode,
                    endNode: newEndNode,
                } = exampleGraph;
                globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
                globalVariablesManager.setStartNode(newStartNode);
                globalVariablesManager.setEndNode(newEndNode);
                // Weight controls are disabled for example graphs.

                return;
            }
        }

        showWeightControls();
        enableStartEndNodeButton();
        const { graph: newGraph, nodes: newNodes } = recreateGridGraph();
        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
    };

    const generateNewGraphWithReachableEndNode = () => {
        do {
            generateNewGraph();
            resetGridAndRerun();
        } while (!globalVariablesManager.getEndNodeReachable());
    };

    const setSecondaryGraphDropdown = (primaryGraphType: PrimaryGraphType) => {
        // Reset dropdown
        secondaryGraphTypeDropdown.options.length = 0;

        switch (primaryGraphType) {
            case PrimaryGraphType.Standard:
                disableSecondaryGraphTypeDropdown();
                break;
            case PrimaryGraphType.Maze:
                enableSecondaryGraphTypeDropdown();
                Object.values(MazeType).forEach((option) => {
                    secondaryGraphTypeDropdown.appendChild(createOptionElement(option.toString()));
                });
                break;

            case PrimaryGraphType.Ideal:
                enableSecondaryGraphTypeDropdown();
                Object.values(AlgorithmType).forEach((option) => {
                    secondaryGraphTypeDropdown.appendChild(
                        createOptionElement(getAlgorithmDisplayName(option).toString()),
                    );
                });
                break;

            default:
                break;
        }
    };

    const createOptionElement = (option: string): HTMLOptionElement => {
        let optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        return optionElement;
    };

    // Setup of controls and sliders on initial page load.
    hideWeightSlider();
    resetStepsSlider();
    enableStepsSlider();
    enableSpeedSlider();
    enableGraphControls();
    disableWeightSlider(); // Weight slider disabled for the default unweighted graph type.
    disableSecondaryGraphTypeDropdown(); // Secondary graph type dropdown disabled for default standard graph type.

    // Generate graph and run results.
    resetGridAndRerun();

    // Event listeners
    runButton.addEventListener('click', async () => {
        // These controls are disabled when the simulations are running.
        disableGraphControls();
        disableWeightControls();
        disableStepsSlider();
        disableSpeedSlider();

        // Reset grid for subsequent renders.
        if (!globalVariablesManager.isFirstRender()) {
            resetGridAndRerun();
        }

        globalVariablesManager.setFirstRender(false);

        // Displaying simulation.
        await displayAllRunResults(stepsSlider, stepsCount);

        // Enable controls once simulations are completed.
        enableGraphControls();
        enableWeightControls();
        enableStepsSlider();
        enableSpeedSlider();

        // Generating new start and end nodes for example graphs is not allowed.
        if (globalVariablesManager.isExampleGraph()) {
            disableStartEndNodeButton();
        } else {
            enableStartEndNodeButton();
        }
    });

    generateNewGraphButton.addEventListener('click', async () => {
        generateNewGraphWithReachableEndNode();
    });

    changeStartNodeButton.addEventListener('click', () => {
        resetGrid(gridContainers, Object.values(AlgorithmType));
        setNewStartEndNode(NodeState.StartNode);
    });

    changeEndNodeButton.addEventListener('click', async () => {
        resetGrid(gridContainers, Object.values(AlgorithmType));
        setNewStartEndNode(NodeState.EndNode);
    });

    primaryGraphTypeDropdown.addEventListener('change', async () => {
        const primaryGraphType = primaryGraphTypeDropdown.value as PrimaryGraphType;
        const weighted = weightCheckbox.checked;
        let graphType = GraphType.Standard;

        switch (primaryGraphType) {
            case PrimaryGraphType.Standard:
                if (weighted) {
                    globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));
                } else {
                    globalVariablesManager.setMaxWeight(0);
                }
                break;
            case PrimaryGraphType.Maze:
                graphType = GraphType.RecursiveDivision;
                if (weighted) {
                    globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));
                } else {
                    globalVariablesManager.setMaxWeight(MAX_WEIGHT);
                }
                break;
            case PrimaryGraphType.Ideal:
                graphType = GraphType.IdealBfs;
                break;
            default:
                break;
        }

        globalVariablesManager.setGraphType(graphType);
        setSecondaryGraphDropdown(primaryGraphType);

        // We hide the weight slider for Maze graphs.
        if (globalVariablesManager.isMazeGraph()) {
            hideWeightSlider();
            setWeightColor();
        }

        generateNewGraphWithReachableEndNode();
    });

    secondaryGraphTypeDropdown.addEventListener('change', async () => {
        const secondaryGraphType = secondaryGraphTypeDropdown.value as SecondaryGraphType;
        let newGraphType: GraphType = GraphType.Standard;
        switch (secondaryGraphType) {
            case MazeType.Dfs:
                newGraphType = GraphType.Dfs;
                break;
            case MazeType.RandomWalls:
                newGraphType = GraphType.RandomWalls;
                break;
            case MazeType.RecrusiveDivision:
                newGraphType = GraphType.RecursiveDivision;
                break;
            case AlgorithmType.AStar:
                newGraphType = GraphType.IdealAStar;
                break;
            case AlgorithmType.BellmanFord:
                newGraphType = GraphType.IdealBellmanFord;
                break;
            case AlgorithmType.Djikstra:
                newGraphType = GraphType.IdealDjikstra;
                break;
            case AlgorithmType.Bfs:
                newGraphType = GraphType.IdealBfs;
                break;
            default:
                break;
        }

        globalVariablesManager.setGraphType(newGraphType);
        generateNewGraphWithReachableEndNode();
    });

    weightCheckbox.addEventListener('change', () => {
        if (weightCheckbox.checked) {
            enableWeightSlider();
            // We don't show the weight slider for maze graphs.
            if (!globalVariablesManager.isMazeGraph()) {
                showWeightSlider();
                setWeightColor();
            }
            globalVariablesManager.setIsWeighted(true);
            globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));
        } else {
            disableWeightSlider();
            hideWeightSlider();
            globalVariablesManager.setIsWeighted(false);
            globalVariablesManager.setMaxWeight(0);
        }

        generateNewGraphWithReachableEndNode();
    });

    weightSlider.addEventListener('input', async () => {
        globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));
        generateNewGraphWithReachableEndNode();
    });

    stepsSlider.addEventListener('input', async () => {
        resetGrid(gridContainers, Object.values(AlgorithmType));
        stepsCount.innerHTML = `Steps: ${parseInt(stepsSlider.value).toString()}`;

        const runResults = globalVariablesManager.getRunResults();

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
});
