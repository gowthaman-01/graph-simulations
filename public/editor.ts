import { DISPLAY_STYLE, EDITOR_MODE, GRAPH_POSITION, STATUS } from '../src/common/constants';
import { AlgorithmType, GraphDiv, GraphType, NodeState, WeightType } from '../src/common/types';
import { getGlobalVariablesManagerInstance } from '../src/utils/GlobalVariablesManager';
import { displayGrid } from '../src/utils/display';
import {
    highlightButtonColor,
    setNewStartEndNode,
    toggleElementVisibility,
} from '../src/utils/element';
import { getNodeIdFromCellElementId, setWeightColor } from '../src/utils/general';
import { markCell } from '../src/utils/mark';
import { toggleElement } from '../src/utils/element';
import { CustomDropdown } from '../src/utils/CustomDropdown';
import { generateNewGraph } from '../src/utils/graph';

document.addEventListener('DOMContentLoaded', async () => {
    const graphEditorElement = document.getElementById('graphEditor') as HTMLDivElement;
    const buttonContainer = document.getElementById('buttonContainer') as HTMLDivElement;
    const addWallsButton = document.getElementById('addWallsButton') as HTMLButtonElement;
    const weightSlider = document.getElementById('weightSlider') as HTMLInputElement;
    const weightSliderContainer = document.getElementById(
        'weightSliderContainer',
    ) as HTMLDivElement;
    const weightSliderValue = document.getElementById('weightSliderValue') as HTMLParagraphElement;
    const doneButton = document.getElementById('doneButton') as HTMLButtonElement;
    const changeStartNodeButton = document.getElementById('changeStartButton') as HTMLButtonElement;
    const changeEndNodeButton = document.getElementById('changeEndButton') as HTMLButtonElement;
    const setWeightButton = document.getElementById('setWeightButton') as HTMLButtonElement;
    const resetGraphButton = document.getElementById('resetGraphButton') as HTMLButtonElement;
    const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
    const gridSizeDropdownButton = document.getElementById(
        'gridSizeDropdownButton',
    ) as HTMLButtonElement;
    const gridSizeDropdownMenu = document.getElementById('gridSizeDropdownMenu') as HTMLDivElement;
    const editorButtonsContainer = document.getElementById(
        'editorButtonsContainer',
    ) as HTMLDivElement;
    const graphEditorDescription = document.getElementById(
        'graphEditorDescription',
    ) as HTMLParagraphElement;

    if (
        !graphEditorDescription ||
        !graphEditorElement ||
        !buttonContainer ||
        !addWallsButton ||
        !weightSlider ||
        !weightSliderContainer ||
        !weightSliderValue ||
        !doneButton ||
        !changeStartNodeButton ||
        !changeEndNodeButton ||
        !setWeightButton ||
        !resetGraphButton ||
        !saveButton ||
        !gridSizeDropdownButton ||
        !gridSizeDropdownMenu ||
        !editorButtonsContainer
    ) {
        return;
    }

    const buttons = [
        addWallsButton,
        changeStartNodeButton,
        changeEndNodeButton,
        setWeightButton,
        resetGraphButton,
        doneButton,
        saveButton,
        gridSizeDropdownButton,
    ];

    const globalVariablesManager = getGlobalVariablesManagerInstance();

    const getGridSizeDisplayName = (gridSize: number): string => {
        return `${Math.sqrt(gridSize)} x ${Math.sqrt(gridSize)}`;
    };

    new CustomDropdown(
        gridSizeDropdownButton,
        gridSizeDropdownMenu,
        getGridSizeDisplayName(globalVariablesManager.getGridSize()),
        (dataValue) => {
            globalVariablesManager.setGridSize(parseInt(dataValue));
            generateNewGraph();
            resetGrid();
        },
    );

    const graphEditorDiv: GraphDiv = {
        graphDivElement: graphEditorElement,
        position: GRAPH_POSITION.EDITOR,
        algorithmType: AlgorithmType.Editor,
    };

    globalVariablesManager.setEditorGraphDiv(graphEditorDiv);

    const isEditor = true;
    let selectedNodeId: number | null = null;
    let editorMode = EDITOR_MODE.NONE;

    const resetGrid = () => {
        if (editorMode === EDITOR_MODE.SET_WEIGHT) {
            globalVariablesManager.setShowWeights(true);
        } else {
            globalVariablesManager.setShowWeights(false);
        }
        displayGrid(graphEditorDiv);
    };

    resetGrid();
    setWeightColor();

    // Helper functions.
    const updateGraphEditorDescription = (mode: EDITOR_MODE = editorMode) => {
        switch (mode) {
            case EDITOR_MODE.ADD_WALLS:
                graphEditorDescription.innerHTML =
                    'Click or drag on the grid to place walls that act as obstacles';
                break;
            case EDITOR_MODE.SET_WEIGHT:
                graphEditorDescription.innerHTML =
                    'Adjust the slider to set the desired weight, then click or drag on the grid to apply it';
                break;
            case EDITOR_MODE.CHANGE_START_NODE:
                graphEditorDescription.innerHTML =
                    'Click on any cell to set it as the new starting point';
                break;
            case EDITOR_MODE.CHANGE_END_NODE:
                graphEditorDescription.innerHTML =
                    'Click on any cell to set it as the new destination';
                break;
            case EDITOR_MODE.CHANGE_GRID_SIZE:
                graphEditorDescription.innerHTML =
                    'Modify the size of the grid by clicking on the dropdown menu and selecting a new size';
                break;
            case EDITOR_MODE.RESET:
                graphEditorDescription.innerHTML =
                    'Clear the entire grid and start over - this action cannot be undone!';
                break;
            case EDITOR_MODE.BACK:
                graphEditorDescription.innerHTML =
                    'Save your changes and return to the simulation view';
                break;
            case EDITOR_MODE.NONE:
                graphEditorDescription.innerHTML =
                    'Hover over any button for a description of its functionality';
                break;
        }
    };

    const updateButtons = () => {
        buttons.forEach((button) => {
            highlightButtonColor(button, STATUS.INACTIVE);
        });

        switch (editorMode) {
            case EDITOR_MODE.ADD_WALLS:
                highlightButtonColor(addWallsButton, STATUS.ACTIVE);
                break;
            case EDITOR_MODE.SET_WEIGHT:
                highlightButtonColor(setWeightButton, STATUS.ACTIVE);
                break;
            default:
                break;
        }
    };

    const toggleButtons = (toggle: STATUS.DISABLE | STATUS.ENABLE) => {
        buttons.forEach((button) => {
            toggleElement([button], toggle);
        });
    };

    const toggleButtonsDuringStartEndNodeChange = (
        nodeState: NodeState,
        toggle: STATUS.DISABLE | STATUS.ENABLE,
    ) => {
        toggleButtons(toggle);

        if (toggle === STATUS.DISABLE) {
            toggleElement(
                [nodeState === NodeState.StartNode ? changeStartNodeButton : changeEndNodeButton],
                STATUS.ENABLE,
            );
        } else {
            editorMode = EDITOR_MODE.NONE;
            updateGraphEditorDescription();
        }
    };

    const setSelectedNodeId = (nodeId: number) => {
        if (
            nodeId === globalVariablesManager.getStartNode() ||
            nodeId === globalVariablesManager.getEndNode()
        ) {
            selectedNodeId = null;
        } else {
            selectedNodeId = nodeId;
        }
    };

    const setWeight = (weight: number) => {
        if (selectedNodeId !== null) {
            const nodes = globalVariablesManager.getGraph().nodes;
            nodes[selectedNodeId] = weight;
            markCell(selectedNodeId, NodeState.Unvisited, GRAPH_POSITION.EDITOR);
            globalVariablesManager.setNodes(nodes);
        }
    };

    const showWeightSlider = (nodeId: number | null) => {
        if (nodeId) {
            weightSlider.value = globalVariablesManager.getGraph().nodes[nodeId].toString();
        }
        toggleElementVisibility([weightSliderContainer], DISPLAY_STYLE.FLEX);
        toggleElementVisibility([buttonContainer], DISPLAY_STYLE.NONE);
    };

    const hideWeightSlider = () => {
        toggleElementVisibility([weightSliderContainer], DISPLAY_STYLE.NONE);
        toggleElementVisibility([buttonContainer], DISPLAY_STYLE.FLEX);
    };

    // Event handlers
    const handleButtonClick = (mode: EDITOR_MODE) => {
        editorMode = mode;
        updateButtons();
        updateGraphEditorDescription();
        resetGrid();
    };

    const handleAddWallsButton = () => handleButtonClick(EDITOR_MODE.ADD_WALLS);

    const handleSetWeightButton = () => {
        showWeightSlider(selectedNodeId);
        handleButtonClick(EDITOR_MODE.SET_WEIGHT);
    };

    const handleResetGraphButton = () => {
        const newNodes = Array(globalVariablesManager.getGridSize()).fill(0);
        globalVariablesManager.setNodes(newNodes);
        handleButtonClick(EDITOR_MODE.RESET);
    };

    const handleChangeStartEndNodeButton = (nodeState: NodeState) => {
        editorMode =
            nodeState === NodeState.StartNode
                ? EDITOR_MODE.CHANGE_START_NODE
                : EDITOR_MODE.CHANGE_END_NODE;
        setNewStartEndNode(nodeState, isEditor, toggleButtonsDuringStartEndNodeChange, resetGrid);
        updateButtons();
        updateGraphEditorDescription();
    };

    const handleDoneButton = () => {
        handleButtonClick(EDITOR_MODE.NONE);
        hideWeightSlider();
    };

    const handleBackButton = () => {
        globalVariablesManager.setCustomGraph(globalVariablesManager.getGraph());
        globalVariablesManager.setGraphType(GraphType.Custom);
        if (globalVariablesManager.getWeightType() === WeightType.Negative) {
            globalVariablesManager.setWeightType(WeightType.NonNegative);
        }
        globalVariablesManager.saveToLocalStorage();
        window.location.href = 'index.html';
    };

    // Event listeners
    const buttonEventHandlers = [
        { button: addWallsButton, mode: EDITOR_MODE.ADD_WALLS, clickHandler: handleAddWallsButton },
        {
            button: setWeightButton,
            mode: EDITOR_MODE.SET_WEIGHT,
            clickHandler: handleSetWeightButton,
        },
        { button: resetGraphButton, mode: EDITOR_MODE.RESET, clickHandler: handleResetGraphButton },
        {
            button: changeStartNodeButton,
            mode: EDITOR_MODE.CHANGE_START_NODE,
            clickHandler: () => handleChangeStartEndNodeButton(NodeState.StartNode),
        },
        {
            button: changeEndNodeButton,
            mode: EDITOR_MODE.CHANGE_END_NODE,
            clickHandler: () => handleChangeStartEndNodeButton(NodeState.EndNode),
        },
        { button: gridSizeDropdownButton, mode: EDITOR_MODE.CHANGE_GRID_SIZE },
        { button: gridSizeDropdownMenu, mode: EDITOR_MODE.CHANGE_GRID_SIZE },
        { button: doneButton, mode: EDITOR_MODE.NONE, clickHandler: handleDoneButton },
        { button: saveButton, mode: EDITOR_MODE.BACK, clickHandler: handleBackButton },
    ];

    buttonEventHandlers.forEach(({ button, mode, clickHandler }) => {
        if (clickHandler) {
            button.addEventListener('click', clickHandler);
        }
        button.addEventListener('mouseover', () => updateGraphEditorDescription(mode));
        button.addEventListener('mouseleave', () => updateGraphEditorDescription());
    });

    weightSlider.addEventListener('input', () => {
        setWeight(parseInt(weightSlider.value));
        weightSliderValue.innerHTML = `Weight: ${weightSlider.value}`;
    });

    graphEditorElement.addEventListener('mousedown', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('grid-cell') || target.classList.contains('weight-display')) {
            const nodeId = getNodeIdFromCellElementId(target.id);
            setSelectedNodeId(nodeId);
            switch (editorMode) {
                case EDITOR_MODE.ADD_WALLS:
                    setWeight(Infinity);
                    break;
                case EDITOR_MODE.SET_WEIGHT:
                    setWeight(parseInt(weightSlider.value));
                    break;
            }
        }
    });

    graphEditorElement.addEventListener('mouseover', (event) => {
        // When the user is dragging the mouse, we want to handle the mouseover event
        if (event.buttons === 1) {
            const target = event.target as HTMLElement;
            if (
                target.classList.contains('grid-cell') ||
                target.classList.contains('weight-display')
            ) {
                const nodeId = getNodeIdFromCellElementId(target.id);
                setSelectedNodeId(nodeId);
                switch (editorMode) {
                    case EDITOR_MODE.ADD_WALLS:
                        setWeight(Infinity);
                        break;
                    case EDITOR_MODE.SET_WEIGHT:
                        setWeight(parseInt(weightSlider.value));
                        break;
                }
            }
        }
    });
});
