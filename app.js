const searchForm = document.querySelector('#search-form');
const searchField = document.querySelector('#search-field');
// const resultsContainer = document.querySelector('.results-container');
const submitButton = document.querySelector('#submit-btn');

window.onload = function () {
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let keyword = searchField.value;
    fetchUnsplash(keyword);
    fetchNews(keyword);
    fetchWiki(keyword);
  });
};

// fetch data from APIs
function fetchUnsplash (keyword) {
  const unsplashRequest = new XMLHttpRequest();
  const unsplashClientID = '97b41745c7ab91c3caa42960e2f43ef7daad3921dec3510fe655aee5f4e7a040';
  const requestURL = `https://api.unsplash.com/search/photos?` +
                     `orientation=landscape&` +
                     `page=1&` +
                     `query=${keyword}`;
  unsplashRequest.open('GET', requestURL);
  unsplashRequest.setRequestHeader('Authorization', `Client-ID ${unsplashClientID}`);
  unsplashRequest.onload = addPhoto;
  unsplashRequest.send();
}

function addPhoto () {
  const photoContainer = document.querySelector('.photo-container');
  photoContainer.innerHTML = '';
  let data = JSON.parse(this.responseText);
  let photoURL = '';
  if (data.results.length > 0) {
    photoURL = data.results[0].urls.full;
    photoContainer.innerHTML = `<img src="${photoURL}">`;
  } else {
    photoContainer.innerHTML = `<p>No results found</p>`;
  }
}

// the News API require a JSONP data type to pass CORS restrictions

// function fetchNews (keyword) {
//   const newsRequest = new XMLHttpRequest();
//   const apiKey = 'eadb5d437c064138a8fac60e25a1c51f';
//   const requestURL = `http://newsapi.org/v2/everything?` +
//                      `q=${keyword}&` +
//                      `apiKey=${apiKey}`;
//   newsRequest.open('GET', requestURL);
//   newsRequest.onload = listArticles;
//   newsRequest.send();
// }

function fetchNews (keyword) {
  const apiKey = 'eadb5d437c064138a8fac60e25a1c51f';
  const requestURL = `http://newsapi.org/v2/everything?` +
                     `q=${keyword}&` +
                     `apiKey=${apiKey}`;
  $.ajax({
    url: requestURL,
    type: "GET",
    dataType: "json",
    success: listArticles
  });
}


function listArticles (responseJSON) {
  const articlesContainer = document.querySelector('.articles-container');
  articlesContainer.innerHTML = '';
  let articles = responseJSON.articles;
  articlesContainer.innerHTML += '<ul class="article-list"></ul>';
  const articleList = document.querySelector('.article-list');
  articleList.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    let article = articles[i];
    articleList.innerHTML += `<li><a href=${article.url}>${article.title}</a></li>`;
  }
}

// function fetchWiki (keyword) {
//   const requestURL = `https://en.wikipedia.org/w/api.php?` +
//             `action=opensearch&` +
//             `search=${keyword}&` +
//             `format=json&` +
//             `callback=?`;
//   $.ajax({
//     url: requestURL,
//     type: "GET",
//     dataType: "json",
//     success: addWikiSnippet
//   });
// }

// Will convert the jQuery AJAX request to one using the Fetch API

function fetchWiki (keyword) {
  const requestURL = `https://en.wikipedia.org/w/api.php?` +
                     `action=opensearch&` +
                     `search=${keyword}&` +
                     `format=json&` +
                     `callback=?`;
  fetch(requestURL)
  .then( response => response.json() )
  .then(addWikiSnippet);
}

function addWikiSnippet (responseJSON) {
  const wikiContainer = $('.wiki-container');
  wikiContainer.html('');
  let title = responseJSON[1][0];
  let description = responseJSON[2][0];
  let link = responseJSON[3][0];
  wikiContainer.append(`<h3>${title}</h3>`);
  wikiContainer.append(`<p><a href="${link}">Wikipedia</a></p>`);
  wikiContainer.append(`<p>${description}</p>`);
}
