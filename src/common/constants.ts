import { Color } from './types';

// RGB Color values.
export const BLUE: Color = { r: 0, g: 0, b: 200 };
export const YELLOW: Color = { r: 253, g: 238, b: 0 };
export const ORANGE: Color = { r: 255, g: 165, b: 0 };
export const RED: Color = { r: 224, g: 71, b: 76 };
export const WHITE: Color = { r: 240, g: 240, b: 240 };
export const GREEN: Color = { r: 28, g: 172, b: 120 };
export const GRAY: Color = { r: 44, g: 44, b: 44 };

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
 * Maximum weight used in calculations.
 * @type {number}
 */
export const MAX_WEIGHT = 100;

/**
 * Maximum value for the weight slider.
 * @type {number}
 */
export const MAX_SLIDER = 200;
