import { COLS, END_NODE, GRID_SIZE, MAX_DISTANCE, ROWS, START_NODE } from '../src/common/constants';
import { getColorByDistance } from '../src/utils/color';
import { bfs } from '../src/algorithms/bfs';
import { dijkstra } from '../src/algorithms/djikstra';
import { AlgorithmType, Graph, GraphStructure, MarkType, Node, Nodes } from '../src/common/types';
import { markCell } from '../src/utils/mark';
import { createGraph } from '../src/utils/graph';

// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', async () => {
    // HTML elements
    const gridContainers = document.getElementsByClassName(
        'grid-container',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const runButton = document.getElementById('runAlgorithms') as HTMLButtonElement;
    const newGraphButton = document.getElementById('newGraph') as HTMLButtonElement;
    const changeStartButton = document.getElementById('changeStart') as HTMLButtonElement;
    const changeEndButton = document.getElementById('changeEnd') as HTMLButtonElement;
    const weight_checkbox = document.getElementById('weight-checkbox') as HTMLInputElement;
    const weight_switch = document.getElementById('weight-switch') as HTMLLabelElement;
    // const maze_checkbox = document.getElementById('maze-checkbox') as HTMLInputElement;
    // const maze_switch = document.getElementById('maze-switch') as HTMLLabelElement;
    const legendCells = document.getElementsByClassName(
        'legend-cell',
    ) as HTMLCollectionOf<HTMLDivElement>;
    const slider = document.getElementById('slider') as HTMLInputElement;
    const rangeInput = document.querySelector('input[type="range"]') as HTMLInputElement;

    // Return early if an element is undefined.
    if (
        !gridContainers ||
        gridContainers.length === 0 ||
        !runButton ||
        !newGraphButton ||
        !changeStartButton ||
        !changeEndButton ||
        !weight_checkbox ||
        !weight_switch ||
        // !maze_checkbox ||
        // !maze_switch ||
        !legendCells ||
        !slider ||
        !rangeInput
    )
        return;

    // Initialise variables.
    let isMaze = false;
    let maxDistance = 1;
    let orientation: 'H' | 'V' = 'H';
    let { graph, nodes } = createGraph(ROWS, COLS, maxDistance, isMaze, orientation);
    let startNode = START_NODE();
    let endNode = END_NODE();
    let firstRender = true;
    let isRunning = false;
    let weightControlsColor = getColorByDistance(isMaze, maxDistance);

    // Helper functions
    const disableWeightControls = () => {
        slider.style.cursor = 'not-allowed';
        rangeInput.disabled = true;
        document.documentElement.style.setProperty('--slider-cursor', 'not-allowed');
    };

    const enableWeightControls = () => {
        slider.style.cursor = 'pointer';
        rangeInput.disabled = false;
        document.documentElement.style.setProperty('--slider-cursor', 'pointer');
    };

    const disableGraphControls = () => {
        runButton.disabled = true;
        runButton.style.cursor = 'not-allowed';
        newGraphButton.disabled = true;
        newGraphButton.style.cursor = 'not-allowed';
        changeStartButton.disabled = true;
        changeStartButton.style.cursor = 'not-allowed';
        changeEndButton.disabled = true;
        changeEndButton.style.cursor = 'not-allowed';
        weight_switch.style.cursor = 'not-allowed';
        weight_checkbox.disabled = true;
        // maze_switch.style.cursor = 'not-allowed';
        // maze_checkbox.disabled = true;
    };

    const enableGraphControls = () => {
        runButton.disabled = false;
        runButton.style.cursor = 'pointer';
        newGraphButton.disabled = false;
        newGraphButton.style.cursor = 'pointer';
        changeStartButton.disabled = false;
        changeStartButton.style.cursor = 'pointer';
        changeEndButton.disabled = false;
        changeEndButton.style.cursor = 'pointer';
        weight_switch.style.cursor = 'pointer';
        weight_checkbox.disabled = false;
        // maze_switch.style.cursor = 'pointer';
        // maze_checkbox.disabled = false;
    };

    const setWeightControlsColor = () => {
        weightControlsColor = getColorByDistance(isMaze, maxDistance);
        document.documentElement.style.setProperty('--slider-thumb-bg', weightControlsColor);
        document.documentElement.style.setProperty('--switch-bg', weightControlsColor);
    };

    // Set slider thumb color.
    setWeightControlsColor();

    // Display graph.
    displayNodes(gridContainers, nodes, startNode, endNode, isMaze, Object.values(AlgorithmType));

    // Event listeners
    weight_checkbox.addEventListener('change', async () => {
        if (isRunning) return;

        if (weight_checkbox.checked) {
            maxDistance = MAX_DISTANCE * 0.5;

            setWeightControlsColor();

            const { graph: newGraph, nodes: newNodes } = createGraph(
                ROWS,
                COLS,
                maxDistance,
                isMaze,
                orientation,
            );
            graph = newGraph;
            nodes = newNodes;
            displayNodes(
                gridContainers,
                nodes,
                startNode,
                endNode,
                isMaze,
                Object.values(AlgorithmType),
            );

            enableWeightControls();
        } else {
            maxDistance = 1;

            setWeightControlsColor();

            const { graph: newGraph, nodes: newNodes } = createGraph(
                ROWS,
                COLS,
                maxDistance,
                isMaze,
                orientation,
            );
            graph = newGraph;
            nodes = newNodes;
            displayNodes(
                gridContainers,
                nodes,
                startNode,
                endNode,
                isMaze,
                Object.values(AlgorithmType),
            );

            disableWeightControls();
        }
    });

    // maze_checkbox.addEventListener('change', () => {
    //     if (isRunning) return;
    //     isMaze = maze_checkbox.checked;
    // });

    runButton.addEventListener('click', async () => {
        if (isRunning) return;
        isRunning = true;
        disableGraphControls();
        disableWeightControls();

        if (!firstRender) {
            displayNodes(
                gridContainers,
                nodes,
                startNode,
                endNode,
                isMaze,
                Object.values(AlgorithmType),
            );
        }

        firstRender = false;

        await Promise.all(
            Object.values(AlgorithmType).map((algorithmType) =>
                runAlgorithmAndDisplayResults(
                    graph,
                    nodes,
                    startNode,
                    endNode,
                    algorithmType,
                    gridContainers,
                    isMaze,
                ),
            ),
        );

        isRunning = false;
        enableGraphControls();
        enableWeightControls();
    });

    newGraphButton.addEventListener('click', async () => {
        const { graph: newGraph, nodes: newNodes } = createGraph(
            ROWS,
            COLS,
            maxDistance,
            isMaze,
            orientation,
        );
        graph = newGraph;
        nodes = newNodes;
        displayNodes(
            gridContainers,
            nodes,
            startNode,
            endNode,
            isMaze,
            Object.values(AlgorithmType),
        );
    });

    changeStartButton.addEventListener('click', () => {
        startNode = START_NODE();
        displayNodes(
            gridContainers,
            nodes,
            startNode,
            endNode,
            isMaze,
            Object.values(AlgorithmType),
        );
    });

    changeEndButton.addEventListener('click', async () => {
        endNode = END_NODE();
        displayNodes(
            gridContainers,
            nodes,
            startNode,
            endNode,
            isMaze,
            Object.values(AlgorithmType),
        );
    });

    slider.addEventListener('input', async () => {
        maxDistance = (Math.floor(parseInt(slider.value)) / 100) * MAX_DISTANCE;
        setWeightControlsColor();
        const { graph: newGraph, nodes: newNodes } = createGraph(
            ROWS,
            COLS,
            maxDistance,
            isMaze,
            orientation,
        );
        graph = newGraph;
        nodes = newNodes;
        displayNodes(
            gridContainers,
            nodes,
            startNode,
            endNode,
            isMaze,
            Object.values(AlgorithmType),
        );
    });
});

