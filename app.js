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
}

function addWikiSnippet (responseJSON) {
  const wikiContainer = document.querySelector('.wiki-container');
  wikiContainer.innerHTML = '';
  responseJSON = JSON.parse('{\"data\":' + responseJSON.slice(5, responseJSON.length-1) + '}');
  let indexOfDisplayedItem = 0;
  let title = responseJSON.data[1][indexOfDisplayedItem];
  let description = responseJSON.data[2][indexOfDisplayedItem];
  let link = responseJSON.data[3][indexOfDisplayedItem];
  while (description == '') {
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
