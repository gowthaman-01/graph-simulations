import { MAX_DISTANCE } from '../common/constants';

export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a random distance between 0 and MAX_DISTANCE.
 */
export const randomDistance = () => Math.floor(Math.random() * MAX_DISTANCE) + 1;
