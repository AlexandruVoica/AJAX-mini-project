const searchForm = document.querySelector('#search-form');
const searchField = document.querySelector('#search-field');
const resultsContainer = document.querySelector('.results-container');
const submitButton = document.querySelector('#submit-btn');

console.log(searchForm);

let keyword = '';
window.onload = function () {
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    resultsContainer.innerHTML = '';
    keyword = searchField.value;
    console.log(keyword);
  });
};


// fetch data from APIs


