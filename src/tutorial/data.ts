import { TutorialData } from '../common/types';

export const tutorialDataList: TutorialData[] = [
    {
        pageNumber: 1,
        title: 'Welcome to Graph Simulations!',
        body: `This tutorial will walk you through every single feature of the application, ensuring you understand how to effectively use the tool to visualize various shortest path algorithms. 
        <br><br> If you want to dive right in, feel free to press the "Skip" button below. Otherwise, press "Next"!`,
        img: {
            src: 'logo',
            width: 60,
            marginTop: 0,
        },
    },
    {
        pageNumber: 2,
        title: 'What is a SSP Algorithm?',
        body: `A shortest path (SSP) algorithm finds the most efficient route between two points (or nodes) in a graph, minimizing the sum of the weights of the edges it traverses. These algorithms are crucial in many real-world applications such as GPS navigation, network routing, and robotics.
        <br><br> This simulation contains 4 of the most popular SSP algorithms:
        <br>
        <ul>
            <li><b>BFS (Breadth-First Search):</b> Ideal for unweighted graphs</li>
            <li><b>Dijkstra:</b> Suitable for graphs with varying edge weights.</li>
            <li><b>Bellman-Ford:</b> Capable of handling negative weights.</li>
            <li><b>A* Search:</b> Enhances Dijkstra's algorithm with heuristics to guide the search more efficiently towards the target.</li>
        </ul>
        Note: The A* Star search heuristics available in this simulation are the <a href="https://en.wikipedia.org/wiki/Taxicab_geometry" target="_blank">manhattan distance</a> and the <a href="https://en.wikipedia.org/wiki/Euclidean_distance" target="_blank">euclidean distance</a>.`,
    },
    {
        pageNumber: 3,
        title: 'Grid Graphs',
        body: `A grid graph consists of nodes connected to adjacent nodes in the up, down, left, right directions. Each node has a weight representing the cost to move to that node. For example, moving from node A (weight 10) to node B (weight 20) costs 10 while moving from node B to node A costs 0, as moving to a lower-weight node is cost free.
        <br><br> Nodes with higher weights are indicated by darker backgrounds:`,
        img: {
            src: 'weighted',
            width: 60,
            marginTop: 30,
        },
    },
    {
        pageNumber: 4,
        title: 'Graph Types',
        body: `<b>1. Standard Graph</b>
        <br><br>A basic grid graph where each cell represents a node and edges between nodes have varying weights, depending on whether it is weighted or non-weighted.
        <br><br>The graph below is a weighted standard graph:`,
        img: {
            src: 'weighted',
            width: 60,
            marginTop: 30,
        },
    },
    {
        pageNumber: 5,
        title: 'Graph Types',
        body: `<b>2. Maze Graph</b>
        <br><br>A graph generated using maze algorithms. In non-weighted maze graphs, paths and walls are not connected by edges, while they are in weighted maze graphs.
        <br><br> The graph below is a maze graph generated using recursive division:`,
        img: {
            src: 'recursive-division',
            width: 60,
            marginTop: 30,
        },
    },
    {
        pageNumber: 6,
        title: 'Graph Types',
        body: `<b>3. Ideal Graph</b>
        <br><br>Ideal graphs are pre-configured graphs showcasing ideal conditions for demonstrating algorithm performance. These graphs are useful for comparing how different algorithms handle similar starting conditions.`,
    },
    {
        pageNumber: 7,
        title: 'Legend',
        body: `
        <div class="legend">
            <div class="legend-image-container-large">
                <img src="./assets/start.png" alt="Start Node"/>
            </div>
            <p>Start node</p>
        </div>
        <div class="legend">
            <div class="legend-image-container-large">
                <img src="./assets/end.png" alt="End Node"/>
            </div>
            <p>End node</p>
        </div>
        <div class="legend">
            <div class="legend-image-container-small" style="opacity: 0.8;">
                <img src="./assets/visited.svg" alt="Visited" class="icon-filter" />
            </div>
            <p>Visited: The node has been fully processed.</p>
        </div>
        <div class="legend">
            <div class="legend-image-container-small" style="opacity: 0.8;">
                <img src="./assets/visiting.svg" alt="Visiting" class="icon-filter"/>
            </div>
            <p>Exploring: Nodes that the algorithm will process next.</p>
        </div>
        <div class="legend">
            <div class="legend-image-container-small" style="opacity: 0.8;">
                <img src="./assets/legend-grid.png" alt="Visiting" class="icon-filter"/>
            </div>
            <p>Visiting: The node is currently being processed to update its neighbors.</p>
        </div>
        <div class="legend">
            <div class="legend-image-container-small" style="opacity: 0.8;">
                <img src="./assets/shortest-path.svg" alt="Shortest Path" class="icon-filter"/>
            </div>
            <p>Shortest path: The node is part of the final optimal path from start to end.</p>
        </div>`,
    },
    {
        pageNumber: 8,
        title: 'Control Elements',
        body: `<u><b>Generate New Graph</b></u>
        <br>Generates a new graph based on the selected type and weight settings.<br><br>
        <u><b>Graph Type Selector</b></u>
        <br>Allows the user to chose between different graph types - Standard, Maze and Ideal.<br><br>
        <u><b>Change Start Node / End Node</b></u>
        <br>Allows you to select a new starting or ending node on the graph.<br><br>
        <u><b>Weight Toggle</b></u>
        <br>Toggles between weighted and unweighted edges in the graph. This functionality is not available for ideal graphs.<br><br>
        <u><b>Weight Slider</b></u>
        <br>Adjusts the weight distribution of edges in the graph. A higher value increases the proportion of cells with higher weights (darker colors). This functionality is only available for standard graphs.<br><br>
        <u><b>Speed Selector</b></u>
        <br>Controls the speed of the algorithm's visualization.<br><br>
        <u><b>Step Slider</b></u>
        <br>Allows manual control of the progression through each stage of the algorithm.`,
    },
    {
        pageNumber: 10,
        title: 'Control Elements',
        body: `<div class="graph-buttons-container" style="justify-content: center;">
        <button>Info</button>
        <button>Run</button>
        <button class="arrow-button">
            <img src="./assets/right-arrow.png" class="arrow-image" />
        </button>
        </div><br>
        <u><b>Info Button</b></u>
        <br>Opens the Info modal, which contains the algorithm run statistics table and the A* Search heuristics selector.<br><br>
        <u><b>Run Button</b></u>
        <br>Runs the simulation based on the current settings.<br><br>
        <u><b>Right Arrow Button</b></u>
        <br>Allows you to switch between two different graph views:
        <br>- Group 1: BFS and Bellman-Ford
        <br>- Group 2: Dijkstra and A* Search<br><br>`,
    },
    {
        pageNumber: 10,
        title: 'Statistics Table',
        body: `The statistics table compares the performance of different algorithms (BFS, Bellman-Ford, Dijkstra, and A* Search). 
        <br><br><u>Steps</u>: Represents the number of steps to find the shortest path.
        <br><u>Weight</u>: Indicates the total weight of the shortest path.
        <br><u>Nodes</u>: Shows the number of nodes in the shortest path.
        <br><br> The best algorithm is chosen by first comparing path weights; the one with the lowest weight wins. If weights are equal, the algorithm with fewer steps is preferred. Here, A* Search has the same weight as Bellman-Ford and Dijkstra but uses fewer steps, making it the best choice. 
        <br><br>
        <table>
            <tr>
                <th>Algorithm</th>
                <th>Steps</th>
                <th>Weight</th>
                <th>Nodes</th>
            </tr>
            <tr id="bfsStatistic">
                <td>BFS</td>
                <td id="bfs-steps">1462</td>
                <td id="bfs-weight">164</td>
                <td id="bfs-nodes">16</td>
            </tr>
            <tr id="bellmanFordStatistic">
                <td>Bellman-Ford</td>
                <td id="bellmanFord-steps">45481</td>
                <td id="bellmanFord-weight">52</td>
                <td id="bellmanFord-nodes">22</td>
            </tr>
            <tr id="dijkstraStatistic">
                <td>Dijkstra</td>
                <td id="dijkstra-steps">17168</td>
                <td id="dijkstra-weight">52</td>
                <td id="dijkstra-nodes">22</td>
            </tr>
            <tr id="aStarStatistic">
                <td>A* Search</td>
                <td id="aStar-steps">14366</td>
                <td id="aStar-weight">52</td>
                <td id="aStar-nodes">22</td>
            </tr>
        </table>`,
    },
];
