import { createGridGraph } from '../src/utils/graph';
import { AlgorithmType } from '../src/common/types';
import { COLS, END_NODE, GRID_SIZE, ROWS, START_NODE } from '../src/common/constants';
import { getColorByDistance } from '../src/utils/color';
import { clearHighlight } from '../src/utils/highlight';
import { bfs } from '../src/algorithms/bfs';
import { dijkstra } from '../src/algorithms/djikstra';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    const graph = createGridGraph(ROWS, COLS);

    const gridContainers = document.getElementsByClassName(
        'grid-container',
    ) as HTMLCollectionOf<HTMLDivElement>;

    if (!gridContainers || gridContainers.length === 0) return;

    Array.from(gridContainers).forEach((gridContainer) => {
        // Set CSS.
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;

        // Create grid cells .
        for (let i = 0; i < GRID_SIZE; i++) {
            const cell = document.createElement('div');
            cell.id = `${gridContainer.id}-cell-${i}`;
            cell.className = 'grid-cell';
            cell.style.borderStyle = 'solid';
            cell.style.borderColor = '#f0f0f0';
            cell.style.borderWidth = '2px';

            const neighbors = graph[i];

            neighbors.forEach((neighbor) => {
                const nodeIndex = parseInt(neighbor.node);
                const distance = neighbor.distance;
                const color = getColorByDistance(distance);
                // Apply color based on the neighbor's position
                if (nodeIndex - i === -COLS) cell.style.borderTopColor = color;
                if (nodeIndex - i === COLS) cell.style.borderBottomColor = color;
                if (nodeIndex - i === -1) cell.style.borderLeftColor = color;
                if (nodeIndex - i === 1) cell.style.borderRightColor = color;
            });

            gridContainer.appendChild(cell);
        }
    });

    const runButton = document.getElementById('runAlgorithms');

    if (!runButton) return;
    runButton.addEventListener('click', async () => {
        for (const algorithm of Object.values(AlgorithmType)) {
            await clearHighlight(GRID_SIZE, algorithm as AlgorithmType);
        }
        // Run both algorithms synchronously and display their paths
        bfs(graph, START_NODE.toString(), END_NODE.toString());
        dijkstra(graph, START_NODE.toString(), END_NODE.toString());
    });
});
