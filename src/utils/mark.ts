import { AlgorithmType, NodeState } from '../common/types';

/**
 * Mark a node (cell) in the grid based on the specified nodeState.
 *
 * @param {string} nodeName - The name of the node (cell) to mark.
 * @param {NodeState} nodeState - The state of the node. (Visted / Unvisited etc.)
 * @param {AlgorithmType} algorithmType - The algorithm associated with the grid.
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

    // Set mark based on nodeState.
    const mark = document.createElement('img');
    mark.id = `${algorithmType}-cell-${nodeName}-${nodeState}`;
    setMarkImage(mark, nodeState);

    mark.classList.add('mark');
    cell.appendChild(mark);
    return cell;
};

/**
 * Adds the mark image to the node based on its state.
 *
 * @param {HTMLImageElement} mark - The cell <img> element to mark.
 * @param {NodeState} nodeState - The state of the node. (Visted / Unvisited etc.)
 * @param {number} opacity - Optional opacity value for the mark image.
 */
export const setMarkImage = (mark: HTMLImageElement, nodeState: NodeState) => {
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
};

/**
 * Clears the mark image from the cell.
 *
 * @param {HTMLElement} cell - The cell <img> element to mark.
 */
export const unmarkCell = (cell: HTMLElement) => {
    // Remove existing mark
    const childNodes = cell.childNodes;
    childNodes.forEach((childNode) => cell.removeChild(childNode));
};
