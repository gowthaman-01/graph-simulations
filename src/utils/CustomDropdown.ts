export class CustomDropdown {
    private dropdownButton: HTMLButtonElement;
    private dropdownMenu: HTMLElement;
    private dropdownItems: HTMLCollectionOf<Element>;
    private dropdownArrow: HTMLImageElement | null;
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
        this.dropdownButton.textContent = defaultText;
        this.dropdownMenu = dropdownMenu;
        this.dropdownItems = this.dropdownMenu.getElementsByClassName(
            `${this.dropdownMenu.id}-item`,
        );
        this.onSelect = onSelect;
        this._isOpen = false;
        this.dropdownArrow = null;
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
        this.updateArrowImage();
        this.handleItemSelection();

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

    updateArrowImage() {
        if (!this.dropdownArrow) {
            const arrowImage = document.createElement('img');
            arrowImage.classList.add('dropdown-arrow');
            arrowImage.id = `${this.dropdownButton.id}-arrow`;
            this.dropdownArrow = arrowImage;
        }
        this.dropdownArrow.src = this.isOpen ? CustomDropdown.UP_ARROW : CustomDropdown.DOWN_ARROW;
        this.dropdownButton.appendChild(this.dropdownArrow);
    }

    handleItemSelection() {
        Array.from(this.dropdownItems).forEach((item: Element) => {
            item.addEventListener('click', () => {
                const dataValue = item.getAttribute('data-value');
                if (dataValue) {
                    this.dropdownButton.textContent = item.textContent;
                    this.onSelect(dataValue);
                }
                this.dropdownMenu.classList.remove('show');
                this.isOpen = false;
            });
        });
    }
}