// Algorithm related functions
const runAlgorithmAndDisplayResults = async (
    graph: Graph,
    nodes: Nodes,
    startNode: number,
    endNode: number,
    algorithmType: AlgorithmType,
    gridContainers: HTMLCollectionOf<HTMLDivElement>,
    isMaze: boolean,
) => {
    const algorithm = getAlgorithmFromAlgorithmType(algorithmType);
    if (!algorithm) return;
    const shortestPath = await algorithm(graph, nodes, startNode, endNode);
    await displayShortestPath(
        gridContainers,
        nodes,
        startNode,
        endNode,
        isMaze,
        shortestPath,
        algorithmType,
    );
    const totalDistance = getTotalDistance(shortestPath);
    displayTotalDistance(totalDistance, algorithmType);
};

const getAlgorithmFromAlgorithmType = (algorithmType: AlgorithmType) => {
    switch (algorithmType) {
        case AlgorithmType.Bfs:
            return bfs;

        case AlgorithmType.Djikstra:
            return dijkstra;

        default:
            return;
    }
};

const displayShortestPath = async (
    gridContainers: HTMLCollectionOf<HTMLDivElement>,
    nodes: Nodes,
    startNode: number,
    endNode: number,
    isMaze: boolean,
    shortestPath: Node[],
    algorithmType: AlgorithmType,
) => {
    let totalDistance = 0;
    displayNodes(gridContainers, nodes, startNode, endNode, isMaze, [algorithmType]);
    for (let i = 0; i < shortestPath.length; i++) {
        const node = shortestPath[i];
        totalDistance += node.distance;
        if (i !== 0 && i !== shortestPath.length - 1) {
            await markCell(node.id, MarkType.ShortestPath, algorithmType, 30);
        }
    }
};

