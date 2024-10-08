import { HeapNode } from '../common/types';

/**
 * Comparator function for comparing two heap nodes based on their priority.
 *
 * @returns {boolean} `true` if the priority of `a` is greater than the priority of `b`, otherwise `false`.
 */
export const heapNodeComparator = (a: HeapNode, b: HeapNode): boolean => {
    return a.priority > b.priority;
};

/**
 * Represents a Min Heap data structure.
 *
 * @template T - The type of elements stored in the heap.
 */
export class MinHeap<T> {
    private heap: T[];
    private comparator: (a: T, b: T) => boolean;

    constructor(comparator: (a: T, b: T) => boolean) {
        this.heap = [];
        this.comparator = comparator;
    }

    /**
     * Checks if the heap is empty.
     * @returns {boolean} `true` if the heap is empty, otherwise `false`.
     */
    public isEmpty(): boolean {
        return this.heap.length == 0;
    }

    /**
     * Retrieves the top element of the heap without removing it.
     * @returns {T | null} The top element of the heap, or `null` if the heap is empty.
     */
    public peek(): T | null {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    /**
     * Removes and returns the top element of the heap.
     * @returns {[T, number] | null} An array containing the removed element and the number of steps taken to perform the operation, or `null` if the heap is empty.
     */
    public pop(): [T, number] | null {
        if (this.heap.length === 0) {
            return null;
        }
        const top: T = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        let steps = 7;

        steps += this.heapifyDown();

        return [top, steps];
    }

    /**
     * Inserts a new element into the heap.
     * @param {T} item - The element to insert into the heap.
     * @returns {number} The number of steps taken to perform the operation.
     */
    public push(item: T): number {
        this.heap.push(item); // 1 step.
        return this.heapifyUp() + 1;
    }

    /**
     * Returns a list representation of the heap.
     * @returns {T[]} An array containing the elements of the heap.
     */
    public list(): T[] {
        return this.heap;
    }

    private getLeftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    private getRightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    private getParentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    private hasLeftChild(index: number): boolean {
        return this.getLeftChildIndex(index) < this.heap.length;
    }

    private hasRightChild(index: number): boolean {
        return this.getRightChildIndex(index) < this.heap.length;
    }

    private hasParent(index: number): boolean {
        return this.getParentIndex(index) >= 0;
    }

    private leftChild(index: number): T {
        return this.heap[this.getLeftChildIndex(index)];
    }

    private rightChild(index: number): T {
        return this.heap[this.getRightChildIndex(index)];
    }

    private parent(index: number): T {
        return this.heap[this.getParentIndex(index)];
    }

    private swap(i: number, j: number): void {
        const temp: T = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    private heapifyUp(): number {
        let index: number = this.heap.length - 1;
        let steps = 2;

        // Both this.hasParent() and this.parent() take 2 steps each, while heap access and the comparator take 1 step each,
        // resulting in the while condition having a total of 7 steps.
        while (this.hasParent(index) && this.comparator(this.parent(index), this.heap[index])) {
            this.swap(this.getParentIndex(index), index); // 4 steps
            index = this.getParentIndex(index); // 2 steps
            steps += 13;
        }

        return steps;
    }

    private heapifyDown(): number {
        let index: number = 0; // 1 step
        let steps = 1;

        // this.hasLeftChild(), this.hasRightChild() this.leftChild() and this.rightChild() take 2 steps each.
        while (this.hasLeftChild(index)) {
            let smallerChildIndex: number = this.getLeftChildIndex(index);
            steps += 4;

            if (
                this.hasRightChild(index) &&
                this.comparator(this.leftChild(index), this.rightChild(index))
            ) {
                smallerChildIndex = this.getRightChildIndex(index);
                steps += 9;
            }

            if (this.comparator(this.heap[index], this.heap[smallerChildIndex])) {
                this.swap(index, smallerChildIndex);
                steps += 3;
            } else {
                break;
            }

            index = smallerChildIndex;
            steps += 4;
        }
        return steps;
    }
}
