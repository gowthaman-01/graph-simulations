import { tutorialDataList } from './data';

/**
 * Renders the tutorial content for the specified page number.
 * @param {number} pageNumber - The page number to render.
 * @param {HTMLDivElement} tutorialContentDiv - The div element to render the content into.
 */
export const renderTutorialContent = (pageNumber: number, tutorialContentDiv: HTMLDivElement) => {
    const tutorialData = tutorialDataList[pageNumber - 1];

    const fragment = document.createDocumentFragment();

    const tutorialTitleDiv = document.createElement('div');
    tutorialTitleDiv.innerHTML = tutorialData.title;
    tutorialTitleDiv.classList.add('modal-title');

    const tutorialBodyDiv = document.createElement('div');
    tutorialBodyDiv.innerHTML = tutorialData.body;
    tutorialBodyDiv.classList.add('modal-body');

    fragment.append(tutorialTitleDiv, tutorialBodyDiv);

    if (tutorialData.img) {
        const tutorialImageElement = document.createElement('img');
        tutorialImageElement.src = `./assets/${tutorialData.img.src}.png`;
        tutorialImageElement.style.width = `${tutorialData.img.width}%`;
        tutorialImageElement.style.marginTop = `${tutorialData.img.marginTop}px`;

        fragment.append(tutorialImageElement);
    }

    tutorialContentDiv.innerHTML = '';
    tutorialContentDiv.append(fragment);
};
