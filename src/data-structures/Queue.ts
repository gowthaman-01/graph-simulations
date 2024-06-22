/**
 * Represents a node in the queue.
 * @template T - The type of elements stored in the node.
 */
class QueueNode<T> {
    data: T;
    next: QueueNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
    }
}

/**
 * Represents a queue data structure.
 * @template T - The type of elements stored in the queue.
 */
export class Queue<T> {
    private head: QueueNode<T> | null;
    private tail: QueueNode<T> | null;
    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    /**
     * Adds an element to the end of the queue.
     * @param {T} data - The data to be added to the queue.
     */
    enqueue(data: T): void {
        const newNode = new QueueNode<T>(data);
        if (this.size === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            if (this.tail) {
                this.tail.next = newNode;
                this.tail = newNode;
            }
        }
        this.size++;
    }

    /**
     * Removes and returns the element at the front of the queue.
     * @returns {T | null} The data of the element removed from the queue, or null if the queue is empty.
     */
    dequeue(): T | null {
        if (!this.size || !this.head) {
            return null;
        }
        const removedNode = this.head;
        this.head = this.head.next;
        if (this.size === 1) {
            this.tail = null;
        }
        this.size--;
        return removedNode.data;
    }

    /**
     * Returns the element at the front of the queue without removing it.
     * @returns {T | null} The data of the element at the front of the queue, or null if the queue is empty.
     */
    peek(): T | null {
        return this.size && this.head ? this.head.data : null;
    }

    /**
     * Returns the number of elements in the queue.
     * @returns {number} The number of elements in the queue.
     */
    getSize(): number {
        return this.size;
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} True if the queue is empty, otherwise false.
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Lists all elements of the queue.
     * @returns {T[]} An array containing all elements of the queue.
     */
    list(): T[] {
        const list: T[] = [];
        let current = this.head;
        while (current !== null) {
            list.push(current.data);
            current = current.next;
        }
        return list;
    }

    /**
     * Clears the queue, removing all elements.
     */
    clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}
