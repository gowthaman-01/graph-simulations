class Draggable {
    node: HTMLElement;

    // Variables to hold the initial position of the node when dragging starts
    originalX: number = 0;
    originalY: number = 0;

    // Variables to hold the offset from the mouse to the top-left corner of the node
    offsetX: number = 0;
    offsetY: number = 0;

    // The bounding rectangle of the node's parent element
    boundRect: DOMRect;

    constructor(nodeId: string) {
        this.node = document.getElementById(nodeId) as HTMLElement;
        this.boundRect = this.node.parentElement!.getBoundingClientRect();
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.node.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);

        // Touch devices
        this.node.addEventListener('touchstart', this.onTouchStart, { passive: false });
        window.addEventListener('touchend', this.onMouseUp);
    }

    onMouseDown = (event: MouseEvent): void => {
        this.startDrag(event.clientX, event.clientY);
        window.addEventListener('mousemove', this.onMouseMove);
    };

    onMouseMove = (event: MouseEvent): void => {
        this.drag(event.clientX, event.clientY);
    };

    // Handler for touch start event
    onTouchStart = (event: TouchEvent): void => {
        // Prevent default behavior like scrolling
        event.preventDefault();
        // Get the first touch point to start dragging
        const touch = event.touches[0];
        this.startDrag(touch.clientX, touch.clientY);
        // Start listening for touch movement
        window.addEventListener('touchmove', this.onTouchMove, { passive: false });
    };

    // Handler for touch movement event
    onTouchMove = (event: TouchEvent): void => {
        // Prevent default behavior like scrolling
        event.preventDefault();
        // Get the first touch point to perform dragging
        const touch = event.touches[0];
        this.drag(touch.clientX, touch.clientY);
    };

    startDrag(x: number, y: number) {
        // Calculate the offset from the mouse/touch to the top-left corner of the node
        this.offsetX = x - this.node.getBoundingClientRect().left;
        this.offsetY = y - this.node.getBoundingClientRect().top;
        // Record the initial position of the node
        this.originalX = this.node.offsetLeft;
        this.originalY = this.node.offsetTop;

        this.node.classList.add('dragging');
    }

    // Update the node's position as it's being dragged
    drag(x: number, y: number) {
        // Calculate new position of the node
        let newX = x - this.offsetX;
        let newY = y - this.offsetY;

        // Snap to the parent's bounds and prevent dragging outside of it
        newX = Math.min(this.boundRect.width - this.node.offsetWidth, Math.max(0, newX));
        newY = Math.min(this.boundRect.height - this.node.offsetHeight, Math.max(0, newY));

        // Apply the new position to the node
        this.node.style.left = newX + 'px';
        this.node.style.top = newY + 'px';
    }

    // End the drag process, remove event listeners, and perform cleanup
    onMouseUp = (): void => {
        // Stop listening for mouse or touch movements
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('touchmove', this.onTouchMove);
        // Remove the 'dragging' class from the node
        this.node.classList.remove('dragging');
    };
}

// Create two instances of the Draggable class, one for each node
new Draggable('start-node');
new Draggable('end-node');
