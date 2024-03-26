/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/algorithms/bfs.ts":
/*!*******************************!*\
  !*** ./src/algorithms/bfs.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bfs: () => (/* binding */ bfs)
/* harmony export */ });
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/types */ "./src/common/types.ts");
/* harmony import */ var _data_structures_Queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data-structures/Queue */ "./src/data-structures/Queue.ts");
/* harmony import */ var _utils_highlight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/highlight */ "./src/utils/highlight.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/**
 * Finds the shortest path using Breadth-First Search (BFS) algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @returns {Promise<void>} A promise that resolves once the shortest path is found and highlighted.
 */
var bfs = function (graph, startNode, endNode) { return __awaiter(void 0, void 0, void 0, function () {
    var visited, queue, parentMap, currentNode, current, _i, _a, neighbor;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                visited = {};
                queue = new _data_structures_Queue__WEBPACK_IMPORTED_MODULE_1__.Queue();
                parentMap = (_b = {}, _b[startNode] = null, _b);
                // Add startNode to queue.
                queue.enqueue(startNode);
                visited[startNode] = true;
                _c.label = 1;
            case 1:
                if (!(queue.getSize() > 0)) return [3 /*break*/, 11];
                currentNode = queue.dequeue();
                return [4 /*yield*/, (0,_utils_highlight__WEBPACK_IMPORTED_MODULE_2__.highlightCell)(currentNode, _common_types__WEBPACK_IMPORTED_MODULE_0__.HighlightType.Visited, _common_types__WEBPACK_IMPORTED_MODULE_0__.AlgorithmType.Bfs)];
            case 2:
                _c.sent();
                if (!(currentNode === endNode)) return [3 /*break*/, 6];
                current = currentNode;
                _c.label = 3;
            case 3:
                if (!(current !== null)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0,_utils_highlight__WEBPACK_IMPORTED_MODULE_2__.highlightCell)(current, _common_types__WEBPACK_IMPORTED_MODULE_0__.HighlightType.ShortestPath, _common_types__WEBPACK_IMPORTED_MODULE_0__.AlgorithmType.Bfs)];
            case 4:
                _c.sent();
                current = parentMap[current];
                return [3 /*break*/, 3];
            case 5: return [2 /*return*/];
            case 6:
                _i = 0, _a = graph[currentNode];
                _c.label = 7;
            case 7:
                if (!(_i < _a.length)) return [3 /*break*/, 10];
                neighbor = _a[_i];
                if (visited[neighbor.node])
                    return [3 /*break*/, 9];
                queue.enqueue(neighbor.node);
                visited[neighbor.node] = true;
                parentMap[neighbor.node] = currentNode;
                return [4 /*yield*/, (0,_utils_highlight__WEBPACK_IMPORTED_MODULE_2__.highlightCell)(neighbor.node, _common_types__WEBPACK_IMPORTED_MODULE_0__.HighlightType.Visiting, _common_types__WEBPACK_IMPORTED_MODULE_0__.AlgorithmType.Bfs)];
            case 8:
                _c.sent();
                _c.label = 9;
            case 9:
                _i++;
                return [3 /*break*/, 7];
            case 10: return [3 /*break*/, 1];
            case 11: 
            // If endNode is not reachable from startNode
            return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./src/algorithms/djikstra.ts":
/*!************************************!*\
  !*** ./src/algorithms/djikstra.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dijkstra: () => (/* binding */ dijkstra)
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.ts");
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/types */ "./src/common/types.ts");
/* harmony import */ var _data_structures_MinHeap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-structures/MinHeap */ "./src/data-structures/MinHeap.ts");
/* harmony import */ var _utils_highlight__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/highlight */ "./src/utils/highlight.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




/**
 * Finds the shortest path using Dijkstra's algorithm from startNode to endNode in the given graph.
 *
 * @param {Graph} graph - The graph to search.
 * @param {string} startNode - The starting node for the search.
 * @param {string} endNode - The target node to find the shortest path to.
 * @returns {Promise<void>} A promise that resolves once the shortest path is found and highlighted.
 */
var dijkstra = function (graph, startNode, endNode) { return __awaiter(void 0, void 0, void 0, function () {
    var distances, previous, visited, heap, currentNode, current, _i, _a, neighbor, node, distance, newDistance;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                distances = {};
                previous = {};
                visited = {};
                // Initialize distances and previous
                Object.keys(graph).forEach(function (node) {
                    distances[node] = Infinity;
                    previous[node] = null;
                });
                // Set distance to the startNode as 0
                distances[startNode] = 0;
                heap = new _data_structures_MinHeap__WEBPACK_IMPORTED_MODULE_2__.MinHeap(_data_structures_MinHeap__WEBPACK_IMPORTED_MODULE_2__.heapNodeComparator);
                heap.add({ node: startNode, priority: 0 });
                _b.label = 1;
            case 1:
                if (!!heap.isEmpty()) return [3 /*break*/, 8];
                currentNode = heap.pop().node;
                visited[currentNode] = true;
                return [4 /*yield*/, (0,_utils_highlight__WEBPACK_IMPORTED_MODULE_3__.highlightCell)(currentNode, _common_types__WEBPACK_IMPORTED_MODULE_1__.HighlightType.Visiting, _common_types__WEBPACK_IMPORTED_MODULE_1__.AlgorithmType.Djikstra, Math.log2(Object.keys(graph).length) * _common_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_DELAY)];
            case 2:
                _b.sent();
                if (!(currentNode === endNode)) return [3 /*break*/, 6];
                current = endNode;
                _b.label = 3;
            case 3:
                if (!(current !== null)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0,_utils_highlight__WEBPACK_IMPORTED_MODULE_3__.highlightCell)(current, _common_types__WEBPACK_IMPORTED_MODULE_1__.HighlightType.ShortestPath, _common_types__WEBPACK_IMPORTED_MODULE_1__.AlgorithmType.Djikstra)];
            case 4:
                _b.sent();
                current = previous[current];
                return [3 /*break*/, 3];
            case 5: return [2 /*return*/];
            case 6:
                for (_i = 0, _a = graph[currentNode]; _i < _a.length; _i++) {
                    neighbor = _a[_i];
                    node = neighbor.node, distance = neighbor.distance;
                    if (visited[node])
                        continue;
                    newDistance = distances[currentNode] + distance;
                    // If a shorter path is found.
                    if (newDistance < distances[node]) {
                        distances[node] = newDistance;
                        previous[node] = currentNode;
                        heap.add({ node: node, priority: newDistance });
                    }
                }
                return [4 /*yield*/, (0,_utils_highlight__WEBPACK_IMPORTED_MODULE_3__.highlightCell)(currentNode, _common_types__WEBPACK_IMPORTED_MODULE_1__.HighlightType.Visited, _common_types__WEBPACK_IMPORTED_MODULE_1__.AlgorithmType.Djikstra)];
            case 7:
                _b.sent();
                return [3 /*break*/, 1];
            case 8: 
            // If the endNode is not reachable, return an empty array
            return [2 /*return*/];
        }
    });
}); };


/***/ }),

/***/ "./src/common/constants.ts":
/*!*********************************!*\
  !*** ./src/common/constants.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLUE_COLOR: () => (/* binding */ BLUE_COLOR),
/* harmony export */   COLS: () => (/* binding */ COLS),
/* harmony export */   DEFAULT_DELAY: () => (/* binding */ DEFAULT_DELAY),
/* harmony export */   END_NODE: () => (/* binding */ END_NODE),
/* harmony export */   GRID_SIZE: () => (/* binding */ GRID_SIZE),
/* harmony export */   MAGENTA_COLOR: () => (/* binding */ MAGENTA_COLOR),
/* harmony export */   MAX_DISTANCE: () => (/* binding */ MAX_DISTANCE),
/* harmony export */   RED_COLOR: () => (/* binding */ RED_COLOR),
/* harmony export */   ROWS: () => (/* binding */ ROWS),
/* harmony export */   START_NODE: () => (/* binding */ START_NODE),
/* harmony export */   TURQUOISE_COLOR: () => (/* binding */ TURQUOISE_COLOR),
/* harmony export */   highlightClasses: () => (/* binding */ highlightClasses)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/common/types.ts");
var _a;

/**
 * Default delay in milliseconds for visualizations.
 * @type {number}
 */
var DEFAULT_DELAY = 10;
/**
 * Number of rows in the grid.
 * @type {number}
 */
var ROWS = 15;
/**
 * Number of columns in the grid.
 * @type {number}
 */
var COLS = 15;
/**
 * Total number of cells in the grid.
 * @type {number}
 */
var GRID_SIZE = ROWS * COLS;
/**
 * Index of the start node in the grid.
 * @type {number}
 */
var START_NODE = 0;
/**
 * Index of the end node in the grid.
 * @type {number}
 */
var END_NODE = 224;
/**
 * Maximum distance used in calculations.
 * @type {number}
 */
var MAX_DISTANCE = 10;
/**
 * CSS classes used for different highlight types.
 * @type {Record<HighlightType, string>}
 */
var highlightClasses = (_a = {},
    _a[_types__WEBPACK_IMPORTED_MODULE_0__.HighlightType.Unvisited] = 'unvisited',
    _a[_types__WEBPACK_IMPORTED_MODULE_0__.HighlightType.Visiting] = 'visiting',
    _a[_types__WEBPACK_IMPORTED_MODULE_0__.HighlightType.Visited] = 'visited',
    _a[_types__WEBPACK_IMPORTED_MODULE_0__.HighlightType.ShortestPath] = 'shortest-path',
    _a);
// RGB Color values.
var TURQUOISE_COLOR = { r: 64, g: 224, b: 208 };
var MAGENTA_COLOR = { r: 139, g: 0, b: 139 };
var BLUE_COLOR = { r: 0, g: 0, b: 255 };
var RED_COLOR = { r: 255, g: 0, b: 0 };


/***/ }),

/***/ "./src/common/types.ts":
/*!*****************************!*\
  !*** ./src/common/types.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AlgorithmType: () => (/* binding */ AlgorithmType),
/* harmony export */   HighlightType: () => (/* binding */ HighlightType)
/* harmony export */ });
/**
 * Enumerates different types of cell highlights for visualization purposes.
 */
var HighlightType;
(function (HighlightType) {
    HighlightType[HighlightType["Unvisited"] = 0] = "Unvisited";
    HighlightType[HighlightType["Visiting"] = 1] = "Visiting";
    HighlightType[HighlightType["Visited"] = 2] = "Visited";
    HighlightType[HighlightType["ShortestPath"] = 3] = "ShortestPath";
})(HighlightType || (HighlightType = {}));
/**
 * Enumerates different types of graph traversal algorithms.
 */
var AlgorithmType;
(function (AlgorithmType) {
    AlgorithmType["Bfs"] = "bfs";
    AlgorithmType["Djikstra"] = "djikstra";
})(AlgorithmType || (AlgorithmType = {}));


/***/ }),

/***/ "./src/data-structures/MinHeap.ts":
/*!****************************************!*\
  !*** ./src/data-structures/MinHeap.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MinHeap: () => (/* binding */ MinHeap),
/* harmony export */   heapNodeComparator: () => (/* binding */ heapNodeComparator)
/* harmony export */ });
/**
 * Comparator function for comparing two heap nodes based on their priority.
 *
 * @returns {boolean} `true` if the priority of `a` is greater than the priority of `b`, otherwise `false`.
 */
var heapNodeComparator = function (a, b) {
    return a.priority > b.priority;
};
/**
 * Represents a Min Heap data structure.
 *
 * @template T - The type of elements stored in the heap.
 */
