import { Node, NodeState } from '../common/types';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { getColorByWeight } from './color';

/**
 * Marks a node (cell) in the grid based on the specified nodeState.
 *
 * @param {string} nodeName - The name of the node (cell) to mark.
 * @param {NodeState} nodeState - The state of the node (e.g., Visiting, Unvisited).
 * @param {string} graphPosition - The position of the graph (left or right).
 */
export const markCell = (
    node: Node,
    nodeState: NodeState,
    graphPosition: 'left' | 'right',
): void => {
    // Get cell HTML element.
    const cell = document.getElementById(`${graphPosition}-cell-${node}`);

    if (!cell) return;

    // Unmark the cell.
    cell.innerHTML = '';

    if (nodeState === NodeState.Visiting) {
        // Highlight the cell in yellow to indicate it is currently being visited by the algorithm.
        // This visual cue helps the user understand the algorithm's progress and current position.
        cell.classList.add('cell-visiting');
    } else {
        // Set cell background back to original color.
        cell.classList.remove('cell-visiting');
        const nodes = getGlobalVariablesManagerInstance().getGraph().nodes;
        const weight = nodes[node];
        cell.style.backgroundColor = getColorByWeight(weight);
    }

    const mark = createMark(graphPosition, node, nodeState);

    cell.appendChild(mark);
};

/**
 * Creates an image element to mark a node in the grid based on the specified state.
 *
 * @param {string} graphPosition - The position of the graph (left or right).
 * @param {string} node - The id of the node to mark.
 * @param {NodeState} nodeState - The state of the node (e.g., StartNode, EndNode, Visiting).
 * @returns {HTMLImageElement | HTMLParagraphElement} The created image element to be used as a mark.
 */
export const createMark = (
    graphPosition: 'left' | 'right',
    node: Node,
    nodeState: NodeState,
): HTMLImageElement | HTMLParagraphElement => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();
    if (nodeState === NodeState.Unvisited && globalVariablesManager.isShowWeights()) {
        const nodes = globalVariablesManager.getGraph().nodes;
        const weight = nodes[node];

        const weightDisplay = document.createElement('p');
        weightDisplay.innerHTML = weight.toString();
        weightDisplay.style.color = getColorByWeight(weight, true);

        const gridSize = globalVariablesManager.getGridSize();

        // Calculate the font size based on the grid size, decreasing as grid size increases.
        const fontSize = -0.01 * gridSize + 20;

        weightDisplay.style.fontSize = `${fontSize}px`;

        return weightDisplay;
    }

    const mark = document.createElement('img');
    mark.id = `${graphPosition}-cell-${node}-${nodeState}`;
    mark.classList.add('mark');

    switch (nodeState) {
        case NodeState.StartNode:
        case NodeState.EndNode:
            mark.src = `./assets/${nodeState}.png`;
            mark.classList.add('mark-large');
            break;
        case NodeState.Exploring:
        case NodeState.ShortestPath:
        case NodeState.Visited:
        case NodeState.Visiting:
            mark.src = `./assets/${nodeState}.svg`;
            mark.classList.add('mark-small');
            break;
        default:
            break;
    }

    return mark;
};
