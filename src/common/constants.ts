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
export const FAST_SPEED: number = 200;
export const SLOW_SPEED: number = 50;
export const SHORTEST_PATH_DELAY_MULTIPLIER = DEFAULT_DELAY;
export const DEBOUNCE_DELAY: number = 100;

// Tutorial properties.
export const TOTAL_TUTORIAL_PAGES: number = 10;

// Grid properities
export const GRID_WIDTH: number = 580;

export enum GRAPH_POSITION {
    LEFT = 'left',
    RIGHT = 'right',
    EDITOR = 'editor',
}

export enum DISPLAY_STYLE {
    FLEX = 'flex',
    NONE = 'none',
    BLOCK = 'block',
}

export enum CURSOR_STYLE {
    POINTER = 'pointer',
    NOT_ALLOWED = 'not-allowed',
}

export enum STATUS {
    ENABLE = 'ENABLE',
    DISABLE = 'DISABLE',
    SHOW = 'SHOW',
    HIDE = 'HIDE',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export enum EDITOR_MODE {
    ADD_WALLS = 'ADD_WALLS',
    SET_WEIGHT = 'SET_WEIGHT',
    CHANGE_START_NODE = 'CHANGE_START_NODE',
    CHANGE_END_NODE = 'CHANGE_END_NODE',
    CHANGE_GRID_SIZE = 'CHANGE_GRID_SIZE',
    RESET = 'RESET',
    BACK = 'BACK',
    NONE = 'NONE',
}
