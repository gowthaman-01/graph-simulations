import {
    DEBOUNCE_DELAY,
    MAX_WEIGHT,
    AVERAGE_SPEED,
    SLOW_SPEED,
    FAST_SPEED,
    TOTAL_TUTORIAL_PAGES,
} from '../src/common/constants';
import {
    AStarHeuristicType,
    AlgorithmType,
    GraphType,
    MazeType,
    NodeState,
    PrimaryGraphType,
    SecondaryGraphType,
    SimulationSpeed,
} from '../src/common/types';
import { getGlobalVariablesManagerInstance } from '../src/utils/GlobalVariablesManager';
import { getColorByWeight } from '../src/utils/color';
import {
    displayAllRunResults,
    displayStep,
    displayShortestPath,
    resetGrid,
    resetStatisticTable,
} from '../src/utils/display';
import {
    debounce,
    getAlgorithmDisplayName,
    getMaxWeight,
    getNodeIdFromCellElementId,
} from '../src/utils/general';
import { getExampleGraph, recreateGraph } from '../src/utils/graph';
import { createMark } from '../src/utils/mark';
import { runAlgorithm } from '../src/utils/run';
import { renderTutorialContent } from '../src/tutorial/tutorial';
import { tutorialDataList } from '../src/tutorial/data';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    // Load HTML elements
    const mainBodyDiv = document.getElementById('mainBody') as HTMLDivElement;
    const tutorialContainerDiv = document.getElementById('tutorialContainer') as HTMLDivElement;
    const tutorialContentDiv = document.getElementById('tutorialContent') as HTMLDivElement;
    const tutorialSkipButton = document.getElementById('tutorialSkipButton') as HTMLButtonElement;
    const tutorialNextButton = document.getElementById('tutorialNextButton') as HTMLButtonElement;
    const tutorialPreviousButton = document.getElementById(
        'tutorialPreviousButton',
    ) as HTMLButtonElement;
    const tutorialFinishButton = document.getElementById(
        'tutorialFinishButton',
    ) as HTMLButtonElement;
    const pageNumber = document.getElementById('pageNumber') as HTMLParagraphElement;
    const viewTutorialButton = document.getElementById('viewTutorialButton') as HTMLButtonElement;
    const settingsModalDiv = document.getElementById('settingsModal') as HTMLDivElement;
    const viewSettingsButton = document.getElementById('viewSettingsButton') as HTMLButtonElement;
    const closeSettingsButton = document.getElementById('closeSettingsButton') as HTMLDivElement;
    const aStarHeuristicTypeDropDown = document.getElementById(
        'aStarHeuristicTypeDropdown',
    ) as HTMLInputElement;
    const gridSizeSlider = document.getElementById('gridSizeSlider') as HTMLInputElement;

    const leftGraphDropdown = document.getElementById('leftGraphDropdown') as HTMLSelectElement;
    const rightGraphDropdown = document.getElementById('rightGraphDropdown') as HTMLSelectElement;
    const changeEndNodeButton = document.getElementById('changeEnd') as HTMLButtonElement;
    const changeStartNodeButton = document.getElementById('changeStart') as HTMLButtonElement;
    const generateNewGraphButton = document.getElementById('newGraph') as HTMLButtonElement;
    const primaryGraphTypeDropdown = document.getElementById(
        'primaryGraphTypeDropdown',
    ) as HTMLSelectElement;
    const secondaryGraphTypeDropdown = document.getElementById(
        'secondaryGraphTypeDropdown',
    ) as HTMLSelectElement;
    const leftGraphDiv = document.getElementById('leftGraph') as HTMLDivElement;
    const rightGraphDiv = document.getElementById('rightGraph') as HTMLDivElement;
    const runButton = document.getElementById('runAlgorithms') as HTMLButtonElement;
    const stepsCount = document.getElementById('stepCount') as HTMLParagraphElement;
    const stepsSlider = document.getElementById('stepSlider') as HTMLInputElement;
    const weightControls = document.getElementById('weightControls') as HTMLDivElement;
    const weightCheckbox = document.getElementById('weightCheckbox') as HTMLInputElement;
    const weightSwitch = document.getElementById('weightSwitch') as HTMLLabelElement;
    const weightSlider = document.getElementById('weightSlider') as HTMLInputElement;
    const speedDropdown = document.getElementById('speedDropdown') as HTMLSelectElement;
    const showWeightCheckbox = document.getElementById('showWeightCheckbox') as HTMLInputElement;

    // Return early if an element is undefined.
    if (
        !mainBodyDiv ||
        !tutorialContainerDiv ||
        !tutorialContentDiv ||
        !tutorialSkipButton ||
        !tutorialNextButton ||
        !tutorialPreviousButton ||
        !tutorialFinishButton ||
        !viewTutorialButton ||
        !pageNumber ||
        !settingsModalDiv ||
        !viewSettingsButton ||
        !closeSettingsButton ||
        !aStarHeuristicTypeDropDown ||
        !gridSizeSlider ||
        !leftGraphDropdown ||
        !rightGraphDropdown ||
        !changeEndNodeButton ||
        !changeStartNodeButton ||
        !generateNewGraphButton ||
        !primaryGraphTypeDropdown ||
        !secondaryGraphTypeDropdown ||
        !leftGraphDiv ||
        !rightGraphDiv ||
        !runButton ||
        !stepsCount ||
        !stepsSlider ||
        !weightControls ||
        !weightCheckbox ||
        !weightSwitch ||
        !weightSlider ||
        !speedDropdown ||
        !showWeightCheckbox
    ) {
        return;
    }

    // Initialising the Global Variables Manager.
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    globalVariablesManager.setGraphDivs(
        {
            algorithmType: AlgorithmType.Bfs,
            graphDivElement: leftGraphDiv,
            position: 'left',
        },
        {
            algorithmType: AlgorithmType.BellmanFord,
            graphDivElement: rightGraphDiv,
            position: 'right',
        },
    );

    // Helper functions for control elements.
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

    const disableGridSizeSlider = () => {
        gridSizeSlider.style.cursor = 'not-allowed';
        gridSizeSlider.disabled = true;
    };

    const enableGridSizeSlider = () => {
        gridSizeSlider.style.cursor = 'pointer';
        gridSizeSlider.disabled = false;
    };

    const hideWeightSlider = () => {
        weightSlider.style.display = 'none';
    };

    const showWeightSlider = () => {
        weightSlider.style.display = 'block';
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

    const hideWeightControls = () => {
        weightControls.style.display = 'none';
    };

    const showWeightControls = () => {
        weightControls.style.display = 'block';
    };

    const disableGraphControls = () => {
        leftGraphDropdown.disabled = true;
        rightGraphDropdown.disabled = true;
        generateNewGraphButton.disabled = true;
        changeStartNodeButton.disabled = true;
        changeEndNodeButton.disabled = true;
        primaryGraphTypeDropdown.disabled = true;
        secondaryGraphTypeDropdown.disabled = true;
        aStarHeuristicTypeDropDown.disabled = true;
    };

    const enableGraphControls = () => {
        leftGraphDropdown.disabled = false;
        rightGraphDropdown.disabled = false;
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

    const disableSpeedControls = () => {
        speedDropdown.disabled = true;
    };

    const enableSpeedControls = () => {
        speedDropdown.disabled = false;
    };

    const toggleStartEndNodeButton = (button: 'start' | 'end' | 'both', enable: boolean) => {
        const isDisabled = !enable;

        switch (button) {
            case 'start':
                changeStartNodeButton.disabled = isDisabled;
                break;
            case 'end':
                changeEndNodeButton.disabled = isDisabled;
                break;
            case 'both':
                changeStartNodeButton.disabled = isDisabled;
                changeEndNodeButton.disabled = isDisabled;
                break;
        }
    };

    // Other helper functions
    const toggleTutorialButton = (buttonType: 'P' | 'N' | 'F', show: boolean) => {
        let button = tutorialPreviousButton;
        switch (buttonType) {
            case 'N':
                button = tutorialNextButton;
                break;
            case 'F':
                button = tutorialFinishButton;
            default:
                break;
        }

        button.style.display = show ? 'inline' : 'none';
    };

    const updateTutorialButtonsAndPageNumber = () => {
        const currentPageNumber = globalVariablesManager.getTutorialPageNumber();

        // Update visibility of tutorial buttons.
        if (currentPageNumber === 1) {
            toggleTutorialButton('P', false);
            toggleTutorialButton('N', true);
            toggleTutorialButton('F', false);
        } else if (currentPageNumber === tutorialDataList.length) {
            toggleTutorialButton('P', true);
            toggleTutorialButton('N', false);
            toggleTutorialButton('F', true);
        } else {
            toggleTutorialButton('P', true);
            toggleTutorialButton('N', true);
            toggleTutorialButton('F', false);
        }

        // Update the page number.
        pageNumber.innerHTML = `${currentPageNumber}/${TOTAL_TUTORIAL_PAGES}`;
    };

    const handleTutorialOpen = () => {
        // Blur background.
        mainBodyDiv.classList.add('main-body-blur');

        // Reset tutorialPageNumber to 1.
        const currentPageNumber = globalVariablesManager.resetTutorialPageNumber();

        // Close Settings modal.
        settingsModalDiv.style.display = 'none';

        // Show Tutorial modal.
        tutorialContainerDiv.style.display = 'flex';
        renderTutorialContent(currentPageNumber, tutorialContentDiv);

        updateTutorialButtonsAndPageNumber();
    };

    const handleTutorialClose = () => {
        tutorialContainerDiv.style.display = 'none';
        mainBodyDiv.classList.remove('main-body-blur');
    };

    const handleSettingsOpen = () => {
        // Blur backgroun.d
        mainBodyDiv.classList.add('main-body-blur');

        // Show Settings modal.
        settingsModalDiv.style.display = 'flex';
    };

    const handleSettingsClose = () => {
        settingsModalDiv.style.display = 'none';
        mainBodyDiv.classList.remove('main-body-blur');
    };

    const getRunResults = () => {
        // Obtain run results for all algorithms.
        const newRunResults = globalVariablesManager
            .getGraphDivs()
            .map((graphDiv) => runAlgorithm(graphDiv));

        // Set the slider's max value to the maximum steps from all algorithms executed.
        stepsSlider.max = Math.max(
            ...newRunResults.map((result) => result.getAlgorithmSteps()),
        ).toString();
        globalVariablesManager.setRunResults(newRunResults);
    };

    const resetGridAndRerun = () => {
        getRunResults();
        resetGrid();
        resetStatisticTable();
        resetStepsSlider();
    };

    const setNewStartEndNode = (nodeState: NodeState) => {
        if (globalVariablesManager.getIsChangingStartEndNode()) {
            globalVariablesManager.setIsChangingStartEndNode(false);
            resetGrid();
            toggleStartEndNodeButton(nodeState === NodeState.StartNode ? 'end' : 'start', true);
            return;
        }

        // Disable the other button.
        toggleStartEndNodeButton(nodeState === NodeState.StartNode ? 'end' : 'start', false);
        globalVariablesManager.setIsChangingStartEndNode(true);

        for (const graphDiv of globalVariablesManager.getGraphDivs()) {
            for (let i = 0; i < globalVariablesManager.getGridSize(); i++) {
                // When the user clicks the 'Change Start Node' button, all cells will
                // temporarily show the startNode image except the endNode and vice versa.
                if (
                    (nodeState === NodeState.StartNode &&
                        i === globalVariablesManager.getEndNode()) ||
                    (nodeState === NodeState.EndNode && i === globalVariablesManager.getStartNode())
                ) {
                    continue;
                }

                // If graph is a maze, only path cells will be highlighted.
                if (
                    globalVariablesManager.isMazeGraph() &&
                    !(globalVariablesManager.getGraph().nodes[i] === 1)
                ) {
                    continue;
                }

                const cell = document.getElementById(`${graphDiv.position}-cell-${i}`);
                if (!cell) return;

                cell.innerHTML = '';

                // Set mark based on state of the node.
                const mark = createMark(i, nodeState, graphDiv.position);

                // The mark will have lower opacity so that its easier for user to choose their preferred Start / End node.
                mark.style.opacity = `0.2`;
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
                    toggleStartEndNodeButton(
                        nodeState === NodeState.StartNode ? 'end' : 'start',
                        true,
                    );
                });
            }
        }
    };

    const generateNewGraph = () => {
        if (globalVariablesManager.isExampleGraph()) {
            // Weight controls are disabled for example graphs.
            hideWeightControls();
            // Generating new start and end nodes for example graphs is not allowed.
            toggleStartEndNodeButton('both', false);

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
                return;
            }
        }

        // Other graph types.
        showWeightControls();
        toggleStartEndNodeButton('both', true);

        // Weight slider is not shown for maze graphs.
        if (globalVariablesManager.getIsWeighted() && !globalVariablesManager.isMazeGraph()) {
            enableWeightSlider();
            showWeightSlider();
        } else {
            disableWeightSlider();
            hideWeightSlider();
        }

        const { graph: newGraph, nodes: newNodes } = recreateGraph();
        globalVariablesManager.setGraph({ nodes: newNodes, graph: newGraph });
    };

    const generateNewGraphWithReachableEndNode = () => {
        // Continuously generates new graphs until one is found where the end node is reachable from the start node.
        do {
            generateNewGraph();
            resetGridAndRerun();
        } while (!globalVariablesManager.isEndNodeReachable());
    };

    const setSecondaryGraphDropdown = (primaryGraphType: PrimaryGraphType) => {
        // Reset secondary graph type dropdown.
        secondaryGraphTypeDropdown.options.length = 0;

        switch (primaryGraphType) {
            case PrimaryGraphType.Standard:
                // Standard graphs have no secondary graph types.
                disableSecondaryGraphTypeDropdown();
                break;
            case PrimaryGraphType.Maze:
                enableSecondaryGraphTypeDropdown();
                Object.values(MazeType).forEach((mazeGenerationMethod) => {
                    let optionElement = document.createElement('option');
                    optionElement.value = mazeGenerationMethod;
                    optionElement.textContent = mazeGenerationMethod;
                    secondaryGraphTypeDropdown.appendChild(optionElement);
                });
                break;
            case PrimaryGraphType.Ideal:
                enableSecondaryGraphTypeDropdown();
                Object.values(AlgorithmType).forEach((algorithmType) => {
                    let optionElement = document.createElement('option');
                    optionElement.value = algorithmType;
                    optionElement.textContent = getAlgorithmDisplayName(algorithmType);
                    secondaryGraphTypeDropdown.appendChild(optionElement);
                });
                break;
            default:
                break;
        }
    };

    // Render tutorial upon page load.
    renderTutorialContent(globalVariablesManager.getTutorialPageNumber(), tutorialContentDiv);

    // Setup of controls on initial page load.
    setWeightColor();
    resetStepsSlider();
    enableStepsSlider();
    enableSpeedControls();
    enableGraphControls();
    // Secondary graph type dropdown disabled for default standard graph type.
    disableSecondaryGraphTypeDropdown();
    //There is no previous button on the first page of the tutorial.
    toggleTutorialButton('P', false);

    // Generate the graphs and run results.
    resetGridAndRerun();

    // Event listeners for control elements.
    runButton.addEventListener('click', async () => {
        if (globalVariablesManager.getIsSimulationRunning()) {
            globalVariablesManager.stopSimulation();
            runButton.innerHTML = 'Run';
        } else {
            globalVariablesManager.setIsSimulationRunning();
            runButton.innerHTML = 'Stop';

            // These control elements are disabled when the simulation is running.
            disableGraphControls();
            disableWeightControls();
            disableStepsSlider();
            disableSpeedControls();
            disableGridSizeSlider();

            // Reset grid before running the simulation on subsequent renders.
            if (stepsSlider.value === stepsSlider.max) {
                resetGridAndRerun();
            }

            // Display simulation.
            await displayAllRunResults(stepsSlider, stepsCount);

            // Enable control elements once simulations are completed.
            enableGraphControls();
            enableWeightControls();
            enableStepsSlider();
            enableSpeedControls();
            enableGridSizeSlider();

            // Generating new start and end nodes for example graphs is not allowed.
            if (globalVariablesManager.isExampleGraph()) {
                toggleStartEndNodeButton('both', false);
            } else {
                toggleStartEndNodeButton('both', true);
            }

            globalVariablesManager.stopSimulation();
            runButton.innerHTML = 'Run';
        }
    });

    tutorialSkipButton.addEventListener('click', handleTutorialClose);

    tutorialFinishButton.addEventListener('click', handleTutorialClose);

    viewTutorialButton.addEventListener('click', handleTutorialOpen);

    tutorialNextButton.addEventListener('click', () => {
        const currentPageNumber = globalVariablesManager.incrementTutorialPageNumber();
        renderTutorialContent(currentPageNumber, tutorialContentDiv);
        updateTutorialButtonsAndPageNumber();
    });

    tutorialPreviousButton.addEventListener('click', () => {
        const currentPageNumber = globalVariablesManager.decrementTutorialPageNumber();
        renderTutorialContent(currentPageNumber, tutorialContentDiv);
        updateTutorialButtonsAndPageNumber();
    });

    viewSettingsButton.addEventListener('click', handleSettingsOpen);

    closeSettingsButton.addEventListener('click', handleSettingsClose);

    leftGraphDropdown.addEventListener('change', () => {
        globalVariablesManager.setGraphDiv('left', leftGraphDropdown.value as AlgorithmType);
        resetGridAndRerun();
    });

    rightGraphDropdown.addEventListener('change', () => {
        globalVariablesManager.setGraphDiv('right', rightGraphDropdown.value as AlgorithmType);
        resetGridAndRerun();
    });

    generateNewGraphButton.addEventListener('click', () => {
        generateNewGraphWithReachableEndNode();
    });

    changeStartNodeButton.addEventListener('click', () => {
        setNewStartEndNode(NodeState.StartNode);
    });

    changeEndNodeButton.addEventListener('click', () => {
        setNewStartEndNode(NodeState.EndNode);
    });

    primaryGraphTypeDropdown.addEventListener('change', () => {
        const primaryGraphType = primaryGraphTypeDropdown.value as PrimaryGraphType;
        const weighted = weightCheckbox.checked;
        const newMaxWeight = weighted ? getMaxWeight(weightSlider.value) : 0;
        globalVariablesManager.setMaxWeight(newMaxWeight);

        let graphType = GraphType.Standard;

        switch (primaryGraphType) {
            case PrimaryGraphType.Maze:
                graphType = GraphType.RecursiveDivision;
                break;
            case PrimaryGraphType.Ideal:
                graphType = GraphType.IdealBfs;
                break;
            default:
                break;
        }

        globalVariablesManager.setGraphType(graphType);
        setSecondaryGraphDropdown(primaryGraphType);
        generateNewGraphWithReachableEndNode();
    });

    secondaryGraphTypeDropdown.addEventListener('change', () => {
        const secondaryGraphType = secondaryGraphTypeDropdown.value as SecondaryGraphType;
        let newGraphType: GraphType = GraphType.Standard;

        switch (secondaryGraphType) {
            case MazeType.Dfs:
                newGraphType = GraphType.Dfs;
                break;
            case MazeType.RandomWalls:
                newGraphType = GraphType.RandomWalls;
                break;
            case MazeType.RecursiveDivision:
                newGraphType = GraphType.RecursiveDivision;
                break;
            case AlgorithmType.AStar:
                newGraphType = GraphType.IdealAStar;
                break;
            case AlgorithmType.BellmanFord:
                newGraphType = GraphType.IdealBellmanFord;
                break;
            case AlgorithmType.Dijkstra:
                newGraphType = GraphType.IdealDijkstra;
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
        const isWeighted = weightCheckbox.checked;
        globalVariablesManager.setIsWeighted(isWeighted);
        globalVariablesManager.setMaxWeight(isWeighted ? getMaxWeight(weightSlider.value) : 0);
        generateNewGraphWithReachableEndNode();
    });

    weightSlider.addEventListener(
        'input',
        debounce(async () => {
            globalVariablesManager.setMaxWeight(getMaxWeight(weightSlider.value));
            generateNewGraphWithReachableEndNode();
        }, DEBOUNCE_DELAY),
    );

    gridSizeSlider.addEventListener(
        'input',
        debounce(async () => {
            const newGridSize = Math.pow(parseInt(gridSizeSlider.value), 2);
            globalVariablesManager.setGridSize(newGridSize);
            generateNewGraphWithReachableEndNode();
        }, DEBOUNCE_DELAY),
    );

    stepsSlider.addEventListener('input', () => {
        resetGrid();
        stepsCount.innerHTML = `Steps: ${stepsSlider.value}`;

        const runResults = globalVariablesManager.getRunResults();

        // Display the current step.
        runResults.forEach((runResult) => {
            displayStep(parseInt(stepsSlider.value), runResult);
        });

        // When slider reaches the maximum value.
        if (stepsSlider.value === stepsSlider.max) {
            const maxStepsOfAllAlgorithms = Math.max(
                ...runResults.map((result) => result.getLatestTotalSteps()),
            );
            runResults.forEach((runResult) => {
                const graphDiv = runResult.getGraphDiv();
                // Show the shortest path for the slowest algorithm.
                // Shortest paths for other algorithms are displayed as part of the run results.
                if (graphDiv && runResult.getLatestTotalSteps() === maxStepsOfAllAlgorithms) {
                    displayShortestPath(runResult.getShortestPath(), graphDiv);
                }
            });
        }
    });

    speedDropdown.addEventListener('change', () => {
        const simulationSpeed = speedDropdown.value as SimulationSpeed;
        globalVariablesManager.setSimulationSpeed(simulationSpeed);
        let speed = AVERAGE_SPEED;

        switch (simulationSpeed) {
            case SimulationSpeed.Fast:
                speed = FAST_SPEED;
                break;
            case SimulationSpeed.Slow:
                speed = SLOW_SPEED;
                break;
            default:
                speed = AVERAGE_SPEED;
                break;
        }

        globalVariablesManager.setStepIncrement(speed);
        resetGridAndRerun();
    });

    aStarHeuristicTypeDropDown.addEventListener('change', () => {
        const aStarHeuristicType = aStarHeuristicTypeDropDown.value as AStarHeuristicType;
        globalVariablesManager.setAStarHeuristicType(aStarHeuristicType);
        resetGridAndRerun();
    });

    showWeightCheckbox.addEventListener('change', () => {
        globalVariablesManager.setShowWeights(showWeightCheckbox.checked);
        resetGrid();
    });
});
