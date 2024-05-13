import { AlgorithmType, NodeState } from '../common/types';

/**
 * Mark a node (cell) in the grid based on the specified type for a given algorithm.
 *
 * @param {string} nodeName - The name of the node (cell) to mark.
 * @param {NodeType} nodeState - The state of the node. (Visted / Unvisited etc.)
 * @param {AlgorithmType} algorithmType - The algorithm associated with the grid.
 */
export const markCell = (
    nodeName: string,
    nodeState: NodeState,
    algorithmType: AlgorithmType,
): void => {
    // Get cell HTML element.
    const cell = document.getElementById(`${algorithmType}-cell-${nodeName}`);
    if (!cell) return;

    // Remove existing mark
    const existingMark = document.getElementById(`${algorithmType}-cell-${nodeName}-mark`);
    if (existingMark) {
        cell.removeChild(existingMark);
    }

    // Set mark based on nodeState.
    const mark = document.createElement('img');
    mark.id = `${algorithmType}-cell-${nodeName}-mark`;
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
            mark.style.opacity = '0.55';
            break;
    }

    mark.classList.add('mark');
    cell.appendChild(mark);
};
