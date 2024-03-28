export const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a random distance between 0 and maxDistance.
 */
export const randomDistance = (maxDistance: number) =>
    Math.floor(Math.exp(Math.random() * Math.log(maxDistance)));
