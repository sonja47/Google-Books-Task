import axios from 'axios'

const GOOGLE_BOOKS_URL = 'https://www.googleapis.com/books/v1/';
const GOOGLE_API_KEY = 'AIzaSyCsxq9-yHHEEiDkdsiEm4Ies-uR2AOCocU';
const PAGE_SIZE = 20;

export const getVolumes = async ({searchString, startIndex}) => {
    return await axios.get(`${GOOGLE_BOOKS_URL}volumes?key=${GOOGLE_API_KEY}&maxResults=${PAGE_SIZE}&startOffset=0&q=${searchString}&startIndex=${startIndex}`)
};

export const sortBooks = async ({searchString, sortBy}) => {
    return await axios.get(`${GOOGLE_BOOKS_URL}volumes?key=${GOOGLE_API_KEY}&maxResults=${PAGE_SIZE}&startOffset=${0}&q=${searchString}&orderBy=${sortBy}`)
}
