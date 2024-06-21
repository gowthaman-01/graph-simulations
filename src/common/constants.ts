import { Color } from './types';

// RGB Color values.
export const WHITE: Color = { r: 255, g: 255, b: 255 };
export const LIGHT_GRAY: Color = { r: 250, g: 250, b: 250 };
export const LIGHT_BLUE: Color = { r: 175, g: 216, b: 248 };
export const BLUE: Color = { r: 0, g: 0, b: 200 };
export const DARK_BLUE: Color = { r: 12, g: 53, b: 71 };

/**
 * Default delay in milliseconds for visualizations.
 * @type {number}
 */
export const DEFAULT_DELAY = 1;

export const DEFAULT_STEP_INCREMENT = 20;

/**
 * Number of rows in the grid.
 * @type {number}
 */
export const ROWS = 20;

/**
 * Number of columns in the grid.
 * @type {number}
 */
export const COLS = 20;

/**
 * Total number of cells in the grid.
 * @type {number}
 */
export const GRID_SIZE = ROWS * COLS;

/**
 * Maximum weight used in calculations.
 * @type {number}
 */
export const MAX_WEIGHT = 100;

/**
 * Maximum value for the weight slider.
 * @type {number}
 */
export const MAX_SLIDER = 200;
