import { COLS, MAX_SLIDER, MAX_WEIGHT } from '../common/constants';
import { AlgorithmType } from '../common/types';

/**
 * Delays execution for a specified duration.
 * @param {number} [ms=0] - The number of milliseconds to delay execution.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export const delay = (ms: number = 0): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a random weight between 0 and the provided maximum weight.
 *
 * Utilizes a logarithmic distribution to generate weights, favoring lighter cells.
 * A linear distribution often results in too many dark cells, clumping together
 * and creating a visually cluttered, hard-to-read graph.
 *
 * By skewing towards lighter values, this method ensures better visibility and
 * easier interpretation of the graph.
 *
 * @param {number} maxWeight - The maximum weight allowed.
 * @returns {number} A random weight value.
 */
export const randomWeight = (maxWeight: number): number => {
    return Math.floor(Math.exp(Math.random() * Math.log(maxWeight)));
};

/**
 * Calculates the maximum weight based on the value of the weight slider.
 *
 * This function uses a non-linear transformation of the slider value to determine
 * the maximum weight. The non-linear transformation is used to create more isolated
 * dark cells in the graph, enhancing contrast and making the graph visually more
 * distinct and easier to interpret.
 *
 * @param {string} weightSliderValue - The value of the weight slider.
 * @returns {number} The maximum weight based on the slider value.
 */
export const getMaxWeight = (weightSliderValue: string): number => {
    return (Math.floor(Math.pow(parseInt(weightSliderValue), 1.2)) / MAX_SLIDER) * MAX_WEIGHT;
};

/**
 * Calculates the Euclidean distance between two nodes in a grid.
 * @param {string} startNode - The ID of the start node.
 * @param {string} endNode - The ID of the end node.
 * @returns {number} The Euclidean distance between the two nodes.
 */
export const calculateEuclideanDistance = (startNode: string, endNode: string): number => {
    const { row: startRow, col: startCol } = getRowAndColumnFromCellId(startNode);
    const { row: endRow, col: endCol } = getRowAndColumnFromCellId(endNode);
    const dx = endRow - startRow;
    const dy = endCol - startCol;
    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculates the Manhattan distance between two nodes in a grid.
 * @param {string} startNode - The ID of the start node.
 * @param {string} endNode - The ID of the end node.
 * @returns {number} The Manhattan distance between the two nodes.
 */
export const calculateManhattanDistance = (startNode: string, endNode: string): number => {
    const { row: startRow, col: startCol } = getRowAndColumnFromCellId(startNode);
    const { row: endRow, col: endCol } = getRowAndColumnFromCellId(endNode);
    return Math.abs(endRow - startRow) + Math.abs(endCol - startCol);
};

/**
 * Finds the row and column of a cell given its ID in a grid graph.
 * @param {string} cellId - The ID of the cell.
 * @returns {object} An object containing the row and column of the cell.
 */
const getRowAndColumnFromCellId = (cellId: string): { row: number; col: number } => {
    const numericCellId = parseInt(cellId);
    const row = Math.floor(numericCellId / COLS);
    const col = numericCellId % COLS;
    return { row, col };
};

/**
 * Finds the cell ID of a cell given its row and column in a grid graph.
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 * @returns {string} The cell ID as a string.
 */
export const getCellIdFromRowAndColumn = (row: number, col: number): string => {
    return (row * COLS + col).toString();
};

/**
 * Extracts the node ID from a cell element ID. Eg: 'aStar-cell-260' -> '260'.
 * @param {string} cellElementId - The ID of the cell element.
 * @returns {number} The node ID.
 */
export const getNodeIdFromCellElementId = (cellElementId: string): number => {
    return parseInt(cellElementId.split('-')[2]);
};

/**
 * Get the display name of the algorithm based on its type.
 * @param {AlgorithmType} algorithmType - The type of the algorithm.
 * @returns {string} The display name of the algorithm.
 */
export const getAlgorithmDisplayName = (algorithmType: AlgorithmType): string => {
    switch (algorithmType) {
        case AlgorithmType.Bfs:
            return 'BFS';
        case AlgorithmType.Dijkstra:
            return 'Dijkstra';
        case AlgorithmType.BellmanFord:
            return 'Bellman-Ford';
        case AlgorithmType.AStar:
            return 'A* Search';
        default:
            return '';
    }
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - Returns the new debounced function.
 */
export const debounce = <T extends (...args: any[]) => void>(
    func: T,
    wait: number,
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout | undefined; // This will keep track of the timeout ID

    // This is the debounced function that will be returned
    return (...args: Parameters<T>) => {
        // Clear any existing timeout to reset the wait period
        if (timeout) {
            clearTimeout(timeout);
        }

        // Set a new timeout
        timeout = setTimeout(() => {
            func.apply(undefined, args); // Call the original function with the correct context and arguments
        }, wait);
    };
};
