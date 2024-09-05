import { CURSOR_STYLE, DISPLAY_STYLE, MAX_WEIGHT, STATUS } from '../common/constants';
import { AlgorithmType, NodeState } from '../common/types';
import { getColorByWeight } from './color';
import { resetGrid } from './display';
import { getNodeIdFromCellElementId } from './general';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { createMark } from './mark';

const globalVariablesManager = getGlobalVariablesManagerInstance();

export const toggleElement = (
    elements: HTMLInputElement[] | HTMLSelectElement[] | HTMLButtonElement[],
    enable: STATUS.ENABLE | STATUS.DISABLE,
) => {
    elements.forEach((element: HTMLInputElement | HTMLSelectElement | HTMLButtonElement) => {
        element.style.cursor =
            enable === STATUS.ENABLE ? CURSOR_STYLE.POINTER : CURSOR_STYLE.NOT_ALLOWED;
        element.disabled = enable === STATUS.DISABLE;
    });
};

export const toggleElementVisibility = (
    elements: HTMLInputElement[] | HTMLSelectElement[] | HTMLDivElement[] | HTMLButtonElement[],
    displaySyle: DISPLAY_STYLE,
) => {
    elements.forEach(
        (element: HTMLInputElement | HTMLSelectElement | HTMLDivElement | HTMLButtonElement) => {
            element.style.display = displaySyle;
        },
    );
};

export const setNewStartEndNode = (
    nodeState: NodeState,
    isEditor: boolean,
    toggleButtons: (nodeState: NodeState, toggle: STATUS.ENABLE | STATUS.DISABLE) => void,
    mouseDownCallback: () => void,
) => {
    if (globalVariablesManager.getIsChangingStartEndNode()) {
        globalVariablesManager.setIsChangingStartEndNode(false);
        if (isEditor) {
            resetGrid(AlgorithmType.Editor);
        } else {
            resetGrid();
        }
        toggleButtons(nodeState, STATUS.ENABLE);
        return;
    }

    // Disable the other buttons
    toggleButtons(nodeState, STATUS.DISABLE);

    globalVariablesManager.setIsChangingStartEndNode(true);

    for (const graphDiv of globalVariablesManager.getGraphDivs(isEditor)) {
        for (let i = 0; i < globalVariablesManager.getGridSize(); i++) {
            // When the user clicks the 'Change Start Node' button, all cells will
            // temporarily show the startNode image except the endNode and vice versa.
            if (
                i === globalVariablesManager.getEndNode() ||
                i === globalVariablesManager.getStartNode() ||
                globalVariablesManager.getGraph().nodes[i] === Infinity
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
                toggleButtons(nodeState, STATUS.ENABLE);

                mouseDownCallback();
                globalVariablesManager.setIsChangingStartEndNode(false);
            });
        }
    }
};

export const highlightButtonColor = (
    button: HTMLButtonElement,
    status: STATUS.ACTIVE | STATUS.INACTIVE,
) => {
    button.style.backgroundColor =
        status === STATUS.ACTIVE ? getColorByWeight(MAX_WEIGHT * 0.9) : '#fff';
    button.style.color = status === STATUS.ACTIVE ? '#fff' : '#666';
};