var MinHeap = /** @class */ (function () {
    function MinHeap(comparator) {
        this.heap = [];
        this.comparator = comparator;
    }
    MinHeap.prototype.getLeftChildIndex = function (parentIndex) {
        return 2 * parentIndex + 1;
    };
    MinHeap.prototype.getRightChildIndex = function (parentIndex) {
        return 2 * parentIndex + 2;
    };
    MinHeap.prototype.getParentIndex = function (childIndex) {
        return Math.floor((childIndex - 1) / 2);
    };
    MinHeap.prototype.hasLeftChild = function (index) {
        return this.getLeftChildIndex(index) < this.heap.length;
    };
    MinHeap.prototype.hasRightChild = function (index) {
        return this.getRightChildIndex(index) < this.heap.length;
    };
    MinHeap.prototype.hasParent = function (index) {
        return this.getParentIndex(index) >= 0;
    };
    MinHeap.prototype.leftChild = function (index) {
        return this.heap[this.getLeftChildIndex(index)];
    };
    MinHeap.prototype.rightChild = function (index) {
        return this.heap[this.getRightChildIndex(index)];
    };
    MinHeap.prototype.parent = function (index) {
        return this.heap[this.getParentIndex(index)];
    };
    MinHeap.prototype.swap = function (i, j) {
        var temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    };
    MinHeap.prototype.isEmpty = function () {
        return this.heap.length == 0;
    };
    MinHeap.prototype.peek = function () {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    };
    MinHeap.prototype.pop = function () {
        if (this.heap.length === 0) {
            return null;
        }
        var item = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    };
    MinHeap.prototype.add = function (item) {
        this.heap.push(item);
        this.heapifyUp();
    };
    MinHeap.prototype.heapifyUp = function () {
        var index = this.heap.length - 1;
        while (this.hasParent(index) && this.comparator(this.parent(index), this.heap[index])) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    };
    MinHeap.prototype.heapifyDown = function () {
        var index = 0;
        while (this.hasLeftChild(index)) {
            var smallerChildIndex = this.getLeftChildIndex(index);
            if (this.hasRightChild(index) &&
                this.comparator(this.rightChild(index), this.leftChild(index))) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (!this.comparator(this.heap[index], this.heap[smallerChildIndex])) {
                break;
            }
            else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    };
    return MinHeap;
}());



/***/ }),

/***/ "./src/data-structures/Queue.ts":
/*!**************************************!*\
  !*** ./src/data-structures/Queue.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Queue: () => (/* binding */ Queue)
/* harmony export */ });
/**
 * Represents a node in the queue.
 */
var QueueNode = /** @class */ (function () {
    function QueueNode(data) {
        this.data = data;
        this.next = null;
    }
    return QueueNode;
}());
/**
 * Represents a queue data structure.
 */
var Queue = /** @class */ (function () {
    function Queue() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    /**
     * Adds an element to the end of the queue.
     * @param {T} data - The data to be added to the queue.
     */
    Queue.prototype.enqueue = function (data) {
        var newNode = new QueueNode(data);
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    };
    /**
     * Removes and returns the element at the front of the queue.
     * @returns {T | null} The data of the element removed from the queue, or null if the queue is empty.
     */
    Queue.prototype.dequeue = function () {
        if (!this.size) {
            return null;
        }
        var removedNode = this.head;
        this.head = this.head.next;
        if (this.size === 1) {
            this.tail = null;
        }
        this.size--;
        return removedNode.data;
    };
    /**
     * Returns the element at the front of the queue without removing it.
     * @returns {T | null} The data of the element at the front of the queue, or null if the queue is empty.
     */
    Queue.prototype.peek = function () {
        return this.size ? this.head.data : null;
    };
    /**
     * Returns the number of elements in the queue.
     * @returns {number} The number of elements in the queue.
     */
    Queue.prototype.getSize = function () {
        return this.size;
    };
    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, otherwise false.
     */
    Queue.prototype.isEmpty = function () {
        return this.size === 0;
    };
    /**
     * List all elements of the queue.
     */
    Queue.prototype.list = function () {
        var list = [];
        var current = this.head;
        while (current !== null) {
            list.push(current.data);
            current = current.next;
        }
        return list;
    };
    /**
     * Clears the queue, removing all elements.
     */
    Queue.prototype.clear = function () {
        this.head = null;
        this.tail = null;
        this.size = 0;
    };
    return Queue;
}());



/***/ }),

/***/ "./src/utils/color.ts":
/*!****************************!*\
  !*** ./src/utils/color.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getColorByDistance: () => (/* binding */ getColorByDistance)
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.ts");

/**
 * Calculates and returns a color based on a given distance.
 * The color is interpolated between turquoise and magenta based on the normalized distance.
 *
 * @param {number} distance - The distance value used to determine the color.
 * @returns {string} The interpolated color in RGB format (e.g., "rgb(255, 0, 0)").
 */
var getColorByDistance = function (distance) {
    // Normalize distance to a scale of 0 to 1
    var normalizedDistance = distance / _common_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DISTANCE;
    var startColor = _common_constants__WEBPACK_IMPORTED_MODULE_0__.TURQUOISE_COLOR;
    var endColor = _common_constants__WEBPACK_IMPORTED_MODULE_0__.MAGENTA_COLOR;
    // Calculate intermediate color based on distance
    var r = Math.round(startColor.r + (endColor.r - startColor.r) * normalizedDistance);
    var g = Math.round(startColor.g + (endColor.g - startColor.g) * normalizedDistance);
    var b = Math.round(startColor.b + (endColor.b - startColor.b) * normalizedDistance);
    return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
};


/***/ }),

/***/ "./src/utils/general.ts":
/*!******************************!*\
  !*** ./src/utils/general.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delay: () => (/* binding */ delay),
/* harmony export */   randomDistance: () => (/* binding */ randomDistance)
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.ts");

var delay = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
/**
 * Generates a random distance between 0 and MAX_DISTANCE.
 */
var randomDistance = function () { return Math.floor(Math.random() * _common_constants__WEBPACK_IMPORTED_MODULE_0__.MAX_DISTANCE) + 1; };


/***/ }),

/***/ "./src/utils/graph.ts":
/*!****************************!*\
  !*** ./src/utils/graph.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGridGraph: () => (/* binding */ createGridGraph)
/* harmony export */ });
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general */ "./src/utils/general.ts");

/**
 * Creates a grid graph with the specified number of rows and columns.
 *
 * @param {number} rows - The number of rows in the grid.
 * @param {number} cols - The number of columns in the grid.
 * @returns {Graph} The created grid graph represented as an adjacency list.
 */
var createGridGraph = function (rows, cols) {
    var graph = {};
    var size = rows * cols;
    var distances = {};
    for (var i = 0; i < size; i++) {
        graph[i] = []; // Initialize each node with an empty array of neighbors
        // Direct neighbors
        var up = i - cols;
        var down = i + cols;
        var left = i % cols !== 0 ? i - 1 : -1; // Check if node is the leftmost node in grid.
        var right = (i + 1) % cols !== 0 ? i + 1 : -1; // Check if node is the rightmost node in grid.
        if (up >= 0)
            graph[i].push({
                node: up.toString(),
                distance: getDistance(distances, up.toString(), i.toString()),
            });
        if (down < size)
            graph[i].push({
                node: down.toString(),
                distance: getDistance(distances, down.toString(), i.toString()),
            });
        if (left !== -1)
            graph[i].push({
                node: left.toString(),
                distance: getDistance(distances, left.toString(), i.toString()),
            });
        if (right !== -1)
            graph[i].push({
                node: right.toString(),
                distance: getDistance(distances, right.toString(), i.toString()),
            });
    }
    return graph;
};
/**
 * Gets the distance between two nodes in a graph.
 * If the distance between the nodes is not already calculated, it generates a random distance and stores it in the distances object.
 * This prevents adjacent nodes to have different distances.
 *
 * @param {Distances} distances - The distances object storing precalculated distances between nodes.
 * @param {string} node - The index of the first node.
 * @param {string} neighbor - The index of the second node.
 * @returns {number} The distance between the two nodes.
 */
var getDistance = function (distances, node, neighbor) {
    // Generate key -> eg: node = '5', neighbor = '1', key = '1,5'.
    var key = parseInt(node) < parseInt(neighbor) ? node + ',' + neighbor : neighbor + ',' + node;
    // Check if the distance between the nodes is already calculated.
    if (!(key in distances)) {
        // If not, generate a random distance and store it in the distances object.
        distances[key] = (0,_general__WEBPACK_IMPORTED_MODULE_0__.randomDistance)();
    }
    // Return the distance between the nodes
    return distances[key];
};


/***/ }),

/***/ "./src/utils/highlight.ts":
/*!********************************!*\
  !*** ./src/utils/highlight.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearHighlight: () => (/* binding */ clearHighlight),
/* harmony export */   highlightCell: () => (/* binding */ highlightCell),
/* harmony export */   highlightShortestPath: () => (/* binding */ highlightShortestPath)
/* harmony export */ });
/* harmony import */ var _common_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/constants */ "./src/common/constants.ts");
/* harmony import */ var _common_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/types */ "./src/common/types.ts");
/* harmony import */ var _general__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general */ "./src/utils/general.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



/**
 * Highlights a node (cell) in the grid based on the specified type for a given algorithm.
 *
 * @param {string} nodeName - The name of the node (cell) to highlight.
 * @param {HighlightType} type - The type of highlight to apply.
 * @param {AlgorithmType} algorithm - The algorithm associated with the grid.
 * @param {number} [delayDuration] - Optional. The duration to delay before applying the highlight, in milliseconds.
 * @returns {Promise<void>} A promise that resolves once the cell is highlighted.
 */
var highlightCell = function (nodeName, type, algorithm, delayDuration) { return __awaiter(void 0, void 0, void 0, function () {
    var cell;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cell = document.getElementById("".concat(algorithm, "-cell-").concat(nodeName));
                if (!cell)
                    return [2 /*return*/];
                // Remove any existing highlights.
                Object.keys(_common_types__WEBPACK_IMPORTED_MODULE_1__.HighlightType).forEach(function (hTypeKey) {
                    var hType = Number(hTypeKey);
                    cell.classList.remove(_common_constants__WEBPACK_IMPORTED_MODULE_0__.highlightClasses[hType]);
                });
                // Add the new highlight class.
                cell.classList.add(_common_constants__WEBPACK_IMPORTED_MODULE_0__.highlightClasses[type]);
                // If delayDuration is not provided, use the default delay.
                if (delayDuration == null) {
                    delayDuration = _common_constants__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_DELAY;
                }
                return [4 /*yield*/, (0,_general__WEBPACK_IMPORTED_MODULE_2__.delay)(delayDuration)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
/**
 * Clears highlighting of all grid cells associated with a particular algorithm.
 *
 * @param {number} size - The size of the grid.
 * @param {AlgorithmType} algorithm - The algorithm for which the grid cells are associated.
 * @returns {Promise<void>} A promise that resolves when all grid cells are cleared.
 */
var clearHighlight = function (size, algorithm) { return __awaiter(void 0, void 0, void 0, function () {
    var cell, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cell = document.getElementById("".concat(algorithm, "-cell-0"));
                // If the cell hasn't been colored yet (i.e., first render), return early.
                if (cell.classList.length === 1) {
                    return [2 /*return*/];
                }
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < size)) return [3 /*break*/, 4];
                return [4 /*yield*/, highlightCell(i.toString(), _common_types__WEBPACK_IMPORTED_MODULE_1__.HighlightType.Unvisited, algorithm, 0)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Displays the shortest path on the grid for a given algorithm by highlighting cells.
 *
 * @param {string[] | null} path - An array of node names representing the shortest path, or null if no path is found.
 * @param {AlgorithmType} algorithm - The algorithm associated with the grid.
 * @returns {Promise<void>} A promise that resolves once the shortest path is displayed.
 */
var highlightShortestPath = function (path, algorithm) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, path_1, node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!path)
                    return [2 /*return*/];
                _i = 0, path_1 = path;
                _a.label = 1;
            case 1:
                if (!(_i < path_1.length)) return [3 /*break*/, 4];
                node = path_1[_i];
                return [4 /*yield*/, highlightCell(node, _common_types__WEBPACK_IMPORTED_MODULE_1__.HighlightType.ShortestPath, algorithm)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}); };


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./public/script.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_utils_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/utils/graph */ "./src/utils/graph.ts");
/* harmony import */ var _src_common_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/common/types */ "./src/common/types.ts");
/* harmony import */ var _src_common_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/common/constants */ "./src/common/constants.ts");
/* harmony import */ var _src_utils_color__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/utils/color */ "./src/utils/color.ts");
/* harmony import */ var _src_utils_highlight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/utils/highlight */ "./src/utils/highlight.ts");
/* harmony import */ var _src_algorithms_bfs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../src/algorithms/bfs */ "./src/algorithms/bfs.ts");
/* harmony import */ var _src_algorithms_djikstra__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/algorithms/djikstra */ "./src/algorithms/djikstra.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







