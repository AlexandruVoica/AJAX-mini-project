# AJAX exercise

This will be an exercise in handling async requests in JS using 3 different approaches:

- XHR
- jQuery
- Fetch API

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

My final conclusion is that jQuery is extremely easy to use and versatile.
