import { DEFAULT_DELAY, highlightClasses } from '../common/constants';
import { AlgorithmType, HighlightType } from '../common/types';
import { delay } from './general';

/**
 * Highlights a node (cell) in the grid based on the specified type for a given algorithm.
 *
 * @param {string} nodeName - The name of the node (cell) to highlight.
 * @param {HighlightType} type - The type of highlight to apply.
 * @param {AlgorithmType} algorithm - The algorithm associated with the grid.
 * @param {number} [delayDuration] - Optional. The duration to delay before applying the highlight, in milliseconds.
 * @returns {Promise<void>} A promise that resolves once the cell is highlighted.
 */
export const highlightCell = async (
    nodeName: string,
    type: HighlightType,
    algorithm: AlgorithmType,
    delayDuration?: number,
): Promise<void> => {
    const cell = document.getElementById(`${algorithm}-cell-${nodeName}`);
    if (!cell) return;

    // Remove any existing highlights.
    Object.keys(HighlightType).forEach((hTypeKey) => {
        const hType = Number(hTypeKey) as HighlightType;
        cell.classList.remove(highlightClasses[hType]);
    });

    // Add the new highlight class.
    cell.classList.add(highlightClasses[type]);

    // If delayDuration is not provided, use the default delay.
    if (delayDuration == null) {
        delayDuration = DEFAULT_DELAY;
    }

    await delay(delayDuration);
};

/**
 * Clears highlighting of all grid cells associated with a particular algorithm.
 *
 * @param {number} size - The size of the grid.
 * @param {AlgorithmType} algorithm - The algorithm for which the grid cells are associated.
 * @returns {Promise<void>} A promise that resolves when all grid cells are cleared.
 */
export const clearHighlight = async (size: number, algorithm: AlgorithmType): Promise<void> => {
    // Retrieve the first cell associated with the algorithm.
    const cell = document.getElementById(`${algorithm}-cell-0`);

    // If the cell hasn't been colored yet (i.e., first render), return early.
    if (cell.classList.length === 1) {
        return;
    }

    // Loop through each cell and reset its highlighting to unvisited state.
    for (let i = 0; i < size; i++) {
        await highlightCell(i.toString(), HighlightType.Unvisited, algorithm, 0);
    }
};

/**
 * Displays the shortest path on the grid for a given algorithm by highlighting cells.
 *
 * @param {string[] | null} path - An array of node names representing the shortest path, or null if no path is found.
 * @param {AlgorithmType} algorithm - The algorithm associated with the grid.
 * @returns {Promise<void>} A promise that resolves once the shortest path is displayed.
 */
export const highlightShortestPath = async (path: string[] | null, algorithm: AlgorithmType) => {
    if (!path) return;

    for (const node of path) {
        await highlightCell(node, HighlightType.ShortestPath, algorithm);
    }
};
