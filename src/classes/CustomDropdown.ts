export class CustomDropdown {
    private dropdownButton: HTMLButtonElement;
    private dropdownMenu: HTMLElement;
    private dropdownItems: HTMLCollectionOf<Element>;
    private dropdownArrow: HTMLImageElement;
    private dropdownText: HTMLSpanElement;
    private onSelect: (dataValue: string) => void;
    private _isOpen: boolean;

    private static readonly DOWN_ARROW = './assets/down-arrow.png';
    private static readonly UP_ARROW = './assets/up-arrow.png';

    constructor(
        dropdownButton: HTMLButtonElement,
        dropdownMenu: HTMLElement,
        defaultText: string,
        onSelect: (dataValue: string) => void,
    ) {
        this.dropdownButton = dropdownButton;
        this.dropdownText = document.createElement('span');
        this.dropdownText.textContent = defaultText;
        this.dropdownText.style.pointerEvents = 'none'; // Make span non-interactive
        this.dropdownButton.appendChild(this.dropdownText);
        this.dropdownMenu = dropdownMenu;
        this.dropdownItems = this.dropdownMenu.getElementsByClassName(
            `${this.dropdownMenu.id}-item`,
        );
        this.dropdownArrow = this.createArrowImage();
        this.onSelect = onSelect;
        this._isOpen = false;
        this.init();
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    set isOpen(value: boolean) {
        this._isOpen = value;
        this.updateArrowImage();
    }

    init() {
        this.addButtonEventListeners();

        Array.from(this.dropdownItems).forEach((item: Element) => {
            this.addItemEventListener(item);
        });
    }

    createArrowImage() {
        const arrowImage = document.createElement('img');
        arrowImage.classList.add('dropdown-arrow');
        arrowImage.id = `${this.dropdownButton.id}-arrow`;
        arrowImage.src = CustomDropdown.DOWN_ARROW;
        this.dropdownArrow = arrowImage;
        this.dropdownButton.appendChild(this.dropdownArrow);

        return this.dropdownArrow;
    }

    updateArrowImage() {
        this.dropdownArrow.src = this.isOpen ? CustomDropdown.UP_ARROW : CustomDropdown.DOWN_ARROW;
    }

    addButtonEventListeners() {
        // Toggle dropdown visibility when button is clicked.
        this.dropdownButton.addEventListener('click', () => {
            this.dropdownMenu.classList.toggle('show');
            this.isOpen = !this.isOpen;
        });

        // Close dropdown if clicked outside.
        window.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (
                target &&
                !target.matches(`#${this.dropdownButton.id}`) &&
                this.dropdownArrow &&
                !target.matches(`#${this.dropdownArrow.id}`)
            ) {
                if (this.dropdownMenu.classList.contains('show')) {
                    this.dropdownMenu.classList.remove('show');
                    this.isOpen = false;
                }
            }
        });
    }

    addItemEventListener(item: Element) {
        item.addEventListener('click', () => {
            const dataValue = item.getAttribute('data-value');
            if (dataValue) {
                this.dropdownText.textContent = item.textContent;
                this.onSelect(dataValue);
            }
            this.dropdownMenu.classList.remove('show');
            this.isOpen = false;
        });
    }

    addItem(dataValue: string) {
        // Check if item already exis
        const items = Array.from(this.dropdownItems);
        const itemExists = items.some((item) => item.getAttribute('data-value') === dataValue);
        if (itemExists) {
            return;
        }

        const newItem = document.createElement('div');
        newItem.classList.add(`${this.dropdownMenu.id}-item`, 'dropdown-item');
        newItem.setAttribute('data-value', dataValue);
        newItem.textContent = dataValue;
        this.dropdownMenu.appendChild(newItem);
        this.addItemEventListener(newItem);
    }

    removeItem(dataValue: string) {
        const items = Array.from(this.dropdownItems);
        const itemToRemove = items.find((item) => item.getAttribute('data-value') === dataValue);
        if (itemToRemove) {
            this.dropdownMenu.removeChild(itemToRemove);
        }
    }

    public updateTextContent(dataValue: string) {
        this.dropdownText.textContent = dataValue;
    }
}
