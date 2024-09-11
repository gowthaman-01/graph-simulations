declare global {
    interface Window {
        openTutorialPage: (pageNumber: number) => void;
    }
}

import {
    AVERAGE_SPEED,
    SLOW_SPEED,
    FAST_SPEED,
    TOTAL_TUTORIAL_PAGES,
    DEFAULT_GRID_SIZE,
    PROGRESS_BAR_INCREMENT,
    DEFAULT_PROGRESS_BAR_WIDTH,
} from '../src/common/constants';
import {
    HeuristicType,
    AlgorithmType,
    GraphType,
    MazeType,
    PrimaryGraphType,
    SecondaryGraphType,
    SimulationSpeed,
    EnvironmentType,
    Dropdowns,
    GraphStorage,
    STATUS,
    DISPLAY_STYLE,
    GRAPH_POSITION,
} from '../src/common/types';
import { getGlobalVariablesManagerInstance } from '../src/classes/GlobalVariablesManager';
import {
    displayAllRunResults,
    displayStep,
    displayShortestPath,
    resetGrid,
    resetStatisticTable,
} from '../src/utils/display';
import {
    delay,
    getAlgorithmDisplayName,
    getHeuristicTypeDisplayName,
    getPrimaryGraphTypeDisplayName,
    getSecondaryGraphTypeDisplayName,
    getSimulationSpeedDisplayName,
    getWeightTypeDisplayName,
    preloadImage,
    setWeightColor,
    updateProgressBar,
} from '../src/utils/general';
import { runAlgorithm } from '../src/utils/run';
import { renderTutorialContent } from '../src/tutorial/tutorial';
import { tutorialDataList } from '../src/tutorial/data';
import { CustomDropdown } from '../src/classes/CustomDropdown';
import { toggleElement, toggleElementVisibility } from '../src/utils/element';
import { generateNewGraphWithReachableEndNode } from '../src/utils/graph';

