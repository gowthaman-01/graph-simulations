import { tutorialDataList } from './data';

export const renderTutorialContent = (pageNumber: number, tutorialContentDiv: HTMLDivElement) => {
    const tutorialData = tutorialDataList[pageNumber - 1];
    const tutorialTitleDiv = document.createElement('div');
    const tutorialBodyDiv = document.createElement('div');

    tutorialTitleDiv.innerHTML = tutorialData.title;
    tutorialTitleDiv.classList.add('tutorial-title');

    tutorialBodyDiv.innerHTML = tutorialData.body;
    tutorialBodyDiv.classList.add('tutorial-body');

    tutorialContentDiv.innerHTML = '';
    tutorialContentDiv.append(tutorialTitleDiv, tutorialBodyDiv);

    if (tutorialData.img) {
        const tutorialImageElement = document.createElement('img');
        tutorialImageElement.src = `./assets/${tutorialData.img.src}.png`;
        tutorialImageElement.style.width = `${tutorialData.img.width}%`;
        tutorialImageElement.style.marginTop = `${tutorialData.img.marginTop}px`;
        tutorialContentDiv.append(tutorialImageElement);
    }
};
