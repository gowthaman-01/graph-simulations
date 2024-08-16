import { tutorialDataList } from './data';

/**
 * Renders the tutorial content for the specified page number.
 * @param {number} pageNumber - The page number to render.
 * @param {HTMLDivElement} tutorialContentDiv - The div element where the tutorial content will be rendered.
 */
export const renderTutorialContent = (pageNumber: number, tutorialContentDiv: HTMLDivElement) => {
    const tutorialData = tutorialDataList[pageNumber - 1];

    // Create a document fragment to hold the tutorial elements for efficient rendering.
    const fragment = document.createDocumentFragment();

    // Tutorial title.
    const tutorialTitleDiv = document.createElement('div');
    tutorialTitleDiv.innerHTML = tutorialData.title;
    tutorialTitleDiv.classList.add('modal-title');

    // Tutorial body.
    const tutorialBodyDiv = document.createElement('div');
    tutorialBodyDiv.innerHTML = tutorialData.body;
    tutorialBodyDiv.classList.add('modal-body');

    fragment.append(tutorialTitleDiv, tutorialBodyDiv);

    // Tutorial image.
    if (tutorialData.img) {
        const tutorialImageElement = document.createElement('img');
        tutorialImageElement.src = `./assets/${tutorialData.img.src}.png`;
        tutorialImageElement.style.width = `${tutorialData.img.width}%`;
        tutorialImageElement.style.marginTop = `${tutorialData.img.marginTop}px`;

        fragment.append(tutorialImageElement);
    }

    // Clear and update div element with tutorial content.
    tutorialContentDiv.innerHTML = '';
    tutorialContentDiv.append(fragment);
};
