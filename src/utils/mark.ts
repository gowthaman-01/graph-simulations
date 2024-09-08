import { Node, NodeState, GRAPH_POSITION } from '../common/types';
import { getGlobalVariablesManagerInstance } from './GlobalVariablesManager';
import { getColorByWeight } from './color';

/**
 * Marks a cell in the grid based on the specified nodeState.
 *
 * @param {Node} node - The id of the cell to mark.
 * @param {NodeState} nodeState - The state of the cell (e.g., Visiting, Unvisited).
 * @param {GRAPH_POSITION} graphPosition - The position of the graph HTML Div in the application (left or right).
 */
export const markCell = (node: Node, nodeState: NodeState, graphPosition: GRAPH_POSITION): void => {
    // Get cell HTML cell element.
    const cell = document.getElementById(`${graphPosition}-cell-${node}`);

    if (!cell) return;

    // Unmark the cell.
    cell.innerHTML = '';

    if (nodeState === NodeState.Visiting) {
        // Highlight the cell in yellow to indicate it is currently being visited by the algorithm.
        // This visual cue helps the user track the algorithm's progress.
        cell.classList.add('cell-visiting');
    } else {
        // Set cell background back to original color.
        cell.classList.remove('cell-visiting');
        const nodes = getGlobalVariablesManagerInstance().getGraph().nodes;
        const weight = nodes[node];
        cell.style.backgroundColor = getColorByWeight(weight);
    }

    const mark = createMark(node, nodeState, graphPosition);

    mark.id = `${graphPosition}-cell-${node}-mark}`;

    cell.appendChild(mark);
};

/**
 * Creates an element to visually represent a node in the grid based on its state.
 *
 * Depending on the node's state, the function will either create an image element
 * to display an icon or a paragraph element to display the node's weight.
 *
 * @param {string} node - The id of the node to mark.
 * @param {NodeState} nodeState - The state of the node (e.g., StartNode, EndNode, Visiting).
 * @param {GRAPH_POSITION} graphPosition - The position of the graph HTML Div in the application (left or right).
 * @returns {HTMLImageElement | HTMLParagraphElement} The created element representing the node's state.
 */
export const createMark = (
    node: Node,
    nodeState: NodeState,
    graphPosition: GRAPH_POSITION,
): HTMLImageElement | HTMLParagraphElement => {
    const globalVariablesManager = getGlobalVariablesManagerInstance();

    // If the node is unvisited and weights should be displayed, create a paragraph element to show the weight.
    if (nodeState === NodeState.Unvisited && globalVariablesManager.shouldShowWeights()) {
        const nodes = globalVariablesManager.getGraph().nodes;
        const weight = nodes[node];

        // Calculate the font size based on the grid size, decreasing as grid size increases.
        const gridSize = globalVariablesManager.getGridSize();
        const fontSize = -0.01 * gridSize + 20;

        // Create paragraph element to show weight on the grid cell.
        const weightDisplay = document.createElement('div');
        weightDisplay.id = `${graphPosition}-cell-${node}-weight-display`;
        weightDisplay.className = 'weight-display';
        weightDisplay.classList.add('noselect');
        weightDisplay.innerHTML = weight === Infinity ? '∞' : weight.toString();
        weightDisplay.style.color = getColorByWeight(weight, true);
        weightDisplay.style.fontSize = `${fontSize}px`;

        return weightDisplay;
    } else {
        // Else create an image element to represent the node state visually.
        const mark = document.createElement('img');
        mark.id = `${graphPosition}-cell-${node}-${nodeState}`;

        switch (nodeState) {
            case NodeState.StartNode:
            case NodeState.EndNode:
                mark.src = `./assets/${nodeState}.png`;
                mark.classList.add('mark-large');
                break;
            case NodeState.Exploring:
            case NodeState.Visited:
            case NodeState.Visiting:
                mark.src = `./assets/${nodeState}.svg`;
                mark.classList.add('mark-small');
                break;
            case NodeState.ShortestPathUp:
            case NodeState.ShortestPathDown:
            case NodeState.ShortestPathLeft:
            case NodeState.ShortestPathRight:
                mark.src = `./assets/shortest-path.png`;
                mark.classList.add('mark-small');
                break;
            default:
                break;
        }

        if (nodeState === NodeState.ShortestPathDown) {
            mark.style.transform = 'rotate(180deg)';
        } else if (nodeState === NodeState.ShortestPathLeft) {
            mark.style.transform = 'rotate(270deg)';
        } else if (nodeState === NodeState.ShortestPathRight) {
            mark.style.transform = 'rotate(90deg)';
        }

        return mark;
    }
};
