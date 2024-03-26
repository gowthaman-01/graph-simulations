import { HighlightType } from './types';

/**
 * Default delay in milliseconds for visualizations.
 * @type {number}
 */
export const DEFAULT_DELAY = 10;

/**
 * Number of rows in the grid.
 * @type {number}
 */
export const ROWS = 15;

/**
 * Number of columns in the grid.
 * @type {number}
 */
export const COLS = 15;

/**
 * Total number of cells in the grid.
 * @type {number}
 */
export const GRID_SIZE = ROWS * COLS;

/**
 * Index of the start node in the grid.
 * @type {number}
 */
export const START_NODE = 0;

/**
 * Index of the end node in the grid.
 * @type {number}
 */
export const END_NODE = 224;

/**
 * Maximum distance used in calculations.
 * @type {number}
 */
export const MAX_DISTANCE = 10;

/**
 * CSS classes used for different highlight types.
 * @type {Record<HighlightType, string>}
 */
export const highlightClasses = {
    [HighlightType.Unvisited]: 'unvisited',
    [HighlightType.Visiting]: 'visiting',
    [HighlightType.Visited]: 'visited',
    [HighlightType.ShortestPath]: 'shortest-path',
};

// RGB Color values.
export const TURQUOISE_COLOR = { r: 64, g: 224, b: 208 };
export const MAGENTA_COLOR = { r: 139, g: 0, b: 139 };
export const BLUE_COLOR = { r: 0, g: 0, b: 255 };
export const RED_COLOR = { r: 255, g: 0, b: 0 };
