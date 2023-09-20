const accessKey = "wl1XLgUmiaFz7LNIONOe-VQv5FBd4Y8tN2s-DgwpJlc";

let searchText = "";
let pages = 1;

const searchbar = document.querySelector('input');
const searchBtn = document.getElementById('search-button');
const showMore = document.querySelector('.show-more');


searchbar.addEventListener('input', function () {
    
    searchText = document.querySelector('input').value;


    if (searchText.length < 2) {
        for (let j = (document.querySelectorAll('.image').length - 1); j > -1; j--) {
            let images = document.getElementsByClassName('image')[j];
                document.querySelector('.images').removeChild(images);
                document.querySelector('#show-more').classList.add('invisible');
                document.createElement('div').classList.add('images', 'shadow');

            pages = 1;

        }
    }
})
const newDiv = document.querySelector('body').appendChild(document.createElement('div'))
newDiv.classList.add('images')


searchBtn.addEventListener('click', getImages)

async function getImages() {
    const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${searchText}&client_id=${accessKey}`
        
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.map((results) => {
        newDiv.classList.add('images', 'text-center', 'justify-content-center');
        const mainDiv = document.createElement('div');

        mainDiv.classList.add('image', "mx-auto", "shadow", "my-2", "rounded-3", 'bg-light');

        const image = document.createElement('img');

        image.src = results.urls.small;
        mainDiv.appendChild(image);


        const title = document.createElement('p');
        const link = document.createElement('a');


        link.style.textDecoration = "none";
        link.style.color = "black";
        link.href = results.links.html
        title.innerHTML = results.alt_description;
        
        mainDiv.appendChild(link);
        link.appendChild(title);
        newDiv.appendChild(mainDiv);
        
        pages++

    });

    if (pages > 1) {
        document.getElementById('show-more').classList.remove('invisible')
    }
    
}
showMore.addEventListener('click', function () {
    getImages()
})
