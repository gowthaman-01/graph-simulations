import { TutorialData } from '../common/types';

export const tutorialDataList: TutorialData[] = [
    {
        pageNumber: 1,
        title: 'Welcome to Pathium!',
        body: `This tutorial will walk you through every single feature of the application, ensuring you understand how to effectively use the tool to visualize various shortest path algorithms. 
        <br><br> If you want to dive right in, feel free to close the tutorial and start exploring the application. Otherwise, press Next!`,
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
        <br><br> This simulation contains the following SSP algorithms:
        <br>
        <ul>
            <li><b>BFS (Breadth-First Search):</b> Ideal for unweighted graphs</li>
            <li><b>Dijkstra:</b> Ideal for graphs with non-negative weights.</li>
            <li><b>Bellman-Ford:</b> Capable of handling negative weights and detecting negative cycles.</li>
            <li><b>A* Search:</b> Enhances Dijkstra's algorithm with heuristics to guide the search towards the target.</li>
            <li><b>DFS (Depth-First Search):</b> Explores each branch as far as possible before backtracking.</li>
            <li><b>Greedy Best-First Search:</b> Prioritizes nodes that appear to be closest to the goal, but DOES NOT guarantee the shortest path.</li>
        </ul>   
        Note: The A* Star search heuristics available in this simulation are the <a href="https://en.wikipedia.org/wiki/Euclidean_distance" target="_blank">euclidean distance</a> and the <a href="https://en.wikipedia.org/wiki/Taxicab_geometry" target="_blank">manhattan distance</a>.`,
    },
    {
        pageNumber: 3,
        title: 'Grid Graphs',
        body: `Each node (cell) in the grid graph has a weight associated with it. Nodes with higher weights are indicated by darker backgrounds. 
        <br><br>Let's consider Node A with an weight of 87 and Node B with an weight of 42. The cost of moving between these nodes is determined by the weight type setting.
        <br><br><b>Non-negative:</b> The cost of moving from A to B is 42, and from B to A is 87.
        <br><br><b>Negative:</b> The cost of moving to a higher weighted node (B to A) is the same as the non-negative case (ie: 87). However, moving to a lower weighted node is different:
        <br><div style="text-align: center;">A to B = -floor(sqrt(abs(neighbor - current))) = -floor(sqrt(abs(42 - 87))) = -6</div>`,
        img: {
            src: 'example-weight',
            width: 60,
            marginTop: 25,
        },
    },

    {
        pageNumber: 4,
        title: 'Graph Types',
        body: `<b>1. Standard Graph</b>
        <br><br>A basic grid graph where each cell represents a node and edges between nodes have varying  (elevations), depending on whether it is weighted or non-weighted.
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
        <br><br>A graph created using various maze generation algorithms, such as recursive division, random walls and DFS.
        <br><br> The graph below is a maze graph generated using recursive division:`,
        img: {
            src: 'recursive-division',
            width: 60,
            marginTop: 30,
        },
    },

    {
        pageNumber: 6,
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
                <img src="./assets/shortest-path.png" alt="Shortest Path" class="icon-filter"/>
            </div>
            <p>Shortest path: The node is part of the final optimal path from start to end.</p>
        </div>`,
    },
    {
        pageNumber: 7,
        title: 'Control Elements',
        body: `<u><b>Generate New Graph</b></u>
        <br>Generates a new graph based on the selected type and weight settings.<br><br>
        <u><b>Graph Type Selector</b></u>
        <br>Allows the user to choose between different graph types - Standard and Maze.<br><br>
        <u><b>Change Start Node / End Node</b></u>
        <br>Allows you to select a new starting or ending node on the graph.<br><br>
        <u><b>Weight Selector</b></u>
        <br>Allows you to select the weight type of the graph between 3 types - Unweighted, Non-negative and Negative<br><br>
        <u><b>Speed Selector</b></u>
        <br>Controls the speed of the algorithm's visualization.<br><br>
        <u><b>Step Slider</b></u>
        <br>Allows manual control of the progression through each stage of the algorithm.`,
    },
    {
        pageNumber: 8,
        title: 'Control Elements',
        body: `<div class="graph-buttons-container" style="justify-content: center;">
        <button onclick="openTutorialPage(10)">Editor</button>
        <button>Settings</button>
        <button>Run</button>
        </div><br>
        <u><b>Editor Button</b></u>
        <br>Opens the Graph Editor for custom graph creation and modification.<br><br>
        <u><b>Settings Button</b></u>
        <br>Access advanced configuration options for enhanced control and customization:<br>
        <ul>
            <li>Weight Visibility Toggle - Opt to show or hide weight values on each cell</li>
            <li>A* Heuristic Selector - Switch between Manhattan and Euclidean distances</li>
        </ul>
        The settings modal additionally displays run statistics (next page).<br><br>
        <u><b>Run Button</b></u>
        <br>Runs the simulation based on the current settings.<br><br>`,
    },
    {
        pageNumber: 9,
        title: 'Run Statistics',
        body: `The run statistics table compares the performance of different algorithms (BFS, Bellman-Ford, Dijkstra, and A* Search). 
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
    {
        pageNumber: 10,
        title: 'Graph Editor',
        body: `The Graph Editor enables you to design and customize graphs for algorithm visualization and testing.
    <br><br><b>Add Walls</b>: Add wall nodes to create obstacles, which act as impassable nodes.
    <br><b>Set Weight</b>: Adjust node weights (elevations) to create varying path costs.
    <br><b>Clear Weight</b>: Remove walls and reset weights (elevations) for selected nodes.
    <br><b>Reset Graph</b>: Restore the graph to its initial unweighted state.
    <br><b>Change Start</b>: Set a new starting point.
    <br><b>Change End</b>: Set a new destination.
    <br><b>Save Graph</b>: Save the current graph and return to the simulation view.
    <br><br>Leverage these tools to create complex challenges and evaluate how algorithms perform in your custom-designed environments.`,
    },
];
