import { BLUE, DARK_BLUE, LIGHT_GRAY, MAX_WEIGHT, WHITE } from '../common/constants';
import { Color } from '../common/types';

/**
 * Calculates and returns a color based on a given weight.
 * The color is interpolated between light and dark blue.
 *
 * @param {number} weight - The weight value used to determine the color.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
export const getColorByWeight = (weight: number): string => {
    // Normalize weight to a scale of 0.01 to 1
    const normalizedWeight = Math.min((weight / MAX_WEIGHT) * (1 - 0.01) + 0.01, 1);

    const startColor = WHITE;
    const endColor = DARK_BLUE;

    // Calculate intermediate color based on weight
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * normalizedWeight);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * normalizedWeight);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * normalizedWeight);

    return `rgb(${r},${g},${b})`;
};

/**
 * Converts a Color object to a string recognisable by CSS.
 */
export const getRgbString = (color: Color) => {
    return `rgb(${color.r},${color.g},${color.b})`;
};
