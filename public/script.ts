import { createGridGraph, createMazeGraph } from '../src/utils/graph';
import {
    COLS,
    END_NODE,
    GRID_SIZE,
    MAGENTA_COLOR,
    MAX_COLOR,
    ROWS,
    START_NODE,
} from '../src/common/constants';
import { getColorByDistance, getRgbString } from '../src/utils/color';
import { bfs } from '../src/algorithms/bfs';
import { dijkstra } from '../src/algorithms/djikstra';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    const gridContainers = document.getElementsByClassName(
        'grid-container',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const runButton = document.getElementById('runAlgorithms') as HTMLButtonElement;
    const maze_checkbox = document.getElementById('maze-checkbox') as HTMLInputElement;
    const maze_switch = document.getElementById('maze-switch') as HTMLLabelElement;
    if (
        !gridContainers ||
        gridContainers.length === 0 ||
        !runButton ||
        !maze_checkbox ||
        !maze_switch
    )
        return;

    let isMaze = false;
    let graph = generateGraph(gridContainers, isMaze);
    let firstRender = true;
    let isRunning = false;

    maze_checkbox.addEventListener('change', () => {
        if (isRunning) return;
        isMaze = maze_checkbox.checked;
        graph = generateGraph(gridContainers, isMaze);
    });

    runButton.addEventListener('click', async () => {
        if (isRunning || runButton.disabled) return;
        runButton.disabled = true;
        maze_checkbox.disabled = true;
        maze_switch.style.cursor = 'not-allowed';
        isRunning = true;

        if (!firstRender) {
            graph = generateGraph(gridContainers, isMaze);
            firstRender = false;
        }

        // Run both algorithms synchronously and display their paths
        await Promise.all([
            bfs(graph, START_NODE.toString(), END_NODE.toString()),
            dijkstra(graph, START_NODE.toString(), END_NODE.toString()),
        ]);

        runButton.disabled = false;
        maze_checkbox.disabled = false;
        maze_switch.style.cursor = '';
        isRunning = false;
    });
});

const generateGraph = (gridContainers: HTMLCollectionOf<HTMLDivElement>, isMaze: boolean) => {
    const graph = isMaze ? createMazeGraph(ROWS, COLS) : createGridGraph(ROWS, COLS);
    Array.from(gridContainers).forEach((gridContainer) => {
        gridContainer.innerHTML = '';
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;

        // Create grid cells .
        for (let i = 0; i < GRID_SIZE; i++) {
            const cell = document.createElement('div');
            cell.id = `${gridContainer.id}-cell-${i}`;
            cell.className = 'grid-cell';
            cell.style.borderStyle = 'solid';
            cell.style.borderColor = getRgbString(isMaze ? MAGENTA_COLOR : MAX_COLOR);
            cell.style.borderWidth = '4px';

            const neighbors = graph[i];

            neighbors.forEach((neighbor) => {
                const nodeIndex = parseInt(neighbor.node);
                const distance = neighbor.distance;
                const color = getColorByDistance(isMaze, distance);
                // Apply color based on the neighbor's position
                switch (nodeIndex - i) {
                    case -COLS:
                        cell.style.borderTopColor = color;
                        break;
                    case COLS:
                        cell.style.borderBottomColor = color;
                        break;
                    case -1:
                        cell.style.borderLeftColor = color;
                        break;
                    case 1:
                        cell.style.borderRightColor = color;
                        break;
                    default:
                        break;
                }
            });

            gridContainer.appendChild(cell);
        }
    });
    return graph;
};