const getTotalDistance = (nodes: Node[]) => {
    let totalDistance = 0;
    nodes.forEach((node) => (totalDistance += node.distance));
    return totalDistance;
};

const displayTotalDistance = (totalDistance: number, algorithmType: AlgorithmType) => {
    const distanceParagraphElement = document.getElementById(
        `${algorithmType}-distance`,
    ) as HTMLParagraphElement;
    distanceParagraphElement.innerHTML = `<b>Total Distance: ${totalDistance}</b>`;
};

const displayNodes = (
    gridContainers: HTMLCollectionOf<HTMLDivElement>,
    nodes: Nodes,
    startNode: number,
    endNode: number,
    isMaze: boolean,
    algorithms: AlgorithmType[],
) => {
    for (const gridContainer of Array.from(gridContainers)) {
        const algorithmType: AlgorithmType = gridContainer.id as AlgorithmType;
        if (!algorithms.includes(algorithmType)) {
            continue;
        }

        const distanceParagraphElement = document.getElementById(
            `${algorithmType}-distance`,
        ) as HTMLParagraphElement;
        distanceParagraphElement.innerHTML = '&nbsp';

        gridContainer.innerHTML = '';
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${ROWS}, 1fr)`;

        // Create grid cells .
        for (let i = 0; i < GRID_SIZE; i++) {
            const cell = document.createElement('div');
            const distance = nodes[i.toString()].distance;
            const color = getColorByDistance(isMaze, distance);
            cell.id = `${gridContainer.id}-cell-${i}`;
            cell.className = 'grid-cell';
            cell.style.border = `solid 1px #59595d`;
            cell.style.backgroundColor = color;

            const mark = document.createElement('img');
            mark.style.width = '90%';
            mark.classList.add('mark');
            // mark.style.filter = getMarkFilters(markType);

            if (i == startNode) {
                mark.id = 'start-node';
                mark.src = `./assets/start.png`;
            } else if (i == endNode) {
                mark.id = 'end-node';
                mark.src = `./assets/end.png`;
            }

            if (i == startNode || i == endNode) {
                cell.appendChild(mark);
            }

            gridContainer.appendChild(cell);
        }
    }
};
