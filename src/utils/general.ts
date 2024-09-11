import { MAX_WEIGHT } from '../common/constants';
import {
    AlgorithmType,
    GraphType,
    HeuristicType,
    Node,
    SimulationSpeed,
    EnvironmentType,
} from '../common/types';
import { getColorByWeight } from './color';
import { getGlobalVariablesManagerInstance } from '../classes/GlobalVariablesManager';

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
 * Sets the weight color for the user interface (UI) based on the provided maximum weight.
 * This function calculates the weight color by taking 90% of the maximum weight and then
 * uses this value to determine the appropriate color. The calculated color is then applied
 * to the document's root element as a CSS variable, which can be used throughout the UI
 * to ensure consistent styling based on the weight.
 * @param {number} maxWeight - The maximum weight.
 */
export const setWeightColor = () => {
    // Default weight color is set to 90% of the maximum weight.
    const weightColor = getColorByWeight(MAX_WEIGHT * 0.9);
    document.documentElement.style.setProperty('--weight-color', weightColor);
};

/**
 * Calculates the Euclidean distance between two nodes in a grid.
 * @param {Node} startNode - The ID of the start node.
 * @param {Node} endNode - The ID of the end node.
 * @returns {number} The Euclidean distance between the two nodes.
 */
export const calculateEuclideanDistance = (startNode: Node, endNode: Node): number => {
    const { row: startRow, col: startCol } = getRowAndColumnFromCellId(startNode);
    const { row: endRow, col: endCol } = getRowAndColumnFromCellId(endNode);
    const dx = endRow - startRow;
    const dy = endCol - startCol;
    return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculates the Manhattan distance between two nodes in a grid.
 * @param {Node} startNode - The ID of the start node.
 * @param {Node} endNode - The ID of the end node.
 * @returns {number} The Manhattan distance between the two nodes.
 */
export const calculateManhattanDistance = (startNode: Node, endNode: Node): number => {
    const { row: startRow, col: startCol } = getRowAndColumnFromCellId(startNode);
    const { row: endRow, col: endCol } = getRowAndColumnFromCellId(endNode);
    return Math.abs(endRow - startRow) + Math.abs(endCol - startCol);
};

/**
 * Finds the row and column of a cell given its ID in a grid graph.
 * @param {Node} cellId - The ID of the cell.
 * @returns {object} An object containing the row and column of the cell.
 */
export const getRowAndColumnFromCellId = (cellId: Node): { row: number; col: number } => {
    const COLS = Math.sqrt(getGlobalVariablesManagerInstance().getGridSize());
    const row = Math.floor(cellId / COLS);
    const col = cellId % COLS;
    return { row, col };
};

/**
 * Finds the cell ID of a cell given its row and column in a grid graph.
 * @param {number} row - The row of the cell.
 * @param {number} col - The column of the cell.
 * @returns {Node} The ID of the cell.
 */
export const getCellIdFromRowAndColumn = (row: number, col: number): Node => {
    const COLS = Math.sqrt(getGlobalVariablesManagerInstance().getGridSize());
    return row * COLS + col;
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
 * Get the display name of the algorithm.
 * @param {AlgorithmType} algorithmType - The type of the algorithm.
 * @returns {string} The display name of the algorithm.
 */
export const getAlgorithmDisplayName = (algorithmType: AlgorithmType): string => {
    switch (algorithmType) {
        case AlgorithmType.BFS:
            return 'BFS';
        case AlgorithmType.DFS:
            return 'DFS';
        case AlgorithmType.Dijkstra:
            return 'Dijkstra';
        case AlgorithmType.BellmanFord:
            return 'Bellman-Ford';
        case AlgorithmType.AStar:
            return 'A* Search';
        case AlgorithmType.Greedy:
            return 'Greedy';
        default:
            return 'BFS';
    }
};

/**
 * Get the display name of the primary graph type.
 * @param {GraphType} graphType - The type of the graph.
 * @returns {string} The display name of the primary graph type.
 */
export const getPrimaryGraphTypeDisplayName = (graphType: GraphType): string => {
    switch (graphType) {
        case GraphType.Standard:
            return 'Standard';
        case GraphType.Custom:
            return 'Custom';
        case GraphType.DFS:
        case GraphType.RandomWalls:
        case GraphType.RecursiveDivision:
            return 'Maze';
        default:
            return 'Standard';
    }
};

/**
 * Get the display name of the secondary graph type.
 * @param {GraphType} graphType - The type of the graph.
 * @returns {string} The display name of the secondary graph type.
 */
export const getSecondaryGraphTypeDisplayName = (graphType: GraphType): string => {
    switch (graphType) {
        case GraphType.DFS:
            return 'DFS';
        case GraphType.RandomWalls:
            return 'Random Walls';
        case GraphType.RecursiveDivision:
            return 'Recursive Division';
        default:
            return 'Recursive Division';
    }
};

/**
 * Get the display name of the heuristic type.
 * @param {HeuristicType} heuristicType - The type of the heuristic.
 * @returns {string} The display name of the heuristic type.
 */
export const getHeuristicTypeDisplayName = (heuristicType: HeuristicType): string => {
    switch (heuristicType) {
        case HeuristicType.Manhattan:
            return 'Manhattan Distance';
        case HeuristicType.Euclidean:
            return 'Euclidean Distance';
        default:
            return 'Euclidean Distance';
    }
};

export const getWeightTypeDisplayName = (environmentType: EnvironmentType): string => {
    switch (environmentType) {
        case EnvironmentType.FlatTerrain:
            return 'Flat Terrain';
        case EnvironmentType.ElevatedTerrain:
            return 'Elevated Terrain';
        case EnvironmentType.RoadNetwork:
            return 'Road Network';
        default:
            return 'Flat Terrain';
    }
};

/**
 * Get the display name of the simulation speed.
 * @param {SimulationSpeed} simulationSpeed - The type of the simulation speed.
 * @returns {string} The display name of the simulation speed.
 */
export const getSimulationSpeedDisplayName = (simulationSpeed: SimulationSpeed): string => {
    switch (simulationSpeed) {
        case SimulationSpeed.Average:
            return 'Average';
        case SimulationSpeed.Fast:
            return 'Fast';
        case SimulationSpeed.Slow:
            return 'Slow';
        default:
            return 'Average';
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
            // Call the original function with the correct context and arguments
            func.apply(undefined, args);
        }, wait);
    };
};

