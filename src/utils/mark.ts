import { getMarkFilters } from '../common/constants';
import { AlgorithmType, NodeState } from '../common/types';
import { delay } from './general';

/**
 * Mark a node (cell) in the grid based on the specified type for a given algorithm.
 *
 * @param {string} nodeName - The name of the node (cell) to mark.
 * @param {NodeType} nodeType - The type of mark to apply.
 * @param {AlgorithmType} algorithm - The algorithm associated with the grid.
 * @param {number} [delayDuration] - Optional. The duration to delay before applying the mark, in milliseconds.
 * @returns {void} A promise that resolves once the cell is mark.
 */
export const markCell = (
    nodeName: string,
    nodeState: NodeState,
    algorithmType: AlgorithmType,
): void => {
    const cell = document.getElementById(`${algorithmType}-cell-${nodeName}`);
    if (!cell) return;

    unmarkCell(nodeName, algorithmType);

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
    // mark.style.filter = getMarkFilters(markType);

    cell.appendChild(mark);
};

export const unmarkCell = (nodeName: string, algorithmType: AlgorithmType): void => {
    const cell = document.getElementById(`${algorithmType}-cell-${nodeName}`);
    const existingMark = document.getElementById(`${algorithmType}-cell-${nodeName}-mark`);
    if (existingMark) {
        cell.removeChild(existingMark);
    }
};
