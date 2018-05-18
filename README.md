# AJAX exercise
![stability-wip](https://img.shields.io/badge/stability-work_in_progress-lightgrey.svg?longCache=true&style=flat-square) [![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/AlexandruVoica/MVC-project)

### Description
This will be an exercise in handling async requests in JS using 3 different approaches:
- XHR
- jQuery
- Fetch API

### Tools
The only external library I am using is jQuery.
Also I make use of some ES6 features like modules, template literals etc.

### Scope and process
After all, I ended up using all 3 approaches specified above together with 3 different APIs:

- Unsplash API - for loading photos from Unsplash
    ```
    https://unsplash.com/documentation
    ```
- Wikipedia API - for fetching descriptional snippets from Wikipedia
    ```
    https://www.mediawiki.org/wiki/API:Main_page
    ```
- News API - for loading articles from various news sources around the web
    ```
    https://newsapi.org/docs
    ```
I've written each async request almost 2 times and so it made me realize what the pros and cons of each approach is. For example, using XHR might pose a problem because of CORS limitations.

### Conclusion
My final conclusion is that jQuery is extremely easy to use, versatile and still very much relevant.
