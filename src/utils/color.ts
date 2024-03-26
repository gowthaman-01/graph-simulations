import { MAGENTA_COLOR, MAX_DISTANCE, TURQUOISE_COLOR } from '../common/constants';

/**
 * Calculates and returns a color based on a given distance.
 * The color is interpolated between turquoise and magenta based on the normalized distance.
 *
 * @param {number} distance - The distance value used to determine the color.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
export const getColorByDistance = (distance: number): string => {
    // Normalize distance to a scale of 0 to 1
    const normalizedDistance = distance / MAX_DISTANCE;
    const startColor = TURQUOISE_COLOR;
    const endColor = MAGENTA_COLOR;

    // Calculate intermediate color based on distance
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * normalizedDistance);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * normalizedDistance);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * normalizedDistance);

    return `rgb(${r},${g},${b})`;
};
