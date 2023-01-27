# books

## Project setup

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```
then run yarn install in project root

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

The application represents data about books, taken from Google Books API. The user should type a search word in order to see a list of books taken from the API. 

The results are represented in a collage and the size of each element depends on the rating of that book:
-Books that have a rating of 1 or 1.5 are rendered as 1x1 block
-Books that have a rating of 2, 2.5, 3 and 3.5 are rendered as 1x2 block
-Books that have a rating of 4, 4.5 and 5 are rendered as 2x2 block
Note: some books have no rating provided and their design is as if they have a 1 star rating.

When a user clicks on an element, a modal is opened displaying extra informations about that book. 
Note: the API did not provide some of the data that was mentioned in the exercise therefore: 
-instead of 'price' there is 'published by' info;
-instead of 'reviews and comments' there is 'subtitle';

According to the exercise, elements should be sorted by Rating, Category and Name. The Google Books API does not have endpoints for sorting with those keywords. It only has the option for the data to be sorted by 'Relevance' and by 'Newest'. Consequently, those are the only two options regarding the sorting of the data. The default data that the user gets is sorted by relevance by default.