import negativeWeightedStandardGraphExamples from '../src/generation-scripts/negativeWeightedStandardGraphExamples.json';
import negativeWeightedRecursiveDivisionGraphExamples from '../src/generation-scripts/negativeWeightedRecursiveDivisionGraphExamples.json';
import negativeWeightedDfsGraphExamples from '../src/generation-scripts/negativeWeightedDFSGraphExamples.json';
import negativeWeightedRandomWallsGraphExamples from '../src/generation-scripts/negativeWeightedRandomWallsGraphExamples.json';
import { aStarSearch } from '../src/algorithms/aStarSearch';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    // Load HTML elements
    const mainBodyDiv = document.getElementById('mainBody') as HTMLDivElement;
    const loadingScreen = document.getElementById('loadingScreen') as HTMLDivElement;
    const progressBar = document.getElementById('progressBar') as HTMLDivElement;
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
    const heuristicTypeDropdownButton = document.getElementById(
        'heuristicTypeDropdownButton',
    ) as HTMLButtonElement;
    const heuristicTypeDropdownMenu = document.getElementById(
        'heuristicTypeDropdownMenu',
    ) as HTMLDivElement;
    const openGraphEditorButtons = document.getElementsByClassName(
        'graph-editor-button',
    ) as HTMLCollectionOf<HTMLButtonElement>;
    const leftGraphDropdownButton = document.getElementById(
        'leftGraphDropdownButton',
    ) as HTMLButtonElement;
    const leftGraphDropdownMenu = document.getElementById(
        'leftGraphDropdownMenu',
    ) as HTMLDivElement;
    const rightGraphDropdownButton = document.getElementById(
        'rightGraphDropdownButton',
    ) as HTMLButtonElement;
    const rightGraphDropdownMenu = document.getElementById(
        'rightGraphDropdownMenu',
    ) as HTMLDivElement;
    const generateNewGraphButton = document.getElementById('newGraph') as HTMLButtonElement;
    const primaryGraphTypeDropdownButton = document.getElementById(
        'primaryGraphTypeDropdownButton',
    ) as HTMLButtonElement;
    const primaryGraphTypeDropdownMenu = document.getElementById(
        'primaryGraphTypeDropdownMenu',
    ) as HTMLDivElement;
    const secondaryGraphTypeDropdownButton = document.getElementById(
        'secondaryGraphTypeDropdownButton',
    ) as HTMLButtonElement;
    const secondaryGraphTypeDropdownMenu = document.getElementById(
        'secondaryGraphTypeDropdownMenu',
    ) as HTMLDivElement;
    const leftGraphDiv = document.getElementById('leftGraph') as HTMLDivElement;
    const rightGraphDiv = document.getElementById('rightGraph') as HTMLDivElement;
    const runButton = document.getElementById('runAlgorithms') as HTMLButtonElement;
    const stepsCount = document.getElementById('stepCount') as HTMLParagraphElement;
    const stepsSlider = document.getElementById('stepSlider') as HTMLInputElement;
    const weightControls = document.getElementById('weightControls') as HTMLDivElement;
    const environmentTypeDropdownButton = document.getElementById(
        'environmentTypeDropdownButton',
    ) as HTMLButtonElement;
    const environmentTypeDropdownMenu = document.getElementById(
        'environmentTypeDropdownMenu',
    ) as HTMLDivElement;
    const speedDropdownButton = document.getElementById('speedDropdownButton') as HTMLButtonElement;
    const speedDropdownMenu = document.getElementById('speedDropdownMenu') as HTMLDivElement;
    const showWeightCheckbox = document.getElementById('showWeightCheckbox') as HTMLInputElement;
    const infoButton = document.getElementById('infoButton') as HTMLImageElement;

    // Return early if an element is undefined.
    if (
        !mainBodyDiv ||
        !loadingScreen ||
        !progressBar ||
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
        !heuristicTypeDropdownButton ||
        !heuristicTypeDropdownMenu ||
        !leftGraphDropdownButton ||
        !leftGraphDropdownMenu ||
        !rightGraphDropdownButton ||
        !rightGraphDropdownMenu ||
        !generateNewGraphButton ||
        !primaryGraphTypeDropdownButton ||
        !primaryGraphTypeDropdownMenu ||
        !secondaryGraphTypeDropdownButton ||
        !secondaryGraphTypeDropdownMenu ||
        !leftGraphDiv ||
        !rightGraphDiv ||
        !runButton ||
        !stepsCount ||
        !stepsSlider ||
        !weightControls ||
        !environmentTypeDropdownButton ||
        !environmentTypeDropdownMenu ||
        !speedDropdownButton ||
        !speedDropdownMenu ||
        !showWeightCheckbox ||
        !infoButton
    ) {
        return;
    }

    progressBar.style.width = DEFAULT_PROGRESS_BAR_WIDTH;

    const graphControlElements = [
        heuristicTypeDropdownButton,
        leftGraphDropdownButton,
        rightGraphDropdownButton,
        primaryGraphTypeDropdownButton,
        secondaryGraphTypeDropdownButton,
        heuristicTypeDropdownButton,
        generateNewGraphButton,
        ...Array.from(openGraphEditorButtons),
    ];

    // Initialising the Global Variables Manager and setting the default algorithm types.
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    globalVariablesManager.setGraphDivs(
        {
            algorithmType: AlgorithmType.BFS,
            graphDivElement: leftGraphDiv,
            position: GRAPH_POSITION.LEFT,
        },
        {
            algorithmType: AlgorithmType.Dijkstra,
            graphDivElement: rightGraphDiv,
            position: GRAPH_POSITION.RIGHT,
        },
    );

    /* Initialises the dropdown buttons and sets up their functionality. */
    const setupDropdowns = (): Dropdowns => {
        const setNewGraphDiv = (newAlgorithmType: AlgorithmType, graphPosition: GRAPH_POSITION) => {
            const graphDivs = globalVariablesManager.getGraphDivs(false);
            const currAlgorithmType = graphDivs.find(
                (graphDiv) => graphDiv.position === graphPosition,
            )?.algorithmType;
            if (currAlgorithmType === newAlgorithmType) {
                return;
            }

            const newGraphDiv = {
                algorithmType: newAlgorithmType as AlgorithmType,
                graphDivElement:
                    graphPosition === GRAPH_POSITION.LEFT ? leftGraphDiv : rightGraphDiv,
                position: graphPosition,
            };
            globalVariablesManager.setGraphDiv(newGraphDiv, graphPosition);

            resetGridAndRerun();
        };

        const leftGraphDropdown = new CustomDropdown(
            leftGraphDropdownButton,
            leftGraphDropdownMenu,
            getAlgorithmDisplayName(AlgorithmType.BFS),
            (dataValue) => {
                setNewGraphDiv(dataValue as AlgorithmType, GRAPH_POSITION.LEFT);
            },
        );

        const rightGraphDropdown = new CustomDropdown(
            rightGraphDropdownButton,
            rightGraphDropdownMenu,
            getAlgorithmDisplayName(AlgorithmType.Dijkstra),
            (dataValue) => {
                setNewGraphDiv(dataValue as AlgorithmType, GRAPH_POSITION.RIGHT);
            },
        );

        const primaryGraphTypeDropdown = new CustomDropdown(
            primaryGraphTypeDropdownButton,
            primaryGraphTypeDropdownMenu,
            getPrimaryGraphTypeDisplayName(globalVariablesManager.getGraphType()),
            (dataValue) => {
                const primaryGraphType = dataValue as PrimaryGraphType;
                let graphType: GraphType;
                switch (primaryGraphType) {
                    case PrimaryGraphType.Maze:
                        graphType = GraphType.RecursiveDivision;
                        enableSecondaryGraphTypeDropdown();
                        globalVariablesManager
                            .getDropdowns()
                            ?.secondaryGraphTypeDropdown.updateTextContent(
                                getSecondaryGraphTypeDisplayName(graphType),
                            );
                        break;
                    case PrimaryGraphType.Standard:
                        disableSecondaryGraphTypeDropdown();
                        graphType = GraphType.Standard;
                        break;
                    case PrimaryGraphType.Custom:
                        graphType = GraphType.Custom;
                        disableSecondaryGraphTypeDropdown();
                        break;
                }

                globalVariablesManager.setGraphType(graphType);

                if (primaryGraphType === PrimaryGraphType.Custom) {
                    const customGraph = globalVariablesManager.getCustomGraph();
                    if (customGraph) {
                        globalVariablesManager.setGraph(customGraph);
                        globalVariablesManager.setWeightType(EnvironmentType.RoadNetwork);
                        const dropdowns = globalVariablesManager.getDropdowns();
                        if (dropdowns) {
                            const environmentTypeDropdown = dropdowns.environmentTypeDropdown;
                            environmentTypeDropdown.updateTextContent(
                                getWeightTypeDisplayName(EnvironmentType.RoadNetwork),
                            );
                        }
                        resetGridAndRerun();
                    } else {
                        window.location.href = 'editor.html';
                    }
                } else {
                    if (
                        globalVariablesManager.getEnvironmentType() ===
                        EnvironmentType.ElevatedTerrain
                    ) {
                        getNegativeWeightedGraphExample(graphType);
                        resetGridAndRerun();
                    } else {
                        generateNewGraphWithReachableEndNode(resetGridAndRerun);
                    }
                }
            },
        );

        const secondaryGraphTypeDropdown = new CustomDropdown(
            secondaryGraphTypeDropdownButton,
            secondaryGraphTypeDropdownMenu,
            getSecondaryGraphTypeDisplayName(globalVariablesManager.getGraphType()),
            (dataValue) => {
                const secondaryGraphType = dataValue as SecondaryGraphType;
                let graphType = GraphType.RecursiveDivision;
                switch (secondaryGraphType) {
                    case MazeType.DFS:
                        graphType = GraphType.DFS;
                        break;
                    case MazeType.RandomWalls:
                        graphType = GraphType.RandomWalls;
                        break;
                    case MazeType.RecursiveDivision:
                        graphType = GraphType.RecursiveDivision;
                        break;
                }

                globalVariablesManager.setGraphType(graphType);

                if (
                    globalVariablesManager.getEnvironmentType() === EnvironmentType.ElevatedTerrain
                ) {
                    getNegativeWeightedGraphExample(graphType);
                    resetGridAndRerun();
                } else {
                    generateNewGraphWithReachableEndNode(resetGridAndRerun);
                }
            },
        );

        const speedDropdown = new CustomDropdown(
            speedDropdownButton,
            speedDropdownMenu,
            getSimulationSpeedDisplayName(globalVariablesManager.getSimulationSpeed()),
            (dataValue) => {
                const simulationSpeed = dataValue as SimulationSpeed;
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
            },
        );

        const environmentTypeDropdown = new CustomDropdown(
            environmentTypeDropdownButton,
            environmentTypeDropdownMenu,
            getWeightTypeDisplayName(globalVariablesManager.getEnvironmentType()),
            (dataValue) => {
                const environmentType = dataValue as EnvironmentType;
                globalVariablesManager.setWeightType(environmentType);

                if (globalVariablesManager.getGraphType() === GraphType.Custom) {
                    if (environmentType === EnvironmentType.FlatTerrain) {
                        globalVariablesManager.setGraphType(GraphType.Standard);
                        globalVariablesManager.setWeightType(EnvironmentType.FlatTerrain);
                        const dropdowns = globalVariablesManager.getDropdowns();
                        if (dropdowns) {
                            const primaryGraphTypeDropdown = dropdowns.primaryGraphTypeDropdown;
                            primaryGraphTypeDropdown.updateTextContent(
                                getPrimaryGraphTypeDisplayName(GraphType.Standard),
                            );
                        }
                        generateNewGraphWithReachableEndNode(resetGridAndRerun);
                    } else {
                        resetGridAndRerun();
                    }
                } else {
                    if (environmentType === EnvironmentType.ElevatedTerrain) {
                        getNegativeWeightedGraphExample(globalVariablesManager.getGraphType());
                        resetGridAndRerun();
                    } else {
                        generateNewGraphWithReachableEndNode(resetGridAndRerun);
                    }
                }
            },
        );

        const heuristicTypeDropdown = new CustomDropdown(
            heuristicTypeDropdownButton,
            heuristicTypeDropdownMenu,
            getHeuristicTypeDisplayName(globalVariablesManager.getHeuristicType()),
            (dataValue) => {
                const heuristicType = dataValue as HeuristicType;
                globalVariablesManager.setHeuristicType(heuristicType);
                resetGridAndRerun([AlgorithmType.AStar, AlgorithmType.Greedy]);
            },
        );

        return {
            leftGraphDropdown,
            rightGraphDropdown,
            secondaryGraphTypeDropdown,
            primaryGraphTypeDropdown,
            speedDropdown,
            heuristicTypeDropdown,
            environmentTypeDropdown,
        };
    };

    /* Helper functions to disable and enable controls. */
    const disableWeightControls = () => {
        toggleElement([environmentTypeDropdownButton], STATUS.DISABLE);
    };

    const enableWeightControls = () => {
        toggleElement([environmentTypeDropdownButton], STATUS.ENABLE);
    };

    const disableGraphControls = () => {
        toggleElement(graphControlElements, STATUS.DISABLE);
    };

    const enableGraphControls = () => {
        toggleElement(graphControlElements, STATUS.ENABLE);
    };

    const disableSecondaryGraphTypeDropdown = () => {
        toggleElementVisibility([secondaryGraphTypeDropdownButton], DISPLAY_STYLE.NONE);
        secondaryGraphTypeDropdownButton.style.cursor = 'default';
    };

    const enableSecondaryGraphTypeDropdown = () => {
        toggleElementVisibility([secondaryGraphTypeDropdownButton], DISPLAY_STYLE.FLEX);
        secondaryGraphTypeDropdownButton.style.cursor = 'pointer';
    };

    const disableStepsSlider = () => {
        toggleElement([stepsSlider], STATUS.DISABLE);
    };

    const enableStepsSlider = () => {
        toggleElement([stepsSlider], STATUS.ENABLE);
    };

    const resetStepsSlider = () => {
        stepsSlider.value = '0';
        stepsCount.innerHTML = `Steps: 0`;
        enableStepsSlider();
    };

    const disableSpeedControls = () => {
        toggleElement([speedDropdownButton], STATUS.DISABLE);
    };

    const enableSpeedControls = () => {
        toggleElement([speedDropdownButton], STATUS.ENABLE);
    };

    const toggleSimulationControls = (status: STATUS.ENABLE | STATUS.DISABLE) => {
        if (status === STATUS.DISABLE) {
            disableGraphControls();
            disableWeightControls();
            disableStepsSlider();
            disableSpeedControls();
        } else {
            enableGraphControls();
            enableWeightControls();
            enableStepsSlider();
            enableSpeedControls();
        }
    };

    const toggleTutorialButton = (buttonType: 'P' | 'N' | 'F', show: STATUS.SHOW | STATUS.HIDE) => {
        let button = tutorialPreviousButton;
        switch (buttonType) {
            case 'N':
                button = tutorialNextButton;
                break;
            case 'F':
                button = tutorialFinishButton;
                break;
            default:
                break;
        }

        button.style.display = show === STATUS.SHOW ? 'inline' : 'none';
    };

    /* Tutorial and settings modal helper functions. */
    const updateTutorialButtonsAndPageNumber = () => {
        const currentPageNumber = globalVariablesManager.getTutorialPageNumber();

        // Update visibility of tutorial buttons.
        if (currentPageNumber === 1) {
            toggleTutorialButton('P', STATUS.HIDE);
            toggleTutorialButton('N', STATUS.SHOW);
            toggleTutorialButton('F', STATUS.HIDE);
        } else if (currentPageNumber === tutorialDataList.length) {
            toggleTutorialButton('P', STATUS.SHOW);
            toggleTutorialButton('N', STATUS.HIDE);
            toggleTutorialButton('F', STATUS.SHOW);
        } else {
            toggleTutorialButton('P', STATUS.SHOW);
            toggleTutorialButton('N', STATUS.SHOW);
            toggleTutorialButton('F', STATUS.HIDE);
        }

        // Update the page number.
        pageNumber.innerHTML = `${currentPageNumber}/${TOTAL_TUTORIAL_PAGES}`;
    };

    const handleTutorialOpen = () => {
        openTutorialPage(globalVariablesManager.getTutorialPageMin());
    };

    const handleTutorialClose = () => {
        toggleElementVisibility([tutorialContainerDiv], DISPLAY_STYLE.NONE);
        mainBodyDiv.classList.remove('main-body-blur');
    };

    const handleSettingsOpen = () => {
        toggleElementVisibility([settingsModalDiv], DISPLAY_STYLE.FLEX);
        mainBodyDiv.classList.add('main-body-blur');
    };

    const handleSettingsClose = () => {
        toggleElementVisibility([settingsModalDiv], DISPLAY_STYLE.NONE);
        mainBodyDiv.classList.remove('main-body-blur');
    };

    const openTutorialPage = (pageNumber: number) => {
        // Blur background.
        mainBodyDiv.classList.add('main-body-blur');

        // Hide Settings modal.
        toggleElementVisibility([settingsModalDiv], DISPLAY_STYLE.NONE);

        // Show Tutorial modal.
        toggleElementVisibility([tutorialContainerDiv], DISPLAY_STYLE.FLEX);

        globalVariablesManager.setTutorialPageNumber(pageNumber);
        renderTutorialContent(pageNumber, tutorialContentDiv);
        updateTutorialButtonsAndPageNumber();
    };

    // Expose openTutorialPage to window object for tutorial page navigation directly from HTML.
    window.openTutorialPage = openTutorialPage;

    /* Retrieves the run results for the specified algorithms to rerun. Defaults to all algorithms. */
    const getRunResults = (algorithmsToRerun = Object.values(AlgorithmType)) => {
        const isEditor = false;
        const graphDivs = globalVariablesManager.getGraphDivs(isEditor);
        const visibleAlgorithms = graphDivs.map((graphDiv) => graphDiv.algorithmType);
        const hiddenAlgorithms = algorithmsToRerun.filter(
            (algorithmType) =>
                !visibleAlgorithms.includes(algorithmType) &&
                algorithmType !== AlgorithmType.Editor,
        );

        const runResultsToKeep = globalVariablesManager
            .getRunResults()
            .filter((runResult) => !algorithmsToRerun.includes(runResult.getAlgorithmType()));

        const visibleGraphRunResults = graphDivs.map((graphDiv) =>
            runAlgorithm(graphDiv, graphDiv.algorithmType),
        );

        const hiddenGraphRunResults = hiddenAlgorithms.map((algorithmType) =>
            runAlgorithm(null, algorithmType),
        );

        // Set the slider's max value to the maximum steps from all executed algorithms
        stepsSlider.max = Math.max(
            ...visibleGraphRunResults.map((result) => result.getAlgorithmSteps()),
        ).toString();

        // Combine all run results
        const newRunResults = [
            ...visibleGraphRunResults,
            ...hiddenGraphRunResults,
            ...runResultsToKeep,
        ];

        // Check if the end node is reachable
        const isEndNodeNotReachable = visibleGraphRunResults.every(
            (runResult) => runResult.getShortestPath().length <= 1,
        );

        // Update global variables manager
        globalVariablesManager.setEndNodeReachable(!isEndNodeNotReachable);
        globalVariablesManager.setRunResults(newRunResults);
    };

    /* Resets the grid, statistics table, steps slider and reruns the algorithms. */
    const resetGridAndRerun = (algorithmsToRerun = Object.values(AlgorithmType)) => {
        getRunResults(algorithmsToRerun);
        resetGrid();
        resetStatisticTable();
        resetStepsSlider();
    };

    /* Generates a negative weighted graph example where Bellman-Ford is the fastest algorithm. */
    const getNegativeWeightedGraphExample = (graphType: GraphType) => {
        let negativeWeightedGraphExamples: GraphStorage[];
        globalVariablesManager.setGridSize(DEFAULT_GRID_SIZE);
        switch (graphType) {
            case GraphType.Standard:
                negativeWeightedGraphExamples =
                    negativeWeightedStandardGraphExamples as GraphStorage[];
                break;
            case GraphType.RecursiveDivision:
                negativeWeightedGraphExamples =
                    negativeWeightedRecursiveDivisionGraphExamples as GraphStorage[];
                break;
            case GraphType.RandomWalls:
                negativeWeightedGraphExamples =
                    negativeWeightedRandomWallsGraphExamples as GraphStorage[];
                break;
            case GraphType.DFS:
                negativeWeightedGraphExamples = negativeWeightedDfsGraphExamples as GraphStorage[];
                break;
            default:
                negativeWeightedGraphExamples =
                    negativeWeightedStandardGraphExamples as GraphStorage[];
                break;
        }

        const negativeWeightedGraphExample = negativeWeightedGraphExamples[
            Math.floor(Math.random() * negativeWeightedGraphExamples.length)
        ] as GraphStorage;
        globalVariablesManager.setGraph({
            graph: negativeWeightedGraphExample.graph,
            nodes: negativeWeightedGraphExample.nodes.map((node) =>
                node === -1 ? Infinity : node,
            ),
        });
        globalVariablesManager.setStartNode(negativeWeightedGraphExample.startNode);
        globalVariablesManager.setEndNode(negativeWeightedGraphExample.endNode);
    };

    /* Add event listeners for control elements. */
    runButton.addEventListener('click', async () => {
        if (globalVariablesManager.getIsSimulationRunning()) {
            // If button is clicked while simulation is running, stop simulation.
            globalVariablesManager.stopSimulation();
            runButton.innerHTML = 'Run';
        } else {
            globalVariablesManager.setIsSimulationRunning();
            runButton.innerHTML = 'Stop';

            // Disable control elements while simulation is running.
            toggleSimulationControls(STATUS.DISABLE);

            // Reset grid before running the simulation on subsequent renders.
            if (stepsSlider.value === stepsSlider.max) {
                resetGrid();
                resetStepsSlider();
            }

            // Display simulation.
            await displayAllRunResults(stepsSlider);

            // Enable control elements once simulations are completed.
            toggleSimulationControls(STATUS.ENABLE);

            globalVariablesManager.stopSimulation();
            runButton.innerHTML = 'Run';
        }
    });

    viewTutorialButton.addEventListener('click', handleTutorialOpen);

    tutorialNextButton.addEventListener('click', () => {
        openTutorialPage(globalVariablesManager.incrementTutorialPageNumber());
    });

    tutorialPreviousButton.addEventListener('click', () => {
        openTutorialPage(globalVariablesManager.decrementTutorialPageNumber());
    });

    tutorialSkipButton.addEventListener('click', handleTutorialClose);

    tutorialFinishButton.addEventListener('click', handleTutorialClose);

    viewSettingsButton.addEventListener('click', handleSettingsOpen);

    closeSettingsButton.addEventListener('click', handleSettingsClose);

    generateNewGraphButton.addEventListener('click', () => {
        // If the graph type is custom, reset to standard graph type and update dropdown.
        if (globalVariablesManager.getGraphType() === GraphType.Custom) {
            globalVariablesManager.setGraphType(GraphType.Standard);
            const dropdowns = globalVariablesManager.getDropdowns();
            if (dropdowns) {
                const primaryGraphTypeDropdown = dropdowns.primaryGraphTypeDropdown;
                primaryGraphTypeDropdown.updateTextContent(
                    getPrimaryGraphTypeDisplayName(GraphType.Standard),
                );
            }
        }

        // Generate a negative weighted graph example if the weight type is negative.
        if (globalVariablesManager.getEnvironmentType() === EnvironmentType.ElevatedTerrain) {
            getNegativeWeightedGraphExample(globalVariablesManager.getGraphType());
            resetGridAndRerun();
        } else {
            generateNewGraphWithReachableEndNode(resetGridAndRerun);
        }
    });

    Array.from(openGraphEditorButtons).forEach((button) => {
        button.addEventListener('click', () => {
            globalVariablesManager.saveToLocalStorage();
            window.location.href = 'editor.html';
        });
    });

    stepsSlider.addEventListener('input', () => {
        resetGrid();
        stepsCount.innerHTML = `Steps: ${stepsSlider.value}`;

        const runResults = globalVariablesManager
            .getRunResults()
            .filter((runResult) => runResult.getIsDisplayed());

        // Display the current step.
        runResults.forEach((runResult) => {
            displayStep(parseInt(stepsSlider.value), runResult);
        });

        // When slider reaches the maximum value.
        if (stepsSlider.value === stepsSlider.max && globalVariablesManager.isEndNodeReachable()) {
            const maxStepsOfAllAlgorithms = Math.max(
                ...runResults.map((result) => result.getLatestTotalSteps()),
            );
            runResults.forEach((runResult) => {
                const graphDiv = runResult.getGraphDiv();
                // Show the shortest path for the slowest algorithm.
                // Shortest paths for other algorithms are displayed as part of the run results.
                if (graphDiv) {
                    if (runResult.getLatestTotalSteps() === maxStepsOfAllAlgorithms) {
                        displayShortestPath(runResult.getShortestPath(), graphDiv);
                    } else {
                        displayStep(runResult.getLatestTotalSteps(), runResult);
                    }
                }
            });
        }
    });

    showWeightCheckbox.addEventListener('change', () => {
        globalVariablesManager.setShowWeights(showWeightCheckbox.checked);
        resetGrid();
    });

    infoButton.addEventListener('click', () => {
        openTutorialPage(4);
    });

    // Render tutorial upon page load.
    if (globalVariablesManager.getShowTutorial()) {
        handleTutorialOpen();

        // Prevent tutorial from showing again by saving user settings to local storage.
        globalVariablesManager.setShowTutorial(false);
        globalVariablesManager.saveToLocalStorage();
    } else {
        handleTutorialClose();
    }

    const loadImages = async () => {
        const imageUrls = [
            './assets/car.png',
            './assets/down-arrow.png',
            './assets/elevated.png',
            './assets/example-weight.png',
            './assets/exploring.svg',
            './assets/flag.png',
            './assets/golf.png',
            './assets/info.png',
            './assets/legend-grid.png',
            './assets/logo.png',
            './assets/pathium.png',
            './assets/pin.png',
            './assets/recursive-division.png',
            './assets/road.png',
            './assets/shortest-path.png',
            './assets/shortest-path.svg',
            './assets/statistics-table.png',
            './assets/up-arrow.png',
            './assets/visited.svg',
            './assets/visiting.svg',
            './assets/weighted.png',
            './assets/flat.png',
        ];

        imageUrls.forEach(async (imageUrl) => {
            try {
                if (progressBar.style.width !== '100%') {
                    progressBar.style.width += `${PROGRESS_BAR_INCREMENT}%`;
                }
                await delay(Math.floor(Math.random() * 20));
                await preloadImage(imageUrl);
            } catch (error) {
                console.error('Error preloading images', error);
            }
        });

        progressBar.style.width = '100%';
        await delay(200);
        loadingScreen.style.display = 'none';
    };

    /* Initialization during page load. */
    const initializePage = async () => {
        setWeightColor();
        resetStepsSlider();
        enableStepsSlider();
        enableSpeedControls();
        enableGraphControls();

        // Store dropdowns.
        const dropdowns = setupDropdowns();
        globalVariablesManager.setDropdowns(dropdowns);

        // Secondary dropdown is disabled for standard and custom graph types.
        if (
            globalVariablesManager.getGraphType() === GraphType.Standard ||
            globalVariablesManager.getGraphType() === GraphType.Custom
        ) {
            disableSecondaryGraphTypeDropdown();
        } else {
            enableSecondaryGraphTypeDropdown();
        }

        // Hide the previous button on the first page of the tutorial.
        if (globalVariablesManager.getTutorialPageNumber() === 1) {
            toggleTutorialButton('P', STATUS.HIDE);
        }

        // Generate the graphs and run results.
        resetGridAndRerun();

        if (!globalVariablesManager.getImagesLoaded()) {
            loadImages();
            globalVariablesManager.setImagesLoaded(true);
        } else {
            updateProgressBar(progressBar, loadingScreen);
        }
    };

    progressBar.style.width += `${PROGRESS_BAR_INCREMENT}%`;
    initializePage();
});
