let data = [];
let index = 0;

fetch('./build/_metadata.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        displayCurrentItem();
        createPageList();
    })
    .catch(error => console.error('Error:', error));

let metadataElement = document.getElementById('metadata');
let imageElement = document.getElementById('image');
let nextButton = document.getElementById('next-button');
let backButton = document.getElementById('back-button');
let pageList = document.getElementById('page-list');

function displayCurrentItem() {
    if (data[index]) {
        metadataElement.innerText = JSON.stringify(data[index], null, 2);
        imageElement.src = "./build/images/" + (index + 1) + ".png";
    } else {
        metadataElement.innerText = 'No more items';
        imageElement.src = '';
        nextButton.disabled = true;
    }
    highlightCurrentPage();
}

nextButton.addEventListener('click', () => {
    index++;
    displayCurrentItem();
});

backButton.addEventListener('click', () => {
    if (index > 0) {
        index--;
        displayCurrentItem();
    }
});

function createPageList() {
    for (let i = 0; i < Math.min(30, data.length); i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i + 1;
        pageButton.addEventListener('click', () => {
            index = i;
            displayCurrentItem();
        });
        pageList.appendChild(pageButton);
    }
}

function highlightCurrentPage() {
    let pageButtons = pageList.children;
    for (let i = 0; i < pageButtons.length; i++) {
        if (i === index) {
            pageButtons[i].classList.add('current');
        } else {
            pageButtons[i].classList.remove('current');
        }
    }
}
