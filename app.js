import { unsplashAPIKey, newsAPIKey, wikiAPIKey } from './apikeys.js';

const searchForm = document.querySelector('#search-form');
const searchField = document.querySelector('#search-field');
// const resultsContainer = document.querySelector('.results-container');
const submitButton = document.querySelector('#submit-btn');

window.onload = function () {
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let keyword = searchField.value;
    // fetchUnsplash(keyword);
    // fetchNews(keyword);
    // fetchWiki(keyword);
    // Chain the AJAX calls for style feature (in fetchUnsplash)
    fetchWiki(keyword)
    .then(fetchNews)
    .then(fetchUnsplash);
  });
};

// fetch data from APIs
function fetchUnsplash (keyword) {
  const unsplashRequest = new XMLHttpRequest();
  const unsplashClientID = unsplashAPIKey;
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
  let photoAuthor = '';
  let photoDescription = '';
  let photoColor = '';
  if (data.results.length > 0) {
    photoURL = data.results[0].urls.full;
    if (data.results[0].description) photoDescription = data.results[0].description;
    photoAuthor = `by ${data.results[0].user.first_name} ${data.results[0].user.last_name}`;
    photoColor = data.results[0].color;
    photoContainer.innerHTML = `<figure>` +
                               `<img src="${photoURL}">` +
                               `<p>${photoDescription}</p>` +
                               `<figcaption>${photoAuthor}</figcaption>` +
                               `</figure>`;
    // after photo is loaded, change the color of all links to the one associated with Unsplash photo
    const styleCSS = document.styleSheets[1];
    const rules = styleCSS.cssRules || styleCSS.rules;
    for (let rule of rules) {
      if (rule.selectorText == 'a') {
        rule.style.color = photoColor;
      }
    }
  } else {
    photoContainer.innerHTML = `<p>No results found</p>`;
  }
}

// the News API require a JSONP data type to pass CORS restrictions

// function fetchNews (keyword) {
//   const newsRequest = new XMLHttpRequest();
//   const apiKey = newsAPIKey;
//   const requestURL = `http://newsapi.org/v2/everything?` +
//                      `q=${keyword}&` +
//                      `apiKey=${apiKey}`;
//   newsRequest.open('GET', requestURL);
//   newsRequest.onload = listArticles;
//   newsRequest.send();
// }

function fetchNews (keyword) {
  const apiKey = newsAPIKey;
  const requestURL = `http://newsapi.org/v2/everything?` +
                     `sources=cnn,buzzfeed,bbc-news&` +
                     `q=${keyword}&` +
                     `sortBy=relevancy&` +
                     `apiKey=${apiKey}`;
  $.ajax({
    url: requestURL,
    type: "GET",
    dataType: "json",
    success: listArticles
  });
  return new Promise((resolve, reject) => resolve(keyword));
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
    let authorItem = '';
    if (article.author && article.author != article.source.name) {
      authorItem = `by ${article.author}`;
    }
    articleList.innerHTML += `<li>` +
                             `<h4><a href=${article.url}>${article.title}</a></h4>` +
                             `<p style="display: block">${authorItem} on ${article.source.name}</p>` +
                             `<p>${article.description}</p>` +
                             `</li>`;
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
                     `origin=*&` +
                     `action=opensearch&` +
                     `search=${keyword}&` +
                     `format=json&` +
                     `callback=?`;
  // fetch(requestURL, {
  //   mode: 'cors',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': ''
  //   }
  // })
  fetch(requestURL)
  .then(response => response.text())
  .then(addWikiSnippet);
  return new Promise((resolve, reject) => resolve(keyword));
}

function addWikiSnippet (responseJSON) {
  const wikiContainer = document.querySelector('.wiki-container');
  wikiContainer.innerHTML = '';
  responseJSON = JSON.parse('{\"data\":' + responseJSON.slice(5, responseJSON.length-1) + '}');
  let indexOfDisplayedItem = 0;
  let title = responseJSON.data[1][indexOfDisplayedItem];
  let description = responseJSON.data[2][indexOfDisplayedItem];
  let link = responseJSON.data[3][indexOfDisplayedItem];
  const descriptionToAvoid = 'may refer to:';
  while (description == '' || description.includes(descriptionToAvoid)) {
    indexOfDisplayedItem ++;
    title = responseJSON.data[1][indexOfDisplayedItem];
    description = responseJSON.data[2][indexOfDisplayedItem];
    link = responseJSON.data[3][indexOfDisplayedItem];
  }
  let htmlContent = `<h3>${title}</h3>` +
                    `<p><a href="${link}">Wikipedia</a></p>` +
                    `<p>${description}</p>`;
  wikiContainer.innerHTML += htmlContent;
}
