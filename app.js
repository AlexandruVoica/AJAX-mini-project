const searchForm = document.querySelector('#search-form');
const searchField = document.querySelector('#search-field');
const resultsContainer = document.querySelector('.results-container');
const submitButton = document.querySelector('#submit-btn');
let keyword = '';

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  resultsContainer.innerHTML = '';
  keyword = searchField.value;
});

// fetch data from APIs
