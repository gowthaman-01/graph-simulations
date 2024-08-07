import {
    WEIGHT_DEBOUNCE_DELAY,
    GRID_SIZE,
    MAX_WEIGHT,
    AVERAGE_SPEED,
    SLOW_SPEED,
    FAST_SPEED,
} from '../src/common/constants';
import {
    AStarHeuristicType,
    AlgorithmType,
    GraphGroup,
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
    resetGridAndStatisticTable,
    displayAllRunResults,
    displayStep,
    displayShortestPath,
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
    const settingsContainerDiv = document.getElementById('settingsContainer') as HTMLDivElement;
    const viewSettingsButton = document.getElementById('viewSettingsButton') as HTMLButtonElement;
    const closeSettingsButton = document.getElementById('closeSettingsButton') as HTMLDivElement;
    const graphGroupDropdown = document.getElementById('graphGroupDropdown') as HTMLSelectElement;
    const graphGroupTwoGraphs = document.getElementById(
        'graphGroupTwoGraphs',
    ) as HTMLParagraphElement;
    const aStarHeuristicTypeDropDown = document.getElementById(
        'aStarHeuristicTypeDropdown',
    ) as HTMLInputElement;
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
    const runButton = document.getElementById('runAlgorithms') as HTMLButtonElement;
    const stepsCount = document.getElementById('stepCount') as HTMLParagraphElement;
    const stepsSlider = document.getElementById('stepSlider') as HTMLInputElement;
    const weightControls = document.getElementById('weightControls') as HTMLDivElement;
    const weightCheckbox = document.getElementById('weightCheckbox') as HTMLInputElement;
    const weightSwitch = document.getElementById('weightSwitch') as HTMLLabelElement;
    const weightSlider = document.getElementById('weightSlider') as HTMLInputElement;
    const speedDropdown = document.getElementById('speedDropdown') as HTMLSelectElement;
    const graphGroupOneDiv = document.getElementById('graphGroupOne') as HTMLDivElement;
    const groupOneGraphOneDiv = document.getElementById('groupOneGraphOne') as HTMLDivElement;
    const groupOneGraphTwoDiv = document.getElementById('groupOneGraphTwo') as HTMLDivElement;
    const graphGroupTwoDiv = document.getElementById('graphGroupTwo') as HTMLDivElement;
    const groupTwoGraphOneDiv = document.getElementById('groupTwoGraphOne') as HTMLDivElement;
    const groupTwoGraphTwoDiv = document.getElementById('groupTwoGraphTwo') as HTMLDivElement;
    const showWeightCheckbox = document.getElementById('showWeightCheckbox') as HTMLInputElement;
    const rightArrow = document.getElementById('rightArrow') as HTMLDivElement;

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
        !settingsContainerDiv ||
        !viewSettingsButton ||
        !closeSettingsButton ||
        !graphGroupDropdown ||
        !graphGroupTwoGraphs ||
        !aStarHeuristicTypeDropDown ||
        !changeEndNodeButton ||
        !changeStartNodeButton ||
        !generateNewGraphButton ||
        !primaryGraphTypeDropdown ||
        !secondaryGraphTypeDropdown ||
        !gridContainers ||
        !runButton ||
        !stepsCount ||
        !stepsSlider ||
        !weightControls ||
        !weightCheckbox ||
        !weightSwitch ||
        !weightSlider ||
        !speedDropdown ||
        !graphGroupOneDiv ||
        !groupOneGraphOneDiv ||
        !groupOneGraphTwoDiv ||
        !graphGroupTwoDiv ||
        !groupTwoGraphOneDiv ||
        !groupTwoGraphTwoDiv ||
        !showWeightCheckbox ||
        !rightArrow
    ) {
        return;
    }

    const globalVariablesManager = getGlobalVariablesManagerInstance();

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

    const disableSpeedControls = () => {
        speedDropdown.disabled = true;
    };

    const enableSpeedControls = () => {
        speedDropdown.disabled = false;
    };

    const disableStartEndNodeButton = () => {
        changeStartNodeButton.disabled = true;
        changeEndNodeButton.disabled = true;
    };

    const enableStartEndNodeButton = () => {
        changeStartNodeButton.disabled = false;
        changeEndNodeButton.disabled = false;
    };

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

        // Update tutorial buttons visibility.
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

        // Update page number.
        pageNumber.innerHTML = `${currentPageNumber}/10`;
    };

    const handleTutorialOpen = () => {
        // Blur background
        mainBodyDiv.classList.add('main-body-blur');

        // Reset tutorialPageNumber to 1.
        const currentPageNumber = globalVariablesManager.resetTutorialPageNumber();

        // Hide Settings
        settingsContainerDiv.style.display = 'none';

        // Show Tutorial
        tutorialContainerDiv.style.display = 'flex';
        renderTutorialContent(currentPageNumber, tutorialContentDiv);

        updateTutorialButtonsAndPageNumber();
    };

    const handleTutorialClose = () => {
        tutorialContainerDiv.style.display = 'none';
        mainBodyDiv.classList.remove('main-body-blur');
    };

    const handleSettingsOpen = () => {
        // Blur background
        mainBodyDiv.classList.add('main-body-blur');

        // Show Settings
        settingsContainerDiv.style.display = 'flex';
    };

    const handleSettingsClose = () => {
        settingsContainerDiv.style.display = 'none';
        mainBodyDiv.classList.remove('main-body-blur');
    };

    const getRunResults = () => {
        // Obtain run results for all algorithms.
        const newRunResults = Object.values(AlgorithmType).map((algorithmType) =>
            runAlgorithm(algorithmType),
        );

        // Set the slider's max value to the maximum steps from all algorithms executed.
        stepsSlider.max = Math.max(
            ...newRunResults.map((result) => result.getAlgorithmSteps()),
        ).toString();

        globalVariablesManager.setRunResults(newRunResults);
    };

    const resetGridAndRerun = () => {
        getRunResults();
        resetGridAndStatisticTable(gridContainers, Object.values(AlgorithmType));
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

                // If graph is a maze, only path cells will be highlighted.
                if (
                    globalVariablesManager.isMazeGraph() &&
                    !(globalVariablesManager.getGraph().nodes[i].weight === 1)
                ) {
                    continue;
                }

                const cell = document.getElementById(`${algorithmType}-cell-${i}`);
                if (!cell) return;

                cell.innerHTML = '';

                // Set mark based on nodeState.
                const mark = createMark(algorithmType, i.toString(), nodeState);

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
                });
            }
        }
    };

    const generateNewGraph = () => {
        if (globalVariablesManager.isExampleGraph()) {
            // Weight controls are disabled for example graphs.
            hideWeightControls();
            // Generating new start and end nodes for example graphs is not allowed.
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
                return;
            }
        }

        // Other graph types.
        showWeightControls();
        enableStartEndNodeButton();

        // We don't show the weight slider for maze graphs.
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
        // Generates new graphs until one where the end node is reachable from the start node is obtained.
        do {
            generateNewGraph();
            resetGridAndRerun();
        } while (!globalVariablesManager.isEndNodeReachable());
    };

    const setSecondaryGraphDropdown = (primaryGraphType: PrimaryGraphType) => {
        // Reset dropdown.
        secondaryGraphTypeDropdown.options.length = 0;

        switch (primaryGraphType) {
            case PrimaryGraphType.Standard:
                // There is no secondary graph type for standard graphs.
                disableSecondaryGraphTypeDropdown();
                break;
            case PrimaryGraphType.Maze:
                enableSecondaryGraphTypeDropdown();
                Object.values(MazeType).forEach((option) => {
                    let optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    secondaryGraphTypeDropdown.appendChild(optionElement);
                });
                break;

            case PrimaryGraphType.Ideal:
                enableSecondaryGraphTypeDropdown();
                Object.values(AlgorithmType).forEach((option) => {
                    let optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = getAlgorithmDisplayName(option);
                    secondaryGraphTypeDropdown.appendChild(optionElement);
                });
                break;

            default:
                break;
        }
    };

    const setGraphGroups = (
        graphGroupOneGraphOne: AlgorithmType,
        graphGroupOneGraphTwo: AlgorithmType,
        graphGroupTwoGraphOne: AlgorithmType,
        graphGroupTwoGraphTwo: AlgorithmType,
    ) => {
        setGraphGroup(groupOneGraphOneDiv, graphGroupOneGraphOne);
        setGraphGroup(groupOneGraphTwoDiv, graphGroupOneGraphTwo);
        setGraphGroup(groupTwoGraphOneDiv, graphGroupTwoGraphOne);
        setGraphGroup(groupTwoGraphTwoDiv, graphGroupTwoGraphTwo);
        resetGridAndStatisticTable(gridContainers, Object.values(AlgorithmType));
    };

    const setGraphGroup = (graphGroupDiv: HTMLDivElement, graphType: AlgorithmType) => {
        graphGroupDiv.innerHTML = `
        <p><b>${getAlgorithmDisplayName(graphType)}</b></p>
        <div class="grid" id="${graphType}"></div>`;
    };

    renderTutorialContent(globalVariablesManager.getTutorialPageNumber(), tutorialContentDiv);

    // Setup of controls on initial page load.
    setWeightColor();
    resetStepsSlider();
    enableStepsSlider();
    enableSpeedControls();
    enableGraphControls();
    disableSecondaryGraphTypeDropdown(); // Secondary graph type dropdown disabled for default standard graph type.
    toggleTutorialButton('P', false); // Since we are on the first page of the tutorial, there is no previous button.

    // Generate graph and run results.
    resetGridAndRerun();

    // Add event listeners
    runButton.addEventListener('click', async () => {
        // These controls are disabled when the simulations are running.
        disableGraphControls();
        disableWeightControls();
        disableStepsSlider();
        disableSpeedControls();

        // Reset grid for subsequent renders.
        if (!globalVariablesManager.isFirstRender()) {
            resetGridAndRerun();
        }

        globalVariablesManager.setFirstRender(false);

        // Display simulation.
        await displayAllRunResults(stepsSlider, stepsCount);

        // Enable controls once simulations are completed.
        enableGraphControls();
        enableWeightControls();
        enableStepsSlider();
        enableSpeedControls();

        // Generating new start and end nodes for example graphs is not allowed.
        if (globalVariablesManager.isExampleGraph()) {
            disableStartEndNodeButton();
        } else {
            enableStartEndNodeButton();
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

    generateNewGraphButton.addEventListener('click', async () => {
        generateNewGraphWithReachableEndNode();
    });

    changeStartNodeButton.addEventListener('click', () => {
        setNewStartEndNode(NodeState.StartNode);
    });

    changeEndNodeButton.addEventListener('click', async () => {
        setNewStartEndNode(NodeState.EndNode);
    });

    primaryGraphTypeDropdown.addEventListener('change', async () => {
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
        }, WEIGHT_DEBOUNCE_DELAY),
    );

    stepsSlider.addEventListener('input', () => {
        resetGridAndStatisticTable(gridContainers, Object.values(AlgorithmType));
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
                // Show the shortest path for the slowest algorithm.
                // Shortest paths for other algorithms are displayed as part of the run results.
                if (runResult.getLatestTotalSteps() === maxStepsOfAllAlgorithms) {
                    displayShortestPath(
                        gridContainers,
                        runResult.getShortestPath(),
                        runResult.getAlgorithmType(),
                    );
                }
            });
        }
    });

    speedDropdown.addEventListener('change', async () => {
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

    aStarHeuristicTypeDropDown.addEventListener('change', async () => {
        const aStarHeuristicType = aStarHeuristicTypeDropDown.value as AStarHeuristicType;
        globalVariablesManager.setAStarHeuristicType(aStarHeuristicType);
        resetGridAndRerun();
    });

    graphGroupDropdown.addEventListener('change', async () => {
        const graphGroup = graphGroupDropdown.value as GraphGroup;
        let graphGroupTwoText = 'Dijkstra & A* Search';
        switch (graphGroup) {
            case GraphGroup.BfsAStar:
                graphGroupTwoText = 'Dijkstra & Bellman-Ford';
                setGraphGroups(
                    AlgorithmType.Bfs,
                    AlgorithmType.AStar,
                    AlgorithmType.Dijkstra,
                    AlgorithmType.BellmanFord,
                );
                break;
            case GraphGroup.BfsDijkstra:
                graphGroupTwoText = 'Bellman & A* Search';
                setGraphGroups(
                    AlgorithmType.Bfs,
                    AlgorithmType.Dijkstra,
                    AlgorithmType.BellmanFord,
                    AlgorithmType.AStar,
                );
                break;
            case GraphGroup.BfsBellman:
                graphGroupTwoText = 'Dijkstra & A* Search';
                setGraphGroups(
                    AlgorithmType.Bfs,
                    AlgorithmType.BellmanFord,
                    AlgorithmType.Dijkstra,
                    AlgorithmType.AStar,
                );
                break;
            default:
                break;
        }
        graphGroupTwoGraphs.innerHTML = graphGroupTwoText;
    });

    showWeightCheckbox.addEventListener('change', () => {
        globalVariablesManager.setShowWeights(showWeightCheckbox.checked);
        resetGridAndStatisticTable(gridContainers, Object.values(AlgorithmType));
    });

    rightArrow.addEventListener('click', () => {
        const graphGroup = globalVariablesManager.toggleGraphGroup();
        if (graphGroup === 1) {
            graphGroupOneDiv.style.display = 'block';
            graphGroupTwoDiv.style.display = 'none';
        } else {
            graphGroupTwoDiv.style.display = 'block';
            graphGroupOneDiv.style.display = 'none';
        }
    });
});
