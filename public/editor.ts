import { DISPLAY_STYLE, EDITOR_MODE, GRAPH_POSITION, STATUS } from '../src/common/constants';
import { AlgorithmType, GraphDiv, GraphType, NodeState } from '../src/common/types';
import { getGlobalVariablesManagerInstance } from '../src/utils/GlobalVariablesManager';
import { displayGrid } from '../src/utils/display';
import { highlightButtonColor, setNewStartEndNode } from '../src/utils/element';
import { getNodeIdFromCellElementId, setWeightColor } from '../src/utils/general';
import { markCell } from '../src/utils/mark';
import { toggleElement } from '../src/utils/element';
import { MAX_WEIGHT } from '../src/common/constants';
import { CustomDropdown } from '../src/utils/CustomDropdown';
import { generateNewGraph, generateNewGraphWithReachableEndNode } from '../src/utils/graph';

document.addEventListener('DOMContentLoaded', async () => {
    const graphEditorElement = document.getElementById('graphEditor') as HTMLDivElement;
    const addWallsButton = document.getElementById('addWallsButton') as HTMLButtonElement;
    const editWeightsButton = document.getElementById('editWeightsButton') as HTMLButtonElement;
    const changeStartNodeButton = document.getElementById('changeStartButton') as HTMLButtonElement;
    const changeEndNodeButton = document.getElementById('changeEndButton') as HTMLButtonElement;
    const clearCellButton = document.getElementById('clearCellButton') as HTMLButtonElement;
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
        !addWallsButton ||
        !editWeightsButton ||
        !changeStartNodeButton ||
        !changeEndNodeButton ||
        !clearCellButton ||
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
        editWeightsButton,
        changeStartNodeButton,
        changeEndNodeButton,
        clearCellButton,
        resetGraphButton,
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
            displayGrid(graphEditorDiv);
        },
    );

    const graphEditorDiv: GraphDiv = {
        graphDivElement: graphEditorElement,
        position: GRAPH_POSITION.EDITOR,
        algorithmType: AlgorithmType.Editor,
    };

    globalVariablesManager.setEditorGraphDiv(graphEditorDiv);

    const isEditor = true;
    let editorMode = EDITOR_MODE.NONE;

    displayGrid(graphEditorDiv);

    setWeightColor();

    // Helper functions.
    const updateGraphEditorDescription = (mode: EDITOR_MODE = editorMode) => {
        switch (mode) {
            case EDITOR_MODE.ADD_WALLS:
                graphEditorDescription.innerHTML =
                    'Click or drag on the grid to place walls that act as obstacles';
                break;
            case EDITOR_MODE.EDIT_WEIGHTS:
                graphEditorDescription.innerHTML =
                    'Click or drag on grid cells to increase their weight, making paths harder to traverse';
                break;
            case EDITOR_MODE.CLEAR_CELL:
                graphEditorDescription.innerHTML =
                    'Click or drag on the grid to remove walls or reset cell weights';
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
                graphEditorDescription.innerHTML = 'Clear the entire grid and start over';
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
            case EDITOR_MODE.EDIT_WEIGHTS:
                highlightButtonColor(editWeightsButton, STATUS.ACTIVE);
                break;
            case EDITOR_MODE.CLEAR_CELL:
                highlightButtonColor(clearCellButton, STATUS.ACTIVE);
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

    const addWall = (nodeId: number) => {
        if (
            nodeId === globalVariablesManager.getStartNode() ||
            nodeId === globalVariablesManager.getEndNode()
        ) {
            return;
        }
        const nodes = globalVariablesManager.getGraph().nodes;
        nodes[nodeId] = Infinity;
        markCell(nodeId, NodeState.Unvisited, GRAPH_POSITION.EDITOR);
        globalVariablesManager.setNodes(nodes);
    };

    const clearCell = (nodeId: number) => {
        if (
            nodeId === globalVariablesManager.getStartNode() ||
            nodeId === globalVariablesManager.getEndNode()
        ) {
            return;
        }
        const nodes = globalVariablesManager.getGraph().nodes;
        nodes[nodeId] = 0;
        markCell(nodeId, NodeState.Unvisited, GRAPH_POSITION.EDITOR);
        globalVariablesManager.setNodes(nodes);
    };

    const incrementWeight = (nodeId: number) => {
        const nodes = globalVariablesManager.getGraph().nodes;
        if (
            nodeId === globalVariablesManager.getStartNode() ||
            nodeId === globalVariablesManager.getEndNode() ||
            nodes[nodeId] === Infinity
        ) {
            return;
        }
        let weight = nodes[nodeId];
        weight += Math.floor(Math.random() * 20);
        nodes[nodeId] = weight >= MAX_WEIGHT ? Infinity : weight;
        markCell(nodeId, NodeState.Unvisited, GRAPH_POSITION.EDITOR);
        globalVariablesManager.setNodes(nodes);
    };

    // Event handlers
    const handleButtonClick = (mode: EDITOR_MODE) => {
        editorMode = mode;
        displayGrid(graphEditorDiv);
        updateButtons();
        updateGraphEditorDescription();
    };

    const handleAddWallsButton = () => handleButtonClick(EDITOR_MODE.ADD_WALLS);

    const handleEditWeightsButton = () => handleButtonClick(EDITOR_MODE.EDIT_WEIGHTS);

    const handleClearCellButton = () => handleButtonClick(EDITOR_MODE.CLEAR_CELL);

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
        setNewStartEndNode(nodeState, isEditor, toggleButtonsDuringStartEndNodeChange, () => {
            displayGrid(graphEditorDiv);
        });
        updateButtons();
        updateGraphEditorDescription();
    };

    const handleBackButton = () => {
        globalVariablesManager.setCustomGraph(globalVariablesManager.getGraph());
        globalVariablesManager.setGraphType(GraphType.Custom);
        globalVariablesManager.saveToLocalStorage();
        window.location.href = 'index.html';
    };

    // Event listeners
    const buttonEventHandlers = [
        { button: addWallsButton, mode: EDITOR_MODE.ADD_WALLS, clickHandler: handleAddWallsButton },
        {
            button: editWeightsButton,
            mode: EDITOR_MODE.EDIT_WEIGHTS,
            clickHandler: handleEditWeightsButton,
        },
        {
            button: clearCellButton,
            mode: EDITOR_MODE.CLEAR_CELL,
            clickHandler: handleClearCellButton,
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
        { button: saveButton, mode: EDITOR_MODE.BACK, clickHandler: handleBackButton },
    ];

    buttonEventHandlers.forEach(({ button, mode, clickHandler }) => {
        if (clickHandler) {
            button.addEventListener('click', clickHandler);
        }
        button.addEventListener('mouseover', () => updateGraphEditorDescription(mode));
        button.addEventListener('mouseleave', () => updateGraphEditorDescription());
    });

    graphEditorElement.addEventListener('mousedown', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('grid-cell') || target.classList.contains('weight-display')) {
            const nodeId = getNodeIdFromCellElementId(target.id);
            switch (editorMode) {
                case EDITOR_MODE.ADD_WALLS:
                    addWall(nodeId);
                    break;
                case EDITOR_MODE.EDIT_WEIGHTS:
                    incrementWeight(nodeId);
                    break;
                case EDITOR_MODE.CLEAR_CELL:
                    clearCell(nodeId);
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

                switch (editorMode) {
                    case EDITOR_MODE.ADD_WALLS:
                        addWall(nodeId);
                        break;
                    case EDITOR_MODE.EDIT_WEIGHTS:
                        incrementWeight(nodeId);
                        break;
                    case EDITOR_MODE.CLEAR_CELL:
                        clearCell(nodeId);
                        break;
                }
            }
        }
    });
});
