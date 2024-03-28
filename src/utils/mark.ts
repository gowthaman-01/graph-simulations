import { DEFAULT_DELAY, getMarkFilters } from '../common/constants';
import { AlgorithmType, MarkType } from '../common/types';
import { delay } from './general';

/**
 * Mark a node (cell) in the grid based on the specified type for a given algorithm.
 *
 * @param {string} nodeName - The name of the node (cell) to mark.
 * @param {MarkType} markType - The type of mark to apply.
 * @param {AlgorithmType} algorithm - The algorithm associated with the grid.
 * @param {number} [delayDuration] - Optional. The duration to delay before applying the mark, in milliseconds.
 * @returns {Promise<void>} A promise that resolves once the cell is mark.
 */
export const markCell = async (
    nodeName: string,
    markType: MarkType,
    algorithm: AlgorithmType,
    delayDuration?: number,
): Promise<void> => {
    const cell = document.getElementById(`${algorithm}-cell-${nodeName}`);
    if (!cell) return;

    unmarkCell(nodeName, algorithm);

    const mark = document.createElement('img');
    mark.id = `${algorithm}-cell-${nodeName}-mark`;
    mark.src = `./assets/${markType}.svg`;
    mark.style.width = '60%';
    mark.style.opacity = '0.55';
    mark.classList.add('mark');
    // mark.style.filter = getMarkFilters(markType);

    cell.appendChild(mark);

    // If delayDuration is not provided, use the default delay.
    if (delayDuration == null) {
        delayDuration = DEFAULT_DELAY;
    }

    await delay(delayDuration);
};

export const unmarkCell = async (nodeName: string, algorithm: AlgorithmType): Promise<void> => {
    const cell = document.getElementById(`${algorithm}-cell-${nodeName}`);
    const existingMark = document.getElementById(`${algorithm}-cell-${nodeName}-mark`);
    if (existingMark) {
        cell.removeChild(existingMark);
    }
};
