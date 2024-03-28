import { Color, MarkType } from './types';

// RGB Color values.
export const BLUE: Color = { r: 0, g: 0, b: 200 };
export const YELLOW: Color = { r: 253, g: 238, b: 0 };
export const ORANGE: Color = { r: 255, g: 165, b: 0 };
export const RED: Color = { r: 224, g: 71, b: 76 };
export const WHITE: Color = { r: 240, g: 240, b: 240 };
export const GREEN: Color = { r: 28, g: 172, b: 120 };
export const GRAY: Color = { r: 44, g: 44, b: 44 };

export const getMarkFilters = (markType: MarkType) => {
    switch (markType) {
        case MarkType.ShortestPath:
            return 'invert(67%) sepia(59%) saturate(6047%) hue-rotate(126deg) brightness(96%) contrast(78%)';
        case MarkType.Visited:
            return 'invert(99%) sepia(63%) saturate(2988%) hue-rotate(349deg) brightness(94%) contrast(113%)';
        case MarkType.Visiting:
            return 'invert(72%) sepia(63%) saturate(3558%) hue-rotate(360deg) brightness(104%) contrast(106%)';
    }
};
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
export const START_NODE = () => Math.floor(Math.random() * GRID_SIZE);

/**
 * Index of the end node in the grid.
 * @type {number}
 */
export const END_NODE = () => Math.floor(Math.random() * GRID_SIZE);

/**
 * Maximum distance used in calculations.
 * @type {number}
 */
export const MAX_DISTANCE = 100;
