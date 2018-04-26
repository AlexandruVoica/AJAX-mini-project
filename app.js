const searchForm = document.querySelector('#search-form');
const searchField = document.querySelector('#search-field');
const resultsContainer = document.querySelector('.results-container');
const submitButton = document.querySelector('#submit-btn');

window.onload = function () {
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    resultsContainer.innerHTML = '';
    let keyword = searchField.value;
    fetchUnspash(keyword);
  });
};

// fetch data from APIs
function fetchUnspash (keyword) {
  const unsplashRequest = new XMLHttpRequest();
  const unsplashClientID = '97b41745c7ab91c3caa42960e2f43ef7daad3921dec3510fe655aee5f4e7a040';
  unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${keyword}`);
  unsplashRequest.setRequestHeader('Authorization', `Client-ID ${unsplashClientID}`);
  unsplashRequest.onload = addPhoto;
  unsplashRequest.send();
}

function addPhoto () {
  let data = JSON.parse(this.responseText);
  let photoURL = '';
  if (data.results.length > 0) {
    photoURL = data.results[0].urls.full;
    resultsContainer.innerHTML = `<img src="${photoURL}" width=300>`;
  } else {
    resultsContainer.innerHTML = `<p>No results found</p>`;
  }
}