// Script that runs when DOM is loaded.
document.addEventListener('DOMContentLoaded', function () { return __awaiter(void 0, void 0, void 0, function () {
    var graph, gridContainers, runButton;
    return __generator(this, function (_a) {
        graph = (0,_src_utils_graph__WEBPACK_IMPORTED_MODULE_0__.createGridGraph)(_src_common_constants__WEBPACK_IMPORTED_MODULE_2__.ROWS, _src_common_constants__WEBPACK_IMPORTED_MODULE_2__.COLS);
        gridContainers = document.getElementsByClassName('grid-container');
        if (!gridContainers || gridContainers.length === 0)
            return [2 /*return*/];
        Array.from(gridContainers).forEach(function (gridContainer) {
            // Set CSS.
            gridContainer.style.display = 'grid';
            gridContainer.style.gridTemplateColumns = "repeat(".concat(_src_common_constants__WEBPACK_IMPORTED_MODULE_2__.COLS, ", 1fr)");
            gridContainer.style.gridTemplateRows = "repeat(".concat(_src_common_constants__WEBPACK_IMPORTED_MODULE_2__.ROWS, ", 1fr)");
            var _loop_1 = function (i) {
                var cell = document.createElement('div');
                cell.id = "".concat(gridContainer.id, "-cell-").concat(i);
                cell.className = 'grid-cell';
                cell.style.borderStyle = 'solid';
                cell.style.borderColor = '#f0f0f0';
                cell.style.borderWidth = '2px';
                var neighbors = graph[i];
                neighbors.forEach(function (neighbor) {
                    var nodeIndex = parseInt(neighbor.node);
                    var distance = neighbor.distance;
                    var color = (0,_src_utils_color__WEBPACK_IMPORTED_MODULE_3__.getColorByDistance)(distance);
                    // Apply color based on the neighbor's position
                    if (nodeIndex - i === -_src_common_constants__WEBPACK_IMPORTED_MODULE_2__.COLS)
                        cell.style.borderTopColor = color;
                    if (nodeIndex - i === _src_common_constants__WEBPACK_IMPORTED_MODULE_2__.COLS)
                        cell.style.borderBottomColor = color;
                    if (nodeIndex - i === -1)
                        cell.style.borderLeftColor = color;
                    if (nodeIndex - i === 1)
                        cell.style.borderRightColor = color;
                });
                gridContainer.appendChild(cell);
            };
            // Create grid cells .
            for (var i = 0; i < _src_common_constants__WEBPACK_IMPORTED_MODULE_2__.GRID_SIZE; i++) {
                _loop_1(i);
            }
        });
        runButton = document.getElementById('runAlgorithms');
        if (!runButton)
            return [2 /*return*/];
        runButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _i, _a, algorithm;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = Object.values(_src_common_types__WEBPACK_IMPORTED_MODULE_1__.AlgorithmType);
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        algorithm = _a[_i];
                        return [4 /*yield*/, (0,_src_utils_highlight__WEBPACK_IMPORTED_MODULE_4__.clearHighlight)(_src_common_constants__WEBPACK_IMPORTED_MODULE_2__.GRID_SIZE, algorithm)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        // Run both algorithms synchronously and display their paths
                        (0,_src_algorithms_bfs__WEBPACK_IMPORTED_MODULE_5__.bfs)(graph, _src_common_constants__WEBPACK_IMPORTED_MODULE_2__.START_NODE.toString(), _src_common_constants__WEBPACK_IMPORTED_MODULE_2__.END_NODE.toString());
                        (0,_src_algorithms_djikstra__WEBPACK_IMPORTED_MODULE_6__.dijkstra)(graph, _src_common_constants__WEBPACK_IMPORTED_MODULE_2__.START_NODE.toString(), _src_common_constants__WEBPACK_IMPORTED_MODULE_2__.END_NODE.toString());
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWtGO0FBQ2pDO0FBQ0U7QUFFbkQ7Ozs7Ozs7R0FPRztBQUNJLElBQU0sR0FBRyxHQUFHLFVBQU8sS0FBWSxFQUFFLFNBQWlCLEVBQUUsT0FBZTs7Ozs7O2dCQUVoRSxPQUFPLEdBQWUsRUFBRSxDQUFDO2dCQUN6QixLQUFLLEdBQUcsSUFBSSx5REFBSyxFQUFVLENBQUM7Z0JBQzVCLFNBQVMsYUFBdUMsR0FBQyxTQUFTLElBQUcsSUFBSSxLQUFFLENBQUM7Z0JBRTFFLDBCQUEwQjtnQkFDMUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDekIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7O3FCQUVuQixNQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQztnQkFFaEIsV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEMscUJBQU0sK0RBQWEsQ0FBQyxXQUFXLEVBQUUsd0RBQWEsQ0FBQyxPQUFPLEVBQUUsd0RBQWEsQ0FBQyxHQUFHLENBQUM7O2dCQUExRSxTQUEwRSxDQUFDO3FCQUd2RSxZQUFXLEtBQUssT0FBTyxHQUF2Qix3QkFBdUI7Z0JBQ25CLE9BQU8sR0FBRyxXQUFXLENBQUM7OztxQkFDbkIsUUFBTyxLQUFLLElBQUk7Z0JBQ25CLHFCQUFNLCtEQUFhLENBQUMsT0FBTyxFQUFFLHdEQUFhLENBQUMsWUFBWSxFQUFFLHdEQUFhLENBQUMsR0FBRyxDQUFDOztnQkFBM0UsU0FBMkUsQ0FBQztnQkFDNUUsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7b0JBRWpDLHNCQUFPOztzQkFJOEIsRUFBbEIsVUFBSyxDQUFDLFdBQVcsQ0FBQzs7O3FCQUFsQixlQUFrQjtnQkFBOUIsUUFBUTtnQkFDZixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29CQUFFLHdCQUFTO2dCQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO2dCQUN2QyxxQkFBTSwrREFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsd0RBQWEsQ0FBQyxRQUFRLEVBQUUsd0RBQWEsQ0FBQyxHQUFHLENBQUM7O2dCQUE3RSxTQUE2RSxDQUFDOzs7Z0JBTDNELElBQWtCOzs7O1lBUzdDLDZDQUE2QztZQUM3QyxzQkFBTzs7O0tBQ1YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEa0Q7QUFDNEI7QUFDUDtBQUN0QjtBQUVuRDs7Ozs7OztHQU9HO0FBQ0ksSUFBTSxRQUFRLEdBQUcsVUFBTyxLQUFZLEVBQUUsU0FBaUIsRUFBRSxPQUFlOzs7OztnQkFDckUsU0FBUyxHQUE4QixFQUFFLENBQUM7Z0JBQzFDLFFBQVEsR0FBcUMsRUFBRSxDQUFDO2dCQUNoRCxPQUFPLEdBQStCLEVBQUUsQ0FBQztnQkFFL0Msb0NBQW9DO2dCQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7b0JBQzVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUM7b0JBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDO2dCQUVILHFDQUFxQztnQkFDckMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFHbkIsSUFBSSxHQUFHLElBQUksNkRBQU8sQ0FBVyx3RUFBa0IsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7O3FCQUVwQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ0osV0FBVyxHQUFLLElBQUksQ0FBQyxHQUFHLEVBQUcsS0FBaEIsQ0FBaUI7Z0JBQzFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBRTVCLHFCQUFNLCtEQUFhLENBQ2YsV0FBVyxFQUNYLHdEQUFhLENBQUMsUUFBUSxFQUN0Qix3REFBYSxDQUFDLFFBQVEsRUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLDREQUFhLENBQ3ZEOztnQkFMRCxTQUtDLENBQUM7cUJBRUUsWUFBVyxLQUFLLE9BQU8sR0FBdkIsd0JBQXVCO2dCQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDOzs7cUJBQ2YsUUFBTyxLQUFLLElBQUk7Z0JBQ25CLHFCQUFNLCtEQUFhLENBQUMsT0FBTyxFQUFFLHdEQUFhLENBQUMsWUFBWSxFQUFFLHdEQUFhLENBQUMsUUFBUSxDQUFDOztnQkFBaEYsU0FBZ0YsQ0FBQztnQkFDakYsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7b0JBRWhDLHNCQUFPOztnQkFHWCxXQUF5QyxFQUFsQixVQUFLLENBQUMsV0FBVyxDQUFDLEVBQWxCLGNBQWtCLEVBQWxCLElBQWtCLEVBQUUsQ0FBQztvQkFBakMsUUFBUTtvQkFDUCxJQUFJLEdBQWUsUUFBUSxLQUF2QixFQUFFLFFBQVEsR0FBSyxRQUFRLFNBQWIsQ0FBYztvQkFDcEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUFFLFNBQVM7b0JBQ3RCLFdBQVcsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDO29CQUV0RCw4QkFBOEI7b0JBQzlCLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNoQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO3dCQUM5QixRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDO3dCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxRQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUM5QyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQscUJBQU0sK0RBQWEsQ0FBQyxXQUFXLEVBQUUsd0RBQWEsQ0FBQyxPQUFPLEVBQUUsd0RBQWEsQ0FBQyxRQUFRLENBQUM7O2dCQUEvRSxTQUErRSxDQUFDOzs7WUFHcEYseURBQXlEO1lBQ3pELHNCQUFPOzs7S0FDVixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVzQztBQUV4Qzs7O0dBR0c7QUFDSSxJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFFaEM7OztHQUdHO0FBQ0ksSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBRXZCOzs7R0FHRztBQUNJLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV2Qjs7O0dBR0c7QUFDSSxJQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBRXJDOzs7R0FHRztBQUNJLElBQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztBQUU1Qjs7O0dBR0c7QUFDSSxJQUFNLFFBQVEsR0FBRyxHQUFHLENBQUM7QUFFNUI7OztHQUdHO0FBQ0ksSUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBRS9COzs7R0FHRztBQUNJLElBQU0sZ0JBQWdCO0lBQ3pCLEdBQUMsaURBQWEsQ0FBQyxTQUFTLElBQUcsV0FBVztJQUN0QyxHQUFDLGlEQUFhLENBQUMsUUFBUSxJQUFHLFVBQVU7SUFDcEMsR0FBQyxpREFBYSxDQUFDLE9BQU8sSUFBRyxTQUFTO0lBQ2xDLEdBQUMsaURBQWEsQ0FBQyxZQUFZLElBQUcsZUFBZTtPQUNoRCxDQUFDO0FBRUYsb0JBQW9CO0FBQ2IsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2xELElBQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUMvQyxJQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDMUMsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJoRDs7R0FFRztBQUNILElBQVksYUFLWDtBQUxELFdBQVksYUFBYTtJQUNyQiwyREFBUztJQUNULHlEQUFRO0lBQ1IsdURBQU87SUFDUCxpRUFBWTtBQUNoQixDQUFDLEVBTFcsYUFBYSxLQUFiLGFBQWEsUUFLeEI7QUFFRDs7R0FFRztBQUNILElBQVksYUFHWDtBQUhELFdBQVksYUFBYTtJQUNyQiw0QkFBVztJQUNYLHNDQUFxQjtBQUN6QixDQUFDLEVBSFcsYUFBYSxLQUFiLGFBQWEsUUFHeEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuREQ7Ozs7R0FJRztBQUNJLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxDQUFXLEVBQUUsQ0FBVztJQUN2RCxPQUFPLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0g7SUFJSSxpQkFBWSxVQUFtQztRQUMzQyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxtQ0FBaUIsR0FBekIsVUFBMEIsV0FBbUI7UUFDekMsT0FBTyxDQUFDLEdBQUcsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU8sb0NBQWtCLEdBQTFCLFVBQTJCLFdBQW1CO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLGdDQUFjLEdBQXRCLFVBQXVCLFVBQWtCO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sOEJBQVksR0FBcEIsVUFBcUIsS0FBYTtRQUM5QixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM1RCxDQUFDO0lBRU8sK0JBQWEsR0FBckIsVUFBc0IsS0FBYTtRQUMvQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUM3RCxDQUFDO0lBRU8sMkJBQVMsR0FBakIsVUFBa0IsS0FBYTtRQUMzQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTywyQkFBUyxHQUFqQixVQUFrQixLQUFhO1FBQzNCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU8sNEJBQVUsR0FBbEIsVUFBbUIsS0FBYTtRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVPLHdCQUFNLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLHNCQUFJLEdBQVosVUFBYSxDQUFTLEVBQUUsQ0FBUztRQUM3QixJQUFNLElBQUksR0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQseUJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQkFBSSxHQUFKO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxxQkFBRyxHQUFIO1FBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN6QixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsSUFBTSxJQUFJLEdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHFCQUFHLEdBQUgsVUFBSSxJQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTywyQkFBUyxHQUFqQjtRQUNJLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3BGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQztJQUVPLDZCQUFXLEdBQW5CO1FBQ0ksSUFBSSxLQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzlCLElBQUksaUJBQWlCLEdBQVcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlELElBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ2hFLENBQUM7Z0JBQ0MsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25FLE1BQU07WUFDVixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBQ0QsS0FBSyxHQUFHLGlCQUFpQixDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBQ0wsY0FBQztBQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SEQ7O0dBRUc7QUFDSDtJQUlJLG1CQUFZLElBQU87UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDO0FBRUQ7O0dBRUc7QUFDSDtJQUtJO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHVCQUFPLEdBQVAsVUFBUSxJQUFPO1FBQ1gsSUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUksSUFBSSxDQUFDLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFBTSxDQUFDO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHVCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2IsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsb0JBQUksR0FBSjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsdUJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsdUJBQU8sR0FBUDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsb0JBQUksR0FBSjtRQUNJLElBQU0sSUFBSSxHQUFRLEVBQUUsQ0FBQztRQUNyQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLE9BQU8sT0FBTyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzNCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pHa0Y7QUFFbkY7Ozs7OztHQU1HO0FBQ0ksSUFBTSxrQkFBa0IsR0FBRyxVQUFDLFFBQWdCO0lBQy9DLDBDQUEwQztJQUMxQyxJQUFNLGtCQUFrQixHQUFHLFFBQVEsR0FBRywyREFBWSxDQUFDO0lBQ25ELElBQU0sVUFBVSxHQUFHLDhEQUFlLENBQUM7SUFDbkMsSUFBTSxRQUFRLEdBQUcsNERBQWEsQ0FBQztJQUUvQixpREFBaUQ7SUFDakQsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztJQUN0RixJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RGLElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLENBQUM7SUFFdEYsT0FBTyxjQUFPLENBQUMsY0FBSSxDQUFDLGNBQUksQ0FBQyxNQUFHLENBQUM7QUFDakMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCaUQ7QUFFNUMsSUFBTSxLQUFLLEdBQUcsVUFBQyxFQUFVO0lBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLElBQUssaUJBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztBQUM3RCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNJLElBQU0sY0FBYyxHQUFHLGNBQU0sV0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsMkRBQVksQ0FBQyxHQUFHLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ1R0QztBQUczQzs7Ozs7O0dBTUc7QUFDSSxJQUFNLGVBQWUsR0FBRyxVQUFDLElBQVksRUFBRSxJQUFZO0lBQ3RELElBQU0sS0FBSyxHQUFVLEVBQUUsQ0FBQztJQUN4QixJQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLElBQU0sU0FBUyxHQUFjLEVBQUUsQ0FBQztJQUVoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDNUIsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHdEQUF3RDtRQUV2RSxtQkFBbUI7UUFDbkIsSUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztRQUN4RixJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLCtDQUErQztRQUVoRyxJQUFJLEVBQUUsSUFBSSxDQUFDO1lBQ1AsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDVixJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNoRSxDQUFDLENBQUM7UUFFUCxJQUFJLElBQUksR0FBRyxJQUFJO1lBQ1gsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDckIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNsRSxDQUFDLENBQUM7UUFFUCxJQUFJLElBQUksS0FBSyxDQUFDLENBQUM7WUFDWCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNWLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNyQixRQUFRLEVBQUUsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2xFLENBQUMsQ0FBQztRQUVQLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQztZQUNaLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGOzs7Ozs7Ozs7R0FTRztBQUNILElBQU0sV0FBVyxHQUFHLFVBQUMsU0FBb0IsRUFBRSxJQUFZLEVBQUUsUUFBZ0I7SUFDckUsK0RBQStEO0lBQy9ELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztJQUVoRyxpRUFBaUU7SUFDakUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxFQUFFLENBQUM7UUFDdEIsMkVBQTJFO1FBQzNFLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyx3REFBYyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELHdDQUF3QztJQUN4QyxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUVvRTtBQUNQO0FBQzdCO0FBRWxDOzs7Ozs7OztHQVFHO0FBQ0ksSUFBTSxhQUFhLEdBQUcsVUFDekIsUUFBZ0IsRUFDaEIsSUFBbUIsRUFDbkIsU0FBd0IsRUFDeEIsYUFBc0I7Ozs7O2dCQUVoQixJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFHLFNBQVMsbUJBQVMsUUFBUSxDQUFFLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLElBQUk7b0JBQUUsc0JBQU87Z0JBRWxCLGtDQUFrQztnQkFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyx3REFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtvQkFDeEMsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBa0IsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsK0RBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsK0JBQStCO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrREFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUUzQywyREFBMkQ7Z0JBQzNELElBQUksYUFBYSxJQUFJLElBQUksRUFBRSxDQUFDO29CQUN4QixhQUFhLEdBQUcsNERBQWEsQ0FBQztnQkFDbEMsQ0FBQztnQkFFRCxxQkFBTSwrQ0FBSyxDQUFDLGFBQWEsQ0FBQzs7Z0JBQTFCLFNBQTBCLENBQUM7Ozs7S0FDOUIsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNJLElBQU0sY0FBYyxHQUFHLFVBQU8sSUFBWSxFQUFFLFNBQXdCOzs7OztnQkFFakUsSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBRyxTQUFTLFlBQVMsQ0FBQyxDQUFDO2dCQUU1RCwwRUFBMEU7Z0JBQzFFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQzlCLHNCQUFPO2dCQUNYLENBQUM7Z0JBR1EsQ0FBQyxHQUFHLENBQUM7OztxQkFBRSxFQUFDLEdBQUcsSUFBSTtnQkFDcEIscUJBQU0sYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSx3REFBYSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDOztnQkFBeEUsU0FBd0UsQ0FBQzs7O2dCQURuRCxDQUFDLEVBQUU7Ozs7O0tBR2hDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDSSxJQUFNLHFCQUFxQixHQUFHLFVBQU8sSUFBcUIsRUFBRSxTQUF3Qjs7Ozs7Z0JBQ3ZGLElBQUksQ0FBQyxJQUFJO29CQUFFLHNCQUFPO3NCQUVLLEVBQUosYUFBSTs7O3FCQUFKLG1CQUFJO2dCQUFaLElBQUk7Z0JBQ1gscUJBQU0sYUFBYSxDQUFDLElBQUksRUFBRSx3REFBYSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUM7O2dCQUFoRSxTQUFnRSxDQUFDOzs7Z0JBRGxELElBQUk7Ozs7O0tBRzFCLENBQUM7Ozs7Ozs7VUMxRUY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05xRDtBQUNEO0FBQ2tDO0FBQzlCO0FBQ0E7QUFDWjtBQUNVO0FBRXRELHVDQUF1QztBQUN2QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7OztRQUNwQyxLQUFLLEdBQUcsaUVBQWUsQ0FBQyx1REFBSSxFQUFFLHVEQUFJLENBQUMsQ0FBQztRQUVwQyxjQUFjLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUNsRCxnQkFBZ0IsQ0FDaUIsQ0FBQztRQUV0QyxJQUFJLENBQUMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLHNCQUFPO1FBRTNELEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsYUFBYTtZQUM3QyxXQUFXO1lBQ1gsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3JDLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsaUJBQVUsdURBQUksV0FBUSxDQUFDO1lBQ2pFLGFBQWEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsaUJBQVUsdURBQUksV0FBUSxDQUFDO29DQUdyRCxDQUFDO2dCQUNOLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxFQUFFLEdBQUcsVUFBRyxhQUFhLENBQUMsRUFBRSxtQkFBUyxDQUFDLENBQUUsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztnQkFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBRS9CLElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFM0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7b0JBQ3ZCLElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFDLElBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7b0JBQ25DLElBQU0sS0FBSyxHQUFHLG9FQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMzQywrQ0FBK0M7b0JBQy9DLElBQUksU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLHVEQUFJO3dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDL0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxLQUFLLHVEQUFJO3dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO29CQUNqRSxJQUFJLFNBQVMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztvQkFDN0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUM7d0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxDQUFDO2dCQUVILGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7O1lBdEJwQyxzQkFBc0I7WUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLDREQUFTLEVBQUUsQ0FBQyxFQUFFO3dCQUF6QixDQUFDO2FBc0JUO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFRyxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsU0FBUztZQUFFLHNCQUFPO1FBQ3ZCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Ozs7OzhCQUNvQixFQUE1QixXQUFNLENBQUMsTUFBTSxDQUFDLDREQUFhLENBQUM7Ozs2QkFBNUIsZUFBNEI7d0JBQXpDLFNBQVM7d0JBQ2hCLHFCQUFNLG9FQUFjLENBQUMsNERBQVMsRUFBRSxTQUEwQixDQUFDOzt3QkFBM0QsU0FBMkQsQ0FBQzs7O3dCQUR4QyxJQUE0Qjs7O3dCQUdwRCw0REFBNEQ7d0JBQzVELHdEQUFHLENBQUMsS0FBSyxFQUFFLDZEQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsMkRBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RCxrRUFBUSxDQUFDLEtBQUssRUFBRSw2REFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLDJEQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzs7OzthQUMvRCxDQUFDLENBQUM7OztLQUNOLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dyYXBoLXNpbXVsYXRpb25zLy4vc3JjL2FsZ29yaXRobXMvYmZzLnRzIiwid2VicGFjazovL2dyYXBoLXNpbXVsYXRpb25zLy4vc3JjL2FsZ29yaXRobXMvZGppa3N0cmEudHMiLCJ3ZWJwYWNrOi8vZ3JhcGgtc2ltdWxhdGlvbnMvLi9zcmMvY29tbW9uL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly9ncmFwaC1zaW11bGF0aW9ucy8uL3NyYy9jb21tb24vdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZ3JhcGgtc2ltdWxhdGlvbnMvLi9zcmMvZGF0YS1zdHJ1Y3R1cmVzL01pbkhlYXAudHMiLCJ3ZWJwYWNrOi8vZ3JhcGgtc2ltdWxhdGlvbnMvLi9zcmMvZGF0YS1zdHJ1Y3R1cmVzL1F1ZXVlLnRzIiwid2VicGFjazovL2dyYXBoLXNpbXVsYXRpb25zLy4vc3JjL3V0aWxzL2NvbG9yLnRzIiwid2VicGFjazovL2dyYXBoLXNpbXVsYXRpb25zLy4vc3JjL3V0aWxzL2dlbmVyYWwudHMiLCJ3ZWJwYWNrOi8vZ3JhcGgtc2ltdWxhdGlvbnMvLi9zcmMvdXRpbHMvZ3JhcGgudHMiLCJ3ZWJwYWNrOi8vZ3JhcGgtc2ltdWxhdGlvbnMvLi9zcmMvdXRpbHMvaGlnaGxpZ2h0LnRzIiwid2VicGFjazovL2dyYXBoLXNpbXVsYXRpb25zL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dyYXBoLXNpbXVsYXRpb25zL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ncmFwaC1zaW11bGF0aW9ucy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dyYXBoLXNpbXVsYXRpb25zL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ3JhcGgtc2ltdWxhdGlvbnMvLi9wdWJsaWMvc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFsZ29yaXRobVR5cGUsIEdyYXBoLCBIaWdobGlnaHRUeXBlLCBWaXNpdGVkU2V0IH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzJztcbmltcG9ydCB7IFF1ZXVlIH0gZnJvbSAnLi4vZGF0YS1zdHJ1Y3R1cmVzL1F1ZXVlJztcbmltcG9ydCB7IGhpZ2hsaWdodENlbGwgfSBmcm9tICcuLi91dGlscy9oaWdobGlnaHQnO1xuXG4vKipcbiAqIEZpbmRzIHRoZSBzaG9ydGVzdCBwYXRoIHVzaW5nIEJyZWFkdGgtRmlyc3QgU2VhcmNoIChCRlMpIGFsZ29yaXRobSBmcm9tIHN0YXJ0Tm9kZSB0byBlbmROb2RlIGluIHRoZSBnaXZlbiBncmFwaC5cbiAqXG4gKiBAcGFyYW0ge0dyYXBofSBncmFwaCAtIFRoZSBncmFwaCB0byBzZWFyY2guXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RhcnROb2RlIC0gVGhlIHN0YXJ0aW5nIG5vZGUgZm9yIHRoZSBzZWFyY2guXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kTm9kZSAtIFRoZSB0YXJnZXQgbm9kZSB0byBmaW5kIHRoZSBzaG9ydGVzdCBwYXRoIHRvLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgdGhlIHNob3J0ZXN0IHBhdGggaXMgZm91bmQgYW5kIGhpZ2hsaWdodGVkLlxuICovXG5leHBvcnQgY29uc3QgYmZzID0gYXN5bmMgKGdyYXBoOiBHcmFwaCwgc3RhcnROb2RlOiBzdHJpbmcsIGVuZE5vZGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIEluaXRpYWxpemUgdmlzaXRlZCBzZXQsIHF1ZXVlIGFuZCBwYXJlbnQgbWFwLlxuICAgIGNvbnN0IHZpc2l0ZWQ6IFZpc2l0ZWRTZXQgPSB7fTtcbiAgICBjb25zdCBxdWV1ZSA9IG5ldyBRdWV1ZTxzdHJpbmc+KCk7XG4gICAgY29uc3QgcGFyZW50TWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bGwgfSA9IHsgW3N0YXJ0Tm9kZV06IG51bGwgfTtcblxuICAgIC8vIEFkZCBzdGFydE5vZGUgdG8gcXVldWUuXG4gICAgcXVldWUuZW5xdWV1ZShzdGFydE5vZGUpO1xuICAgIHZpc2l0ZWRbc3RhcnROb2RlXSA9IHRydWU7XG5cbiAgICB3aGlsZSAocXVldWUuZ2V0U2l6ZSgpID4gMCkge1xuICAgICAgICAvLyBEZXF1ZXVlIG5vZGUuXG4gICAgICAgIGNvbnN0IGN1cnJlbnROb2RlID0gcXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICBhd2FpdCBoaWdobGlnaHRDZWxsKGN1cnJlbnROb2RlLCBIaWdobGlnaHRUeXBlLlZpc2l0ZWQsIEFsZ29yaXRobVR5cGUuQmZzKTtcblxuICAgICAgICAvLyBIaWdodGxpZ2h0IHNob3J0ZXN0IHBhdGggaWYgZW5kTm9kZSBpcyByZWFjaGVkLlxuICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IGVuZE5vZGUpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICB3aGlsZSAoY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGF3YWl0IGhpZ2hsaWdodENlbGwoY3VycmVudCwgSGlnaGxpZ2h0VHlwZS5TaG9ydGVzdFBhdGgsIEFsZ29yaXRobVR5cGUuQmZzKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gcGFyZW50TWFwW2N1cnJlbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXhwbG9yZSBuZWlnaGJvcnMgb2YgdGhlIGN1cnJlbnQgbm9kZVxuICAgICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIGdyYXBoW2N1cnJlbnROb2RlXSkge1xuICAgICAgICAgICAgaWYgKHZpc2l0ZWRbbmVpZ2hib3Iubm9kZV0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgcXVldWUuZW5xdWV1ZShuZWlnaGJvci5ub2RlKTtcbiAgICAgICAgICAgIHZpc2l0ZWRbbmVpZ2hib3Iubm9kZV0gPSB0cnVlO1xuICAgICAgICAgICAgcGFyZW50TWFwW25laWdoYm9yLm5vZGVdID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICBhd2FpdCBoaWdobGlnaHRDZWxsKG5laWdoYm9yLm5vZGUsIEhpZ2hsaWdodFR5cGUuVmlzaXRpbmcsIEFsZ29yaXRobVR5cGUuQmZzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGVuZE5vZGUgaXMgbm90IHJlYWNoYWJsZSBmcm9tIHN0YXJ0Tm9kZVxuICAgIHJldHVybjtcbn07XG4iLCJpbXBvcnQgeyBERUZBVUxUX0RFTEFZIH0gZnJvbSAnLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBBbGdvcml0aG1UeXBlLCBHcmFwaCwgSGVhcE5vZGUsIEhpZ2hsaWdodFR5cGUgfSBmcm9tICcuLi9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgTWluSGVhcCwgaGVhcE5vZGVDb21wYXJhdG9yIH0gZnJvbSAnLi4vZGF0YS1zdHJ1Y3R1cmVzL01pbkhlYXAnO1xuaW1wb3J0IHsgaGlnaGxpZ2h0Q2VsbCB9IGZyb20gJy4uL3V0aWxzL2hpZ2hsaWdodCc7XG5cbi8qKlxuICogRmluZHMgdGhlIHNob3J0ZXN0IHBhdGggdXNpbmcgRGlqa3N0cmEncyBhbGdvcml0aG0gZnJvbSBzdGFydE5vZGUgdG8gZW5kTm9kZSBpbiB0aGUgZ2l2ZW4gZ3JhcGguXG4gKlxuICogQHBhcmFtIHtHcmFwaH0gZ3JhcGggLSBUaGUgZ3JhcGggdG8gc2VhcmNoLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXJ0Tm9kZSAtIFRoZSBzdGFydGluZyBub2RlIGZvciB0aGUgc2VhcmNoLlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZE5vZGUgLSBUaGUgdGFyZ2V0IG5vZGUgdG8gZmluZCB0aGUgc2hvcnRlc3QgcGF0aCB0by5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIHRoZSBzaG9ydGVzdCBwYXRoIGlzIGZvdW5kIGFuZCBoaWdobGlnaHRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGRpamtzdHJhID0gYXN5bmMgKGdyYXBoOiBHcmFwaCwgc3RhcnROb2RlOiBzdHJpbmcsIGVuZE5vZGU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGRpc3RhbmNlczogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xuICAgIGNvbnN0IHByZXZpb3VzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IG51bGwgfSA9IHt9O1xuICAgIGNvbnN0IHZpc2l0ZWQ6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG5cbiAgICAvLyBJbml0aWFsaXplIGRpc3RhbmNlcyBhbmQgcHJldmlvdXNcbiAgICBPYmplY3Qua2V5cyhncmFwaCkuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICBkaXN0YW5jZXNbbm9kZV0gPSBJbmZpbml0eTtcbiAgICAgICAgcHJldmlvdXNbbm9kZV0gPSBudWxsO1xuICAgIH0pO1xuXG4gICAgLy8gU2V0IGRpc3RhbmNlIHRvIHRoZSBzdGFydE5vZGUgYXMgMFxuICAgIGRpc3RhbmNlc1tzdGFydE5vZGVdID0gMDtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIG1pbiBoZWFwIHdpdGggdGhlIHN0YXJ0IG5vZGVcbiAgICBjb25zdCBoZWFwID0gbmV3IE1pbkhlYXA8SGVhcE5vZGU+KGhlYXBOb2RlQ29tcGFyYXRvcik7XG4gICAgaGVhcC5hZGQoeyBub2RlOiBzdGFydE5vZGUsIHByaW9yaXR5OiAwIH0pO1xuXG4gICAgd2hpbGUgKCFoZWFwLmlzRW1wdHkoKSkge1xuICAgICAgICBjb25zdCB7IG5vZGU6IGN1cnJlbnROb2RlIH0gPSBoZWFwLnBvcCgpITtcbiAgICAgICAgdmlzaXRlZFtjdXJyZW50Tm9kZV0gPSB0cnVlO1xuXG4gICAgICAgIGF3YWl0IGhpZ2hsaWdodENlbGwoXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSxcbiAgICAgICAgICAgIEhpZ2hsaWdodFR5cGUuVmlzaXRpbmcsXG4gICAgICAgICAgICBBbGdvcml0aG1UeXBlLkRqaWtzdHJhLFxuICAgICAgICAgICAgTWF0aC5sb2cyKE9iamVjdC5rZXlzKGdyYXBoKS5sZW5ndGgpICogREVGQVVMVF9ERUxBWSxcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY3VycmVudE5vZGUgPT09IGVuZE5vZGUpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gZW5kTm9kZTtcbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgaGlnaGxpZ2h0Q2VsbChjdXJyZW50LCBIaWdobGlnaHRUeXBlLlNob3J0ZXN0UGF0aCwgQWxnb3JpdGhtVHlwZS5Eamlrc3RyYSk7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHByZXZpb3VzW2N1cnJlbnRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBuZWlnaGJvciBvZiBncmFwaFtjdXJyZW50Tm9kZV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHsgbm9kZSwgZGlzdGFuY2UgfSA9IG5laWdoYm9yO1xuICAgICAgICAgICAgaWYgKHZpc2l0ZWRbbm9kZV0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgY29uc3QgbmV3RGlzdGFuY2UgPSBkaXN0YW5jZXNbY3VycmVudE5vZGVdICsgZGlzdGFuY2U7XG5cbiAgICAgICAgICAgIC8vIElmIGEgc2hvcnRlciBwYXRoIGlzIGZvdW5kLlxuICAgICAgICAgICAgaWYgKG5ld0Rpc3RhbmNlIDwgZGlzdGFuY2VzW25vZGVdKSB7XG4gICAgICAgICAgICAgICAgZGlzdGFuY2VzW25vZGVdID0gbmV3RGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNbbm9kZV0gPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBoZWFwLmFkZCh7IG5vZGUsIHByaW9yaXR5OiBuZXdEaXN0YW5jZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGhpZ2hsaWdodENlbGwoY3VycmVudE5vZGUsIEhpZ2hsaWdodFR5cGUuVmlzaXRlZCwgQWxnb3JpdGhtVHlwZS5Eamlrc3RyYSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGVuZE5vZGUgaXMgbm90IHJlYWNoYWJsZSwgcmV0dXJuIGFuIGVtcHR5IGFycmF5XG4gICAgcmV0dXJuO1xufTtcbiIsImltcG9ydCB7IEhpZ2hsaWdodFR5cGUgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBEZWZhdWx0IGRlbGF5IGluIG1pbGxpc2Vjb25kcyBmb3IgdmlzdWFsaXphdGlvbnMuXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9ERUxBWSA9IDEwO1xuXG4vKipcbiAqIE51bWJlciBvZiByb3dzIGluIHRoZSBncmlkLlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IFJPV1MgPSAxNTtcblxuLyoqXG4gKiBOdW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgZ3JpZC5cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBDT0xTID0gMTU7XG5cbi8qKlxuICogVG90YWwgbnVtYmVyIG9mIGNlbGxzIGluIHRoZSBncmlkLlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IEdSSURfU0laRSA9IFJPV1MgKiBDT0xTO1xuXG4vKipcbiAqIEluZGV4IG9mIHRoZSBzdGFydCBub2RlIGluIHRoZSBncmlkLlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IFNUQVJUX05PREUgPSAwO1xuXG4vKipcbiAqIEluZGV4IG9mIHRoZSBlbmQgbm9kZSBpbiB0aGUgZ3JpZC5cbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBFTkRfTk9ERSA9IDIyNDtcblxuLyoqXG4gKiBNYXhpbXVtIGRpc3RhbmNlIHVzZWQgaW4gY2FsY3VsYXRpb25zLlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IE1BWF9ESVNUQU5DRSA9IDEwO1xuXG4vKipcbiAqIENTUyBjbGFzc2VzIHVzZWQgZm9yIGRpZmZlcmVudCBoaWdobGlnaHQgdHlwZXMuXG4gKiBAdHlwZSB7UmVjb3JkPEhpZ2hsaWdodFR5cGUsIHN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRDbGFzc2VzID0ge1xuICAgIFtIaWdobGlnaHRUeXBlLlVudmlzaXRlZF06ICd1bnZpc2l0ZWQnLFxuICAgIFtIaWdobGlnaHRUeXBlLlZpc2l0aW5nXTogJ3Zpc2l0aW5nJyxcbiAgICBbSGlnaGxpZ2h0VHlwZS5WaXNpdGVkXTogJ3Zpc2l0ZWQnLFxuICAgIFtIaWdobGlnaHRUeXBlLlNob3J0ZXN0UGF0aF06ICdzaG9ydGVzdC1wYXRoJyxcbn07XG5cbi8vIFJHQiBDb2xvciB2YWx1ZXMuXG5leHBvcnQgY29uc3QgVFVSUVVPSVNFX0NPTE9SID0geyByOiA2NCwgZzogMjI0LCBiOiAyMDggfTtcbmV4cG9ydCBjb25zdCBNQUdFTlRBX0NPTE9SID0geyByOiAxMzksIGc6IDAsIGI6IDEzOSB9O1xuZXhwb3J0IGNvbnN0IEJMVUVfQ09MT1IgPSB7IHI6IDAsIGc6IDAsIGI6IDI1NSB9O1xuZXhwb3J0IGNvbnN0IFJFRF9DT0xPUiA9IHsgcjogMjU1LCBnOiAwLCBiOiAwIH07XG4iLCIvKipcbiAqIFJlcHJlc2VudHMgYSBuZWlnaGJvciBub2RlIGluIGEgZ3JhcGguXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmVpZ2hib3Ige1xuICAgIG5vZGU6IHN0cmluZztcbiAgICBkaXN0YW5jZTogbnVtYmVyO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBncmFwaCB3aGVyZSBlYWNoIG5vZGUgaXMgYXNzb2NpYXRlZCB3aXRoIGEgbGlzdCBvZiBuZWlnaGJvcmluZyBub2Rlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmFwaCB7XG4gICAgW2tleTogc3RyaW5nXTogTmVpZ2hib3JbXTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbWFwcGluZyBvZiBkaXN0YW5jZXMgYmV0d2VlbiBub2Rlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBEaXN0YW5jZXMge1xuICAgIFtrZXk6IHN0cmluZ106IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc2V0IG9mIHZpc2l0ZWQgbm9kZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVmlzaXRlZFNldCB7XG4gICAgW2tleTogc3RyaW5nXTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbm9kZSBpbiBhIGhlYXAgZGF0YSBzdHJ1Y3R1cmUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgSGVhcE5vZGUge1xuICAgIG5vZGU6IHN0cmluZztcbiAgICBwcmlvcml0eTogbnVtYmVyO1xufVxuXG4vKipcbiAqIEVudW1lcmF0ZXMgZGlmZmVyZW50IHR5cGVzIG9mIGNlbGwgaGlnaGxpZ2h0cyBmb3IgdmlzdWFsaXphdGlvbiBwdXJwb3Nlcy5cbiAqL1xuZXhwb3J0IGVudW0gSGlnaGxpZ2h0VHlwZSB7XG4gICAgVW52aXNpdGVkLFxuICAgIFZpc2l0aW5nLFxuICAgIFZpc2l0ZWQsXG4gICAgU2hvcnRlc3RQYXRoLFxufVxuXG4vKipcbiAqIEVudW1lcmF0ZXMgZGlmZmVyZW50IHR5cGVzIG9mIGdyYXBoIHRyYXZlcnNhbCBhbGdvcml0aG1zLlxuICovXG5leHBvcnQgZW51bSBBbGdvcml0aG1UeXBlIHtcbiAgICBCZnMgPSAnYmZzJyxcbiAgICBEamlrc3RyYSA9ICdkamlrc3RyYScsXG59XG4iLCJpbXBvcnQgeyBIZWFwTm9kZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5cbi8qKlxuICogQ29tcGFyYXRvciBmdW5jdGlvbiBmb3IgY29tcGFyaW5nIHR3byBoZWFwIG5vZGVzIGJhc2VkIG9uIHRoZWlyIHByaW9yaXR5LlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHByaW9yaXR5IG9mIGBhYCBpcyBncmVhdGVyIHRoYW4gdGhlIHByaW9yaXR5IG9mIGBiYCwgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gKi9cbmV4cG9ydCBjb25zdCBoZWFwTm9kZUNvbXBhcmF0b3IgPSAoYTogSGVhcE5vZGUsIGI6IEhlYXBOb2RlKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIGEucHJpb3JpdHkgPiBiLnByaW9yaXR5O1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgTWluIEhlYXAgZGF0YSBzdHJ1Y3R1cmUuXG4gKlxuICogQHRlbXBsYXRlIFQgLSBUaGUgdHlwZSBvZiBlbGVtZW50cyBzdG9yZWQgaW4gdGhlIGhlYXAuXG4gKi9cbmV4cG9ydCBjbGFzcyBNaW5IZWFwPFQ+IHtcbiAgICBwcml2YXRlIGhlYXA6IFRbXTtcbiAgICBwcml2YXRlIGNvbXBhcmF0b3I6IChhOiBULCBiOiBUKSA9PiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IoY29tcGFyYXRvcjogKGE6IFQsIGI6IFQpID0+IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5oZWFwID0gW107XG4gICAgICAgIHRoaXMuY29tcGFyYXRvciA9IGNvbXBhcmF0b3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMZWZ0Q2hpbGRJbmRleChwYXJlbnRJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDIgKiBwYXJlbnRJbmRleCArIDE7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSaWdodENoaWxkSW5kZXgocGFyZW50SW5kZXg6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAyICogcGFyZW50SW5kZXggKyAyO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGFyZW50SW5kZXgoY2hpbGRJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKGNoaWxkSW5kZXggLSAxKSAvIDIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzTGVmdENoaWxkKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGVmdENoaWxkSW5kZXgoaW5kZXgpIDwgdGhpcy5oZWFwLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc1JpZ2h0Q2hpbGQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSaWdodENoaWxkSW5kZXgoaW5kZXgpIDwgdGhpcy5oZWFwLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc1BhcmVudChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhcmVudEluZGV4KGluZGV4KSA+PSAwO1xuICAgIH1cblxuICAgIHByaXZhdGUgbGVmdENoaWxkKGluZGV4OiBudW1iZXIpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcFt0aGlzLmdldExlZnRDaGlsZEluZGV4KGluZGV4KV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByaWdodENoaWxkKGluZGV4OiBudW1iZXIpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcFt0aGlzLmdldFJpZ2h0Q2hpbGRJbmRleChpbmRleCldO1xuICAgIH1cblxuICAgIHByaXZhdGUgcGFyZW50KGluZGV4OiBudW1iZXIpOiBUIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcFt0aGlzLmdldFBhcmVudEluZGV4KGluZGV4KV07XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzd2FwKGk6IG51bWJlciwgajogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRlbXA6IFQgPSB0aGlzLmhlYXBbaV07XG4gICAgICAgIHRoaXMuaGVhcFtpXSA9IHRoaXMuaGVhcFtqXTtcbiAgICAgICAgdGhpcy5oZWFwW2pdID0gdGVtcDtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWFwLmxlbmd0aCA9PSAwO1xuICAgIH1cblxuICAgIHBlZWsoKTogVCB8IG51bGwge1xuICAgICAgICBpZiAodGhpcy5oZWFwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhcFswXTtcbiAgICB9XG5cbiAgICBwb3AoKTogVCB8IG51bGwge1xuICAgICAgICBpZiAodGhpcy5oZWFwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXRlbTogVCA9IHRoaXMuaGVhcFswXTtcbiAgICAgICAgdGhpcy5oZWFwWzBdID0gdGhpcy5oZWFwW3RoaXMuaGVhcC5sZW5ndGggLSAxXTtcbiAgICAgICAgdGhpcy5oZWFwLnBvcCgpO1xuICAgICAgICB0aGlzLmhlYXBpZnlEb3duKCk7XG4gICAgICAgIHJldHVybiBpdGVtO1xuICAgIH1cblxuICAgIGFkZChpdGVtOiBUKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGVhcC5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLmhlYXBpZnlVcCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGVhcGlmeVVwKCk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuaGVhcC5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAodGhpcy5oYXNQYXJlbnQoaW5kZXgpICYmIHRoaXMuY29tcGFyYXRvcih0aGlzLnBhcmVudChpbmRleCksIHRoaXMuaGVhcFtpbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLnN3YXAodGhpcy5nZXRQYXJlbnRJbmRleChpbmRleCksIGluZGV4KTtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5nZXRQYXJlbnRJbmRleChpbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhlYXBpZnlEb3duKCk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IDA7XG4gICAgICAgIHdoaWxlICh0aGlzLmhhc0xlZnRDaGlsZChpbmRleCkpIHtcbiAgICAgICAgICAgIGxldCBzbWFsbGVyQ2hpbGRJbmRleDogbnVtYmVyID0gdGhpcy5nZXRMZWZ0Q2hpbGRJbmRleChpbmRleCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdGhpcy5oYXNSaWdodENoaWxkKGluZGV4KSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyYXRvcih0aGlzLnJpZ2h0Q2hpbGQoaW5kZXgpLCB0aGlzLmxlZnRDaGlsZChpbmRleCkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzbWFsbGVyQ2hpbGRJbmRleCA9IHRoaXMuZ2V0UmlnaHRDaGlsZEluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5jb21wYXJhdG9yKHRoaXMuaGVhcFtpbmRleF0sIHRoaXMuaGVhcFtzbWFsbGVyQ2hpbGRJbmRleF0pKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3dhcChpbmRleCwgc21hbGxlckNoaWxkSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5kZXggPSBzbWFsbGVyQ2hpbGRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKlxuICogUmVwcmVzZW50cyBhIG5vZGUgaW4gdGhlIHF1ZXVlLlxuICovXG5jbGFzcyBRdWV1ZU5vZGU8VD4ge1xuICAgIGRhdGE6IFQ7XG4gICAgbmV4dDogUXVldWVOb2RlPFQ+IHwgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IFQpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHF1ZXVlIGRhdGEgc3RydWN0dXJlLlxuICovXG5leHBvcnQgY2xhc3MgUXVldWU8VD4ge1xuICAgIHByaXZhdGUgaGVhZDogUXVldWVOb2RlPFQ+IHwgbnVsbDtcbiAgICBwcml2YXRlIHRhaWw6IFF1ZXVlTm9kZTxUPiB8IG51bGw7XG4gICAgcHJpdmF0ZSBzaXplOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5oZWFkID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWlsID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGFuIGVsZW1lbnQgdG8gdGhlIGVuZCBvZiB0aGUgcXVldWUuXG4gICAgICogQHBhcmFtIHtUfSBkYXRhIC0gVGhlIGRhdGEgdG8gYmUgYWRkZWQgdG8gdGhlIHF1ZXVlLlxuICAgICAqL1xuICAgIGVucXVldWUoZGF0YTogVCk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXdOb2RlID0gbmV3IFF1ZXVlTm9kZTxUPihkYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIHRoaXMudGFpbCA9IG5ld05vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhaWwubmV4dCA9IG5ld05vZGU7XG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBuZXdOb2RlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2l6ZSsrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYW5kIHJldHVybnMgdGhlIGVsZW1lbnQgYXQgdGhlIGZyb250IG9mIHRoZSBxdWV1ZS5cbiAgICAgKiBAcmV0dXJucyB7VCB8IG51bGx9IFRoZSBkYXRhIG9mIHRoZSBlbGVtZW50IHJlbW92ZWQgZnJvbSB0aGUgcXVldWUsIG9yIG51bGwgaWYgdGhlIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIGRlcXVldWUoKTogVCB8IG51bGwge1xuICAgICAgICBpZiAoIXRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcmVtb3ZlZE5vZGUgPSB0aGlzLmhlYWQ7XG4gICAgICAgIHRoaXMuaGVhZCA9IHRoaXMuaGVhZC5uZXh0O1xuICAgICAgICBpZiAodGhpcy5zaXplID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRhaWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2l6ZS0tO1xuICAgICAgICByZXR1cm4gcmVtb3ZlZE5vZGUuZGF0YTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBlbGVtZW50IGF0IHRoZSBmcm9udCBvZiB0aGUgcXVldWUgd2l0aG91dCByZW1vdmluZyBpdC5cbiAgICAgKiBAcmV0dXJucyB7VCB8IG51bGx9IFRoZSBkYXRhIG9mIHRoZSBlbGVtZW50IGF0IHRoZSBmcm9udCBvZiB0aGUgcXVldWUsIG9yIG51bGwgaWYgdGhlIHF1ZXVlIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIHBlZWsoKTogVCB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplID8gdGhpcy5oZWFkLmRhdGEgOiBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgcXVldWUuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgcXVldWUuXG4gICAgICovXG4gICAgZ2V0U2l6ZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgcXVldWUgaXMgZW1wdHkuXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHF1ZXVlIGlzIGVtcHR5LCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0IGFsbCBlbGVtZW50cyBvZiB0aGUgcXVldWUuXG4gICAgICovXG4gICAgbGlzdCgpOiBUW10ge1xuICAgICAgICBjb25zdCBsaXN0OiBUW10gPSBbXTtcbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLmhlYWQ7XG4gICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBsaXN0LnB1c2goY3VycmVudC5kYXRhKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50Lm5leHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBxdWV1ZSwgcmVtb3ZpbmcgYWxsIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhlYWQgPSBudWxsO1xuICAgICAgICB0aGlzLnRhaWwgPSBudWxsO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE1BR0VOVEFfQ09MT1IsIE1BWF9ESVNUQU5DRSwgVFVSUVVPSVNFX0NPTE9SIH0gZnJvbSAnLi4vY29tbW9uL2NvbnN0YW50cyc7XG5cbi8qKlxuICogQ2FsY3VsYXRlcyBhbmQgcmV0dXJucyBhIGNvbG9yIGJhc2VkIG9uIGEgZ2l2ZW4gZGlzdGFuY2UuXG4gKiBUaGUgY29sb3IgaXMgaW50ZXJwb2xhdGVkIGJldHdlZW4gdHVycXVvaXNlIGFuZCBtYWdlbnRhIGJhc2VkIG9uIHRoZSBub3JtYWxpemVkIGRpc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkaXN0YW5jZSAtIFRoZSBkaXN0YW5jZSB2YWx1ZSB1c2VkIHRvIGRldGVybWluZSB0aGUgY29sb3IuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgaW50ZXJwb2xhdGVkIGNvbG9yIGluIFJHQiBmb3JtYXQgKGUuZy4sIFwicmdiKDI1NSwgMCwgMClcIikuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb2xvckJ5RGlzdGFuY2UgPSAoZGlzdGFuY2U6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gICAgLy8gTm9ybWFsaXplIGRpc3RhbmNlIHRvIGEgc2NhbGUgb2YgMCB0byAxXG4gICAgY29uc3Qgbm9ybWFsaXplZERpc3RhbmNlID0gZGlzdGFuY2UgLyBNQVhfRElTVEFOQ0U7XG4gICAgY29uc3Qgc3RhcnRDb2xvciA9IFRVUlFVT0lTRV9DT0xPUjtcbiAgICBjb25zdCBlbmRDb2xvciA9IE1BR0VOVEFfQ09MT1I7XG5cbiAgICAvLyBDYWxjdWxhdGUgaW50ZXJtZWRpYXRlIGNvbG9yIGJhc2VkIG9uIGRpc3RhbmNlXG4gICAgY29uc3QgciA9IE1hdGgucm91bmQoc3RhcnRDb2xvci5yICsgKGVuZENvbG9yLnIgLSBzdGFydENvbG9yLnIpICogbm9ybWFsaXplZERpc3RhbmNlKTtcbiAgICBjb25zdCBnID0gTWF0aC5yb3VuZChzdGFydENvbG9yLmcgKyAoZW5kQ29sb3IuZyAtIHN0YXJ0Q29sb3IuZykgKiBub3JtYWxpemVkRGlzdGFuY2UpO1xuICAgIGNvbnN0IGIgPSBNYXRoLnJvdW5kKHN0YXJ0Q29sb3IuYiArIChlbmRDb2xvci5iIC0gc3RhcnRDb2xvci5iKSAqIG5vcm1hbGl6ZWREaXN0YW5jZSk7XG5cbiAgICByZXR1cm4gYHJnYigke3J9LCR7Z30sJHtifSlgO1xufTtcbiIsImltcG9ydCB7IE1BWF9ESVNUQU5DRSB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuXG5leHBvcnQgY29uc3QgZGVsYXkgPSAobXM6IG51bWJlcikgPT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gZGlzdGFuY2UgYmV0d2VlbiAwIGFuZCBNQVhfRElTVEFOQ0UuXG4gKi9cbmV4cG9ydCBjb25zdCByYW5kb21EaXN0YW5jZSA9ICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIE1BWF9ESVNUQU5DRSkgKyAxO1xuIiwiaW1wb3J0IHsgcmFuZG9tRGlzdGFuY2UgfSBmcm9tICcuL2dlbmVyYWwnO1xuaW1wb3J0IHsgRGlzdGFuY2VzLCBHcmFwaCB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGdyaWQgZ3JhcGggd2l0aCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3dzIC0gVGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBncmlkLlxuICogQHBhcmFtIHtudW1iZXJ9IGNvbHMgLSBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGdyaWQuXG4gKiBAcmV0dXJucyB7R3JhcGh9IFRoZSBjcmVhdGVkIGdyaWQgZ3JhcGggcmVwcmVzZW50ZWQgYXMgYW4gYWRqYWNlbmN5IGxpc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVHcmlkR3JhcGggPSAocm93czogbnVtYmVyLCBjb2xzOiBudW1iZXIpOiBHcmFwaCA9PiB7XG4gICAgY29uc3QgZ3JhcGg6IEdyYXBoID0ge307XG4gICAgY29uc3Qgc2l6ZSA9IHJvd3MgKiBjb2xzO1xuICAgIGNvbnN0IGRpc3RhbmNlczogRGlzdGFuY2VzID0ge307XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBncmFwaFtpXSA9IFtdOyAvLyBJbml0aWFsaXplIGVhY2ggbm9kZSB3aXRoIGFuIGVtcHR5IGFycmF5IG9mIG5laWdoYm9yc1xuXG4gICAgICAgIC8vIERpcmVjdCBuZWlnaGJvcnNcbiAgICAgICAgY29uc3QgdXAgPSBpIC0gY29scztcbiAgICAgICAgY29uc3QgZG93biA9IGkgKyBjb2xzO1xuICAgICAgICBjb25zdCBsZWZ0ID0gaSAlIGNvbHMgIT09IDAgPyBpIC0gMSA6IC0xOyAvLyBDaGVjayBpZiBub2RlIGlzIHRoZSBsZWZ0bW9zdCBub2RlIGluIGdyaWQuXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gKGkgKyAxKSAlIGNvbHMgIT09IDAgPyBpICsgMSA6IC0xOyAvLyBDaGVjayBpZiBub2RlIGlzIHRoZSByaWdodG1vc3Qgbm9kZSBpbiBncmlkLlxuXG4gICAgICAgIGlmICh1cCA+PSAwKVxuICAgICAgICAgICAgZ3JhcGhbaV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgbm9kZTogdXAudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogZ2V0RGlzdGFuY2UoZGlzdGFuY2VzLCB1cC50b1N0cmluZygpLCBpLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGRvd24gPCBzaXplKVxuICAgICAgICAgICAgZ3JhcGhbaV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgbm9kZTogZG93bi50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiBnZXREaXN0YW5jZShkaXN0YW5jZXMsIGRvd24udG9TdHJpbmcoKSwgaS50b1N0cmluZygpKSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChsZWZ0ICE9PSAtMSlcbiAgICAgICAgICAgIGdyYXBoW2ldLnB1c2goe1xuICAgICAgICAgICAgICAgIG5vZGU6IGxlZnQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogZ2V0RGlzdGFuY2UoZGlzdGFuY2VzLCBsZWZ0LnRvU3RyaW5nKCksIGkudG9TdHJpbmcoKSksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmlnaHQgIT09IC0xKVxuICAgICAgICAgICAgZ3JhcGhbaV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgbm9kZTogcmlnaHQudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogZ2V0RGlzdGFuY2UoZGlzdGFuY2VzLCByaWdodC50b1N0cmluZygpLCBpLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyYXBoO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBub2RlcyBpbiBhIGdyYXBoLlxuICogSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIG5vZGVzIGlzIG5vdCBhbHJlYWR5IGNhbGN1bGF0ZWQsIGl0IGdlbmVyYXRlcyBhIHJhbmRvbSBkaXN0YW5jZSBhbmQgc3RvcmVzIGl0IGluIHRoZSBkaXN0YW5jZXMgb2JqZWN0LlxuICogVGhpcyBwcmV2ZW50cyBhZGphY2VudCBub2RlcyB0byBoYXZlIGRpZmZlcmVudCBkaXN0YW5jZXMuXG4gKlxuICogQHBhcmFtIHtEaXN0YW5jZXN9IGRpc3RhbmNlcyAtIFRoZSBkaXN0YW5jZXMgb2JqZWN0IHN0b3JpbmcgcHJlY2FsY3VsYXRlZCBkaXN0YW5jZXMgYmV0d2VlbiBub2Rlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBub2RlIC0gVGhlIGluZGV4IG9mIHRoZSBmaXJzdCBub2RlLlxuICogQHBhcmFtIHtzdHJpbmd9IG5laWdoYm9yIC0gVGhlIGluZGV4IG9mIHRoZSBzZWNvbmQgbm9kZS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gbm9kZXMuXG4gKi9cbmNvbnN0IGdldERpc3RhbmNlID0gKGRpc3RhbmNlczogRGlzdGFuY2VzLCBub2RlOiBzdHJpbmcsIG5laWdoYm9yOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIC8vIEdlbmVyYXRlIGtleSAtPiBlZzogbm9kZSA9ICc1JywgbmVpZ2hib3IgPSAnMScsIGtleSA9ICcxLDUnLlxuICAgIGNvbnN0IGtleSA9IHBhcnNlSW50KG5vZGUpIDwgcGFyc2VJbnQobmVpZ2hib3IpID8gbm9kZSArICcsJyArIG5laWdoYm9yIDogbmVpZ2hib3IgKyAnLCcgKyBub2RlO1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIG5vZGVzIGlzIGFscmVhZHkgY2FsY3VsYXRlZC5cbiAgICBpZiAoIShrZXkgaW4gZGlzdGFuY2VzKSkge1xuICAgICAgICAvLyBJZiBub3QsIGdlbmVyYXRlIGEgcmFuZG9tIGRpc3RhbmNlIGFuZCBzdG9yZSBpdCBpbiB0aGUgZGlzdGFuY2VzIG9iamVjdC5cbiAgICAgICAgZGlzdGFuY2VzW2tleV0gPSByYW5kb21EaXN0YW5jZSgpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgbm9kZXNcbiAgICByZXR1cm4gZGlzdGFuY2VzW2tleV07XG59O1xuIiwiaW1wb3J0IHsgREVGQVVMVF9ERUxBWSwgaGlnaGxpZ2h0Q2xhc3NlcyB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHsgQWxnb3JpdGhtVHlwZSwgSGlnaGxpZ2h0VHlwZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcyc7XG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJy4vZ2VuZXJhbCc7XG5cbi8qKlxuICogSGlnaGxpZ2h0cyBhIG5vZGUgKGNlbGwpIGluIHRoZSBncmlkIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgdHlwZSBmb3IgYSBnaXZlbiBhbGdvcml0aG0uXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5vZGVOYW1lIC0gVGhlIG5hbWUgb2YgdGhlIG5vZGUgKGNlbGwpIHRvIGhpZ2hsaWdodC5cbiAqIEBwYXJhbSB7SGlnaGxpZ2h0VHlwZX0gdHlwZSAtIFRoZSB0eXBlIG9mIGhpZ2hsaWdodCB0byBhcHBseS5cbiAqIEBwYXJhbSB7QWxnb3JpdGhtVHlwZX0gYWxnb3JpdGhtIC0gVGhlIGFsZ29yaXRobSBhc3NvY2lhdGVkIHdpdGggdGhlIGdyaWQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2RlbGF5RHVyYXRpb25dIC0gT3B0aW9uYWwuIFRoZSBkdXJhdGlvbiB0byBkZWxheSBiZWZvcmUgYXBwbHlpbmcgdGhlIGhpZ2hsaWdodCwgaW4gbWlsbGlzZWNvbmRzLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgdGhlIGNlbGwgaXMgaGlnaGxpZ2h0ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBoaWdobGlnaHRDZWxsID0gYXN5bmMgKFxuICAgIG5vZGVOYW1lOiBzdHJpbmcsXG4gICAgdHlwZTogSGlnaGxpZ2h0VHlwZSxcbiAgICBhbGdvcml0aG06IEFsZ29yaXRobVR5cGUsXG4gICAgZGVsYXlEdXJhdGlvbj86IG51bWJlcixcbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHthbGdvcml0aG19LWNlbGwtJHtub2RlTmFtZX1gKTtcbiAgICBpZiAoIWNlbGwpIHJldHVybjtcblxuICAgIC8vIFJlbW92ZSBhbnkgZXhpc3RpbmcgaGlnaGxpZ2h0cy5cbiAgICBPYmplY3Qua2V5cyhIaWdobGlnaHRUeXBlKS5mb3JFYWNoKChoVHlwZUtleSkgPT4ge1xuICAgICAgICBjb25zdCBoVHlwZSA9IE51bWJlcihoVHlwZUtleSkgYXMgSGlnaGxpZ2h0VHlwZTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKGhpZ2hsaWdodENsYXNzZXNbaFR5cGVdKTtcbiAgICB9KTtcblxuICAgIC8vIEFkZCB0aGUgbmV3IGhpZ2hsaWdodCBjbGFzcy5cbiAgICBjZWxsLmNsYXNzTGlzdC5hZGQoaGlnaGxpZ2h0Q2xhc3Nlc1t0eXBlXSk7XG5cbiAgICAvLyBJZiBkZWxheUR1cmF0aW9uIGlzIG5vdCBwcm92aWRlZCwgdXNlIHRoZSBkZWZhdWx0IGRlbGF5LlxuICAgIGlmIChkZWxheUR1cmF0aW9uID09IG51bGwpIHtcbiAgICAgICAgZGVsYXlEdXJhdGlvbiA9IERFRkFVTFRfREVMQVk7XG4gICAgfVxuXG4gICAgYXdhaXQgZGVsYXkoZGVsYXlEdXJhdGlvbik7XG59O1xuXG4vKipcbiAqIENsZWFycyBoaWdobGlnaHRpbmcgb2YgYWxsIGdyaWQgY2VsbHMgYXNzb2NpYXRlZCB3aXRoIGEgcGFydGljdWxhciBhbGdvcml0aG0uXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNpemUgLSBUaGUgc2l6ZSBvZiB0aGUgZ3JpZC5cbiAqIEBwYXJhbSB7QWxnb3JpdGhtVHlwZX0gYWxnb3JpdGhtIC0gVGhlIGFsZ29yaXRobSBmb3Igd2hpY2ggdGhlIGdyaWQgY2VsbHMgYXJlIGFzc29jaWF0ZWQuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBhbGwgZ3JpZCBjZWxscyBhcmUgY2xlYXJlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNsZWFySGlnaGxpZ2h0ID0gYXN5bmMgKHNpemU6IG51bWJlciwgYWxnb3JpdGhtOiBBbGdvcml0aG1UeXBlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gUmV0cmlldmUgdGhlIGZpcnN0IGNlbGwgYXNzb2NpYXRlZCB3aXRoIHRoZSBhbGdvcml0aG0uXG4gICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2FsZ29yaXRobX0tY2VsbC0wYCk7XG5cbiAgICAvLyBJZiB0aGUgY2VsbCBoYXNuJ3QgYmVlbiBjb2xvcmVkIHlldCAoaS5lLiwgZmlyc3QgcmVuZGVyKSwgcmV0dXJuIGVhcmx5LlxuICAgIGlmIChjZWxsLmNsYXNzTGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIGNlbGwgYW5kIHJlc2V0IGl0cyBoaWdobGlnaHRpbmcgdG8gdW52aXNpdGVkIHN0YXRlLlxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIGF3YWl0IGhpZ2hsaWdodENlbGwoaS50b1N0cmluZygpLCBIaWdobGlnaHRUeXBlLlVudmlzaXRlZCwgYWxnb3JpdGhtLCAwKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIERpc3BsYXlzIHRoZSBzaG9ydGVzdCBwYXRoIG9uIHRoZSBncmlkIGZvciBhIGdpdmVuIGFsZ29yaXRobSBieSBoaWdobGlnaHRpbmcgY2VsbHMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXSB8IG51bGx9IHBhdGggLSBBbiBhcnJheSBvZiBub2RlIG5hbWVzIHJlcHJlc2VudGluZyB0aGUgc2hvcnRlc3QgcGF0aCwgb3IgbnVsbCBpZiBubyBwYXRoIGlzIGZvdW5kLlxuICogQHBhcmFtIHtBbGdvcml0aG1UeXBlfSBhbGdvcml0aG0gLSBUaGUgYWxnb3JpdGhtIGFzc29jaWF0ZWQgd2l0aCB0aGUgZ3JpZC5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyBvbmNlIHRoZSBzaG9ydGVzdCBwYXRoIGlzIGRpc3BsYXllZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGhpZ2hsaWdodFNob3J0ZXN0UGF0aCA9IGFzeW5jIChwYXRoOiBzdHJpbmdbXSB8IG51bGwsIGFsZ29yaXRobTogQWxnb3JpdGhtVHlwZSkgPT4ge1xuICAgIGlmICghcGF0aCkgcmV0dXJuO1xuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIHBhdGgpIHtcbiAgICAgICAgYXdhaXQgaGlnaGxpZ2h0Q2VsbChub2RlLCBIaWdobGlnaHRUeXBlLlNob3J0ZXN0UGF0aCwgYWxnb3JpdGhtKTtcbiAgICB9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVHcmlkR3JhcGggfSBmcm9tICcuLi9zcmMvdXRpbHMvZ3JhcGgnO1xuaW1wb3J0IHsgQWxnb3JpdGhtVHlwZSB9IGZyb20gJy4uL3NyYy9jb21tb24vdHlwZXMnO1xuaW1wb3J0IHsgQ09MUywgRU5EX05PREUsIEdSSURfU0laRSwgUk9XUywgU1RBUlRfTk9ERSB9IGZyb20gJy4uL3NyYy9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCB7IGdldENvbG9yQnlEaXN0YW5jZSB9IGZyb20gJy4uL3NyYy91dGlscy9jb2xvcic7XG5pbXBvcnQgeyBjbGVhckhpZ2hsaWdodCB9IGZyb20gJy4uL3NyYy91dGlscy9oaWdobGlnaHQnO1xuaW1wb3J0IHsgYmZzIH0gZnJvbSAnLi4vc3JjL2FsZ29yaXRobXMvYmZzJztcbmltcG9ydCB7IGRpamtzdHJhIH0gZnJvbSAnLi4vc3JjL2FsZ29yaXRobXMvZGppa3N0cmEnO1xuXG4vLyBTY3JpcHQgdGhhdCBydW5zIHdoZW4gRE9NIGlzIGxvYWRlZC5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgZ3JhcGggPSBjcmVhdGVHcmlkR3JhcGgoUk9XUywgQ09MUyk7XG5cbiAgICBjb25zdCBncmlkQ29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgICAgICdncmlkLWNvbnRhaW5lcicsXG4gICAgKSBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxEaXZFbGVtZW50PjtcblxuICAgIGlmICghZ3JpZENvbnRhaW5lcnMgfHwgZ3JpZENvbnRhaW5lcnMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICBBcnJheS5mcm9tKGdyaWRDb250YWluZXJzKS5mb3JFYWNoKChncmlkQ29udGFpbmVyKSA9PiB7XG4gICAgICAgIC8vIFNldCBDU1MuXG4gICAgICAgIGdyaWRDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdncmlkJztcbiAgICAgICAgZ3JpZENvbnRhaW5lci5zdHlsZS5ncmlkVGVtcGxhdGVDb2x1bW5zID0gYHJlcGVhdCgke0NPTFN9LCAxZnIpYDtcbiAgICAgICAgZ3JpZENvbnRhaW5lci5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gYHJlcGVhdCgke1JPV1N9LCAxZnIpYDtcblxuICAgICAgICAvLyBDcmVhdGUgZ3JpZCBjZWxscyAuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR1JJRF9TSVpFOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNlbGwuaWQgPSBgJHtncmlkQ29udGFpbmVyLmlkfS1jZWxsLSR7aX1gO1xuICAgICAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnZ3JpZC1jZWxsJztcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICAgICAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZjBmMGYwJztcbiAgICAgICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyV2lkdGggPSAnMnB4JztcblxuICAgICAgICAgICAgY29uc3QgbmVpZ2hib3JzID0gZ3JhcGhbaV07XG5cbiAgICAgICAgICAgIG5laWdoYm9ycy5mb3JFYWNoKChuZWlnaGJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVJbmRleCA9IHBhcnNlSW50KG5laWdoYm9yLm5vZGUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gbmVpZ2hib3IuZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgY29uc3QgY29sb3IgPSBnZXRDb2xvckJ5RGlzdGFuY2UoZGlzdGFuY2UpO1xuICAgICAgICAgICAgICAgIC8vIEFwcGx5IGNvbG9yIGJhc2VkIG9uIHRoZSBuZWlnaGJvcidzIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgaWYgKG5vZGVJbmRleCAtIGkgPT09IC1DT0xTKSBjZWxsLnN0eWxlLmJvcmRlclRvcENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVJbmRleCAtIGkgPT09IENPTFMpIGNlbGwuc3R5bGUuYm9yZGVyQm90dG9tQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgICAgICBpZiAobm9kZUluZGV4IC0gaSA9PT0gLTEpIGNlbGwuc3R5bGUuYm9yZGVyTGVmdENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVJbmRleCAtIGkgPT09IDEpIGNlbGwuc3R5bGUuYm9yZGVyUmlnaHRDb2xvciA9IGNvbG9yO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJ1bkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdydW5BbGdvcml0aG1zJyk7XG5cbiAgICBpZiAoIXJ1bkJ1dHRvbikgcmV0dXJuO1xuICAgIHJ1bkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBhbGdvcml0aG0gb2YgT2JqZWN0LnZhbHVlcyhBbGdvcml0aG1UeXBlKSkge1xuICAgICAgICAgICAgYXdhaXQgY2xlYXJIaWdobGlnaHQoR1JJRF9TSVpFLCBhbGdvcml0aG0gYXMgQWxnb3JpdGhtVHlwZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUnVuIGJvdGggYWxnb3JpdGhtcyBzeW5jaHJvbm91c2x5IGFuZCBkaXNwbGF5IHRoZWlyIHBhdGhzXG4gICAgICAgIGJmcyhncmFwaCwgU1RBUlRfTk9ERS50b1N0cmluZygpLCBFTkRfTk9ERS50b1N0cmluZygpKTtcbiAgICAgICAgZGlqa3N0cmEoZ3JhcGgsIFNUQVJUX05PREUudG9TdHJpbmcoKSwgRU5EX05PREUudG9TdHJpbmcoKSk7XG4gICAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==