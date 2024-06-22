import { AlgorithmType, NodeState } from '../common/types';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { getColorByWeight } from './color';

/**
 * Marks a node (cell) in the grid based on the specified nodeState.
 *
 * @param {string} nodeName - The name of the node (cell) to mark.
 * @param {NodeState} nodeState - The state of the node (e.g., Visiting, Unvisited).
 * @param {AlgorithmType} algorithmType - The algorithm associated with the grid.
 * @returns {HTMLElement | null} The marked cell element or null if not found.
 */
export const markCell = (
    nodeName: string,
    nodeState: NodeState,
    algorithmType: AlgorithmType,
): HTMLElement | null => {
    // Get cell HTML element.
    const cell = document.getElementById(`${algorithmType}-cell-${nodeName}`);

    if (!cell) return null;

    unmarkCell(cell);

    // Retrieve weight of cell.
    const nodes = getGlobalVariablesManagerInstance().getGraph().nodes;
    const weight = nodes[nodeName].weight;

    if (nodeState === NodeState.Visiting) {
        // Cells currently being visited will be highlighted yellow during the simulation.
        cell.style.background = '#f8f87c';
    } else {
        // Set cell background back to original color.
        cell.style.backgroundColor = getColorByWeight(weight);
    }

    const mark = createMark(algorithmType, nodeName, nodeState);

    cell.appendChild(mark);

    return cell;
};

/**
 * Creates an image element to mark a node in the grid based on the specified state.
 *
 * @param {AlgorithmType} algorithmType - The type of algorithm associated with the node.
 * @param {string} nodeName - The name of the node to mark.
 * @param {NodeState} nodeState - The state of the node (e.g., StartNode, EndNode, Visiting).
 * @returns {HTMLImageElement} The created image element to be used as a mark.
 */
export const createMark = (
    algorithmType: AlgorithmType,
    nodeName: string,
    nodeState: NodeState,
): HTMLImageElement => {
    const mark = document.createElement('img');
    mark.id = `${algorithmType}-cell-${nodeName}-${nodeState}`;
    mark.classList.add('mark');

    switch (nodeState) {
        case NodeState.StartNode:
        case NodeState.EndNode:
            mark.src = `./assets/${nodeState}.png`;
            mark.style.width = '90%';
            break;
        case NodeState.Unvisited:
            break;
        default:
            mark.src = `./assets/${nodeState}.svg`;
            mark.style.width = '60%';
            mark.style.opacity = '0.7';
            break;
    }

    return mark;
};

/**
 * Clears the mark image from the cell.
 *
 * @param {HTMLElement} cell - The cell <img> element to mark.
 */
export const unmarkCell = (cell: HTMLElement) => {
    const childNodes = cell.childNodes;
    childNodes.forEach((childNode) => cell.removeChild(childNode));
};
