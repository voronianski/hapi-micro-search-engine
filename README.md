# Micro Search Engine

The task was to implement a simple search API which accepts a word list
and enables the searching of words in that list that start with a
specified string.

The program you write is a small HTTP server which exposes the
following two endpoints:

## Dictionary

### `POST /dictionary`

The dictionary of words to search through.

**Input**: JSON containing an array of words, e.g. `["foo", "bar", ...]`

**Output**: Return an HTTP 200 status for valid data.

## Search

### `GET /search/:string`

All words that start with `:string` - e.g. `/search/foo` should return all
words in the supplied dictionary starting with `foo`, including `foo`
itself.

**Input**: the string, specified in the URL.

**Output**: A JSON array of words in the dictionary which start with the
specified string, all in lower case. Should return an HTTP 200 status
for valid data, even if no words are found (just return an empty JSON
array in this case).

<!-- 
## Important Notes

* [x] Your server should listen on port `8000`.
* [x] Your server should be written in javascript or coffeescript and use node.js.
* [x] Your submission should consist of 1 file of code and 1 package.json file.
* [x] I should be able to execute your server by running npm install && npm start.
* [x] You can use libraries for utility stuff like lodash or express, etc.
but the core searching algorithm should be your own code.
* [x] We plan to test your code by POSTing over 3 megabytes of data in a
single request to /dictionary/ - make sure your server doesn't 413 or
otherwise fail for this input. (see http://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_Error)
* [x] All searches should be case insensitive.
* [x] All words returned from /search/ should be lowercase.
* [x] Duplicates should be eliminated from the input word list.
* [x] I am a strange user who wants to send ~1500 search terms in quick
succession and want results back as quickly as possible - the faster
the better. 
-->
