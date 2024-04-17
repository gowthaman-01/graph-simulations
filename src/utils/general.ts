export const delay = (ms?: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generates a random weight between 0 and maxWeight.
 */
export const randomWeight = (maxWeight: number) => {
    return Math.floor(Math.exp(Math.random() * Math.log(maxWeight)));
};
