import { DARK_BLUE, MAX_WEIGHT, WHITE } from '../common/constants';

/**
 * Calculates and returns a RGB color based on a given weight.
 * The color is interpolated between light and dark blue.
 *
 * @param {number} weight - The weight value used to determine the color.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
export const getColorByWeight = (weight: number): string => {
    // Normalize weight to a range between 0.01 and 1.
    const normalizedWeight = Math.min((weight / MAX_WEIGHT) * 0.99 + 0.01, 1);

    // Variables are used in case colors need to be changed in the future.
    const startColor = WHITE;
    const endColor = DARK_BLUE;

    const r = Math.round(startColor.r + (endColor.r - startColor.r) * normalizedWeight);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * normalizedWeight);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * normalizedWeight);

    return `rgb(${r},${g},${b})`;
};
