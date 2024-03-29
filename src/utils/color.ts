import { BLUE, MAX_WEIGHT, WHITE } from '../common/constants';
import { Color } from '../common/types';

/**
 * Calculates and returns a color based on a given weight.
 * The color is interpolated between turquoise and magenta based on the normalized weight.
 *
 * @param {number} weight - The weight value used to determine the color.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
export const getColorByWeight = (weight: number): string => {
    // Normalize weight to a scale of 0.1 to 1
    const normalizedWeight = (weight / MAX_WEIGHT) * (1 - 0.1) + 0.1;
    const start = WHITE;
    const end = BLUE;
    // Calculate intermediate color based on weight
    const r = Math.round(start.r + (end.r - start.r) * normalizedWeight);
    const g = Math.round(start.g + (end.g - start.g) * normalizedWeight);
    const b = Math.round(start.b + (end.b - start.b) * normalizedWeight);

    return `rgb(${r},${g},${b})`;
};

/**
 * Converts a Color object to a string recognisable by CSS.
 */
export const getRgbString = (color: Color) => {
    return `rgb(${color.r},${color.g},${color.b})`;
};
