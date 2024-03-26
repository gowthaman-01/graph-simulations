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

    isEmpty(): boolean {
        return this.heap.length == 0;
    }

    peek(): T | null {
        if (this.heap.length === 0) {
            return null;
        }
        return this.heap[0];
    }

    pop(): T | null {
        if (this.heap.length === 0) {
            return null;
        }
        const item: T = this.heap[0];
        this.heap[0] = this.heap[this.heap.length - 1];
        this.heap.pop();
        this.heapifyDown();
        return item;
    }

    add(item: T): void {
        this.heap.push(item);
        this.heapifyUp();
    }

    private heapifyUp(): void {
        let index: number = this.heap.length - 1;
        while (this.hasParent(index) && this.comparator(this.parent(index), this.heap[index])) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    private heapifyDown(): void {
        let index: number = 0;
        while (this.hasLeftChild(index)) {
            let smallerChildIndex: number = this.getLeftChildIndex(index);
            if (
                this.hasRightChild(index) &&
                this.comparator(this.rightChild(index), this.leftChild(index))
            ) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (!this.comparator(this.heap[index], this.heap[smallerChildIndex])) {
                break;
            } else {
                this.swap(index, smallerChildIndex);
            }
            index = smallerChildIndex;
        }
    }
}
