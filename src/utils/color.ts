import { MAX_COLOR, MAX_DISTANCE, MIN_COLOR, UNVISTED_COLOR } from '../common/constants';
import { Color } from '../common/types';

/**
 * Calculates and returns a color based on a given distance.
 * The color is interpolated between turquoise and magenta based on the normalized distance.
 *
 * @param {number} distance - The distance value used to determine the color.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
export const getColorByDistance = (isMaze: boolean, distance: number): string => {
    // Normalize distance to a scale of 0 to 1
    const normalizedDistance = distance / MAX_DISTANCE;
    const minColor = isMaze ? UNVISTED_COLOR : MIN_COLOR;

    // Calculate intermediate color based on distance
    const r = Math.round(minColor.r + (MAX_COLOR.r - minColor.r) * normalizedDistance);
    const g = Math.round(minColor.g + (MAX_COLOR.g - minColor.g) * normalizedDistance);
    const b = Math.round(minColor.b + (MAX_COLOR.b - minColor.b) * normalizedDistance);

    return `rgb(${r},${g},${b})`;
};

/**
 * Converts a Color object to a string recognisable by CSS.
 */
export const getRgbString = (color: Color) => {
    return `rgb(${color.r},${color.g},${color.b})`;
};
