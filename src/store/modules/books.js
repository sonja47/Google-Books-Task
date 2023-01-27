import {getVolumes, sortBooks} from "@/services/booksService"

export const booksModule = {
    state: ({
        list: [],
        pagination: {
            totalItems: 0,
        },
        startIndex: 0,
        searchWord: '',
    }),

    actions: {
        getBooks: async ({commit, state}, {searchString}) => {
            if (state.searchWord !== searchString) {
                commit('RESET_PAGE')
            }
            const response = await getVolumes({searchString, startIndex: state.startIndex});

            state.searchWord = searchString;
            commit('SET_BOOKS', response.data.items || []);
            commit('SET_PAGINATION', {totalItems: response.data.totalItems});
        },
        getSortedBooks: async ({commit, state}, {searchString, sortBy}) => {
            const response = await sortBooks({searchString, sortBy});
            state.startIndex = 0;
            commit('SET_BOOKS', response.data.items)
            commit('SET_PAGINATION', {totalItems: response.data.totalItems})
        },
        emptyBookList: ({commit}) => {
            commit('EMPTY_LIST')
        },
        getNextPage: async ({commit, state}, searchString) => {
            const response = await getVolumes({searchString, startIndex: state.startIndex + 20});
            commit('ADD_NEXT_PAGE', response.data.items)
        }
    },
    getters: {
        getBooks: (state) => {
            return state.list
        }
    },
    mutations: {
        SET_BOOKS: (state, list) => {
            return state.list = list
        },
        SET_PAGINATION: (state, {totalItems}) => {
            return state.pagination = {
                ...state.pagination,

                totalItems
            }
        },
        EMPTY_LIST: (state) => {
            state.startIndex = 0;
            state.pagination.totalItems = 0;
            return state.list = []
        },
        ADD_NEXT_PAGE: (state, books) => {
            state.startIndex = state.startIndex + 20
            return books.map((book) => {
                state.list.push(book)
            })
        },
        RESET_PAGE: (state) => {
            return state.startIndex = 0
        }
    }
}

