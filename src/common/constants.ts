import { Color } from './types';

// Colors.
export const WHITE: Color = { r: 255, g: 255, b: 255 };
export const LIGHT_GRAY: Color = { r: 250, g: 250, b: 250 };
export const LIGHT_BLUE: Color = { r: 175, g: 216, b: 248 };
export const BLUE: Color = { r: 0, g: 0, b: 200 };
export const DARK_BLUE: Color = { r: 12, g: 53, b: 71 };

// Graph control properties.
export const MAX_WEIGHT: number = 125;
export const DEFAULT_DELAY: number = 1;
export const DEFAULT_WEIGHT: number = 100;
export const AVERAGE_SPEED: number = 100;
export const FAST_SPEED: number = 300;
export const SLOW_SPEED: number = 30;
export const SHORTEST_PATH_DELAY_MULTIPLIER = DEFAULT_DELAY;
export const DEBOUNCE_DELAY: number = 100;

// Tutorial properties.
export const TOTAL_TUTORIAL_PAGES: number = 11;

// Grid properities
export const GRID_WIDTH: number = 580;
export const DEFAULT_GRID_SIZE: number = 400;
export const DEFAULT_HEURISTIC_MULTIPLIER: number = 5;
export const MAX_HEURISTIC_MULTIPLIER: number = 100;

// Progress bar
export const DEFAULT_PROGRESS_BAR_WIDTH = '10%';
export const PROGRESS_BAR_INCREMENT = 5;

// Local storage
export const LOCAL_STORAGE_KEY = 'pathium-global-variables';
