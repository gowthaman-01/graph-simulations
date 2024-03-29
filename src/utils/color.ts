import { BLUE, MAX_DISTANCE, WHITE } from '../common/constants';
import { Color } from '../common/types';

/**
 * Calculates and returns a color based on a given distance.
 * The color is interpolated between turquoise and magenta based on the normalized distance.
 *
 * @param {number} distance - The distance value used to determine the color.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
export const getColorByDistance = (distance: number): string => {
    // Normalize distance to a scale of 0.1 to 1
    const normalizedDistance = (distance / MAX_DISTANCE) * (1 - 0.1) + 0.1;
    const start = WHITE;
    const end = BLUE;
    // Calculate intermediate color based on distance
    const r = Math.round(start.r + (end.r - start.r) * normalizedDistance);
    const g = Math.round(start.g + (end.g - start.g) * normalizedDistance);
    const b = Math.round(start.b + (end.b - start.b) * normalizedDistance);

    return `rgb(${r},${g},${b})`;
};

/**
 * Converts a Color object to a string recognisable by CSS.
 */
export const getRgbString = (color: Color) => {
    return `rgb(${color.r},${color.g},${color.b})`;
};