/**
 * Shuffles an array of integers in place using the Fisher-Yates algorithm.
 * This function mutates the original array.
 *
 * @param {number[]} array - The array of integers to shuffle.
 * @returns {number[]} - The shuffled array.
 *
 * @example
 * const arr: number[] = [1, 2, 3, 4, 5];
 * const shuffledArr = shuffleArray(arr);
 * console.log(shuffledArr); // Output: A randomly shuffled version of the array
 */
export const shuffleArray = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
        [array[i], array[j]] = [array[j], array[i]]; // Swap the elements at indices i and j
    }
    return array;
};

/**
 * Updates the progress bar by incrementing its width from 0 to 100% and hides the loading screen.
 * @param {HTMLElement} progressBar - The progress bar element to update.
 * @param {HTMLElement} loadingScreen - The loading screen element to hide.
 * @returns {Promise<void>} - A promise that resolves when the progress bar is fully updated.
 */
export const updateProgressBarAndHideLoadingScreen = async (
    progressBar: HTMLElement,
    loadingScreen: HTMLElement,
): Promise<void> => {
    for (let i = 0; i <= 100; i += 10) {
        progressBar.style.width = `${i}%`;
        await delay(Math.floor(Math.random() * 20));
    }

    await delay(200);
    // Hide loading screen after initialization
    loadingScreen.style.display = 'none';
};

/**
 * Preloads a list of images by creating Image objects and setting their source to the provided URLs.
 * This function returns a promise that resolves when all images are successfully loaded,
 * or rejects if any image fails to load.
 *
 * @param {string[]} imageUrls - An array of image URLs to preload.
 * @returns {Promise<void[]>} A promise that resolves when all images are loaded, or rejects if any image fails to load.
 */
export const preloadImages = (imageUrls: string[]): Promise<void[]> => {
    return Promise.all(
        imageUrls.map((url) => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = () => reject();
            });
        }),
    );
};
