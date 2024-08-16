import { DARK_BLUE, MAX_WEIGHT, WHITE } from '../common/constants';

/**
 * Calculates and returns a RGB color based on a given weight.
 * The color is interpolated between light and dark blue.
 *
 * @param {number} weight - The weight value used to determine the color.
 * @param {boolean} [reversed=false] - Optional flag to reverse the color gradient.
 *                                     If true, the gradient goes from dark to light; otherwise, it goes from light to dark.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
export const getColorByWeight = (weight: number, reversed?: boolean): string => {
    // Normalize weight to a range between 0.01 and 1.
    const normalizedWeight = Math.min((weight / MAX_WEIGHT) * 0.99 + 0.01, 1);

    // Define the start and end colors.
    const startColor = reversed ? DARK_BLUE : WHITE;
    const endColor = reversed ? WHITE : DARK_BLUE;

    // Calculate the interpolated RGB values.
    const interpolate = (start: number, end: number): number =>
        Math.round(start + (end - start) * normalizedWeight);

    const r = interpolate(startColor.r, endColor.r);
    const g = interpolate(startColor.g, endColor.g);
    const b = interpolate(startColor.b, endColor.b);

    return `rgb(${r},${g},${b})`;
};
