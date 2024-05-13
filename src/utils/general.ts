import { COLS, MAX_SLIDER, MAX_WEIGHT } from '../common/constants';

/**
 * Delays execution for a specified duration.
 * @param ms Optional. The number of milliseconds to delay execution. If not provided, defaults to 0.
 * @returns A promise that resolves after the specified delay.
 */
export const delay = (ms: number = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a random weight between 0 and maxWeight.
 * @param maxWeight The maximum weight allowed.
 * @returns A random weight value.
 */
export const randomWeight = (maxWeight: number) => {
    return Math.floor(Math.exp(Math.random() * Math.log(maxWeight)));
};

/**
 * Calculates the maximum weight based on the value of the weight slider.
 * @param weightSliderValue The value of the weight slider as a string.
 * @returns The maximum weight based on the slider value.
 */
export const getMaxWeight = (weightSliderValue: string) => {
    return (Math.floor(parseInt(weightSliderValue)) / MAX_SLIDER) * MAX_WEIGHT;
};

export const calculateEuclideanDistance = (startNode: string, endNode: string): number => {
    const { row: startRow, col: startCol } = findRowAndColumn(startNode);
    const { row: endRow, col: endCol } = findRowAndColumn(endNode);
    const dx = endRow - startRow;
    const dy = endCol - startCol;
    return Math.sqrt(dx * dx + dy * dy);
};

export const calculateManhattanDistance = (startNode: string, endNode: string): number => {
    const { row: startRow, col: startCol } = findRowAndColumn(startNode);
    const { row: endRow, col: endCol } = findRowAndColumn(endNode);
    return Math.abs(endRow - startRow) + Math.abs(endCol - startCol);
};

/**
 * Finds the row and column of a cell given its ID in a grid graph.
 * @param cellId The ID of the cell.
 * @returns An object containing the row and column of the cell.
 */
const findRowAndColumn = (cellId: string): { row: number; col: number } => {
    const numericId = parseInt(cellId);
    const row = Math.floor(numericId / COLS);
    const col = numericId % COLS;
    return { row, col };
};
