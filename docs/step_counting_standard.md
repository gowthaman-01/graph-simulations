# Step-Counting Standard

This document outlines the step-counting standard used in our codebase for analyzing the performance of algorithms. Note that return values are not assigned any steps.

## 1. Variable Declaration and Initialization

-   Declaring and initializing a variable in a single line counts as one step:
-   **Example**:
    ```javascript
    const total = 0;
    const visited: VisitedSet = [];
    const heap = new MinHeap() < HeapNode > heapNodeComparator;
    ```

## 2. Arithmetic Operations

-   Each basic arithmetic operation (addition, subtraction, multiplication, division) counts as one step:
-   **Example**:

    ```javascript
    let result = current + total + 5;
    ```

-   More complext arithmetic operations may take more steps:
-   **Example**

    ```javascript
    Math.max(nodes[neighbor] - nodes[currentNode], 0); //4 steps
    ```

## 3. Array/Set Operations

-   Assigning a value to an array or set element counts as one step:
    ```javascript
    visited[node] = true;
    ```

## 4. Conditional Statements

### Simple Conditional Statements

-   **Example**:

    ```javascript
    // 1 step for evaluating the condition
    if (a > b) {
        count = count + 1; // 1 step for the body execution
    }
    ```

### Complex Conditional Statements

-   For each individual condition within the statement counts as one step:
-   **Example**:

    ```javascript
    // 3 steps for evaulating the condition
    if (currentNode !== startNode && currentNode !== endNode) {
        // Condition body
    }
    ```

## 5. Loop Operations

-   Each iteration of the loop condition check counts as one step:
-   **Example**:
    ```javascript
    // 1 step per iteration for condition check
    for (let i = 0; i < 5; i++) {
        // Loop body
    }
    ```

## 6. Complex operations

### Dequeue

The dequeue function is counted as at most 6 steps:

```javascript
dequeue(): T | null {
    if (!this.size || !this.head) {  // Step 1: Check if the queue is empty
        return null;
    }
    const removedNode = this.head;   // Step 2: Assign head node to removedNode
    this.head = this.head.next;      // Step 3: Move head to the next node
    if (this.size === 1) {           // Step 4: Check if there was only one element in the queue
        this.tail = null;            // Step 5: Set tail to null if there was only one element
    }
    this.size--;                     // Step 6: Decrement the size of the queue
    return removedNode.data;
}
```

### Enqueue

The function involves 4 steps when the queue is empty and 6 steps when the queue is not empty. To account for the worst-case scenario, we consider it as 6 steps:

```javascript
enqueue(data: T): void {
    const newNode = new QueueNode<T>(data);  // Step 1: Create a new queue node
    if (this.size === 0) {                   // Step 2: Check if the queue is empty
        this.head = newNode;                 // Step 3: Assign the new node to head
        this.tail = newNode;                 // Step 4: Assign the new node to tail
    } else {
        if (this.tail) {                     // Step 3: Check if the tail exists
            this.tail.next = newNode;        // Step 4: Link the new node to the end of the queue
            this.tail = newNode;             // Step 5: Update the tail to the new node
        }
    }
    this.size++;                             // Step 6: Increment the size of the queue
}
```

Step calculation for priority queue operations are also done in a similar way.
