<template>
  <div :class="booksList.length?  'wrapper' : 'container' ">
    <div class="books-header">
      <h4
          class="books-title"
          v-text="`Books`"
      />
      <img
          class="books-img"
          :src="booksImg"
          alt="books image"
      />
    </div>
    <div class="input-holder">
      <input
          v-if="booksList.length"
          class="search-input"
          v-model="searchString"
          @change="searchBooks"
          placeholder="Search for a book"
      />
      <input
          v-else
          class="search-input empty-search"
          v-model="searchString"
          @change="searchBooks"
          placeholder="Search for a book"
      />
      <div
          v-if="showSortOptions"
          class="sort-buttons">
        <button
            :class="{relevance: relevanceSorted, ['sort-btn']: true}"
            @click="orderBooks('relevance')"
            v-text="`Sort${relevanceSorted ? 'ed' : ''} by relevance`"
        />
        <button
            :class="{newest: newestSorted, ['sort-btn']: true}"
            @click="orderBooks('newest')"
            v-text="`Sort${newestSorted ? 'ed' : ''} by newest`"
        />
      </div>
    </div>
    <div
        class="books-holder"
        @scroll="getNextPage"
        ref="scrollEl"
        v-if="booksList.length"
    >
      <div
          class="books-wrapper"
          v-for="book in booksList" :key="book.id"
          v-bind:data-rating="book.volumeInfo.averageRating"
      >
        <Book
            @click="openDetailedView(book)"
            :book="book['volumeInfo']"/>
      </div>
      <div
          class="loader"
          ref="loaderRef"
          v-text="`Loading ...`"
      />
    </div>
  </div>
  <Modal
      class="modal"
      v-if="showModal"
      @closeModal="toggleModal"
      :selectedBook='selectedBook.volumeInfo'
  />
</template>

<script>
import Book from './components/Book'
import Modal from "./components/Modal"
import {ref, computed, watchEffect} from "vue";
import books from "./assets/books.svg"
import {useStore} from "vuex";
import {debounce} from "@/utility/debounce";

export default {
  name: 'App',
  components: {
    Book,
    Modal
  },
  setup() {
    const store = useStore();
    const booksList = computed(() => store.state['booksModule'].list)
    const searchString = ref('')
    const showModal = ref(false);
    const booksImg = books;
    const selectedBook = ref({});
    const relevanceSorted = ref(true)
    const newestSorted = ref(false)
    const showSortOptions = ref(false)
    const scrollEl = ref(null)
    const loaderRef = ref(null)

    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    const orderBooks = async (sortBy) => {
      await store.dispatch('getSortedBooks', {searchString: searchString.value, sortBy: sortBy})
      if (sortBy === 'relevance') {
        relevanceSorted.value = true
        newestSorted.value = false
      } else if (sortBy === 'newest') {
        relevanceSorted.value = false
        newestSorted.value = true
      }
    }

    const openDetailedView = (book) => {
      selectedBook.value = book
      toggleModal()
    }

    const getNextPage = async () => {
      const {scrollHeight, scrollTop, clientHeight} = scrollEl.value;
      if (scrollHeight - scrollTop === clientHeight) {
        debounce(await store.dispatch('getNextPage', searchString.value), 1000)
      }
    }

    const isInViewport = () => {
      if (loaderRef.value) {
        const rect = loaderRef.value.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
    }

    const searchBooks = async () => {
      if (searchString.value) {
        await store.dispatch('getBooks', {searchString: searchString.value})
        showSortOptions.value = true;
      }
    }

    watchEffect(() => {
      const isVisible = isInViewport();
      if (isVisible) {
        getNextPage()
      }
    })

    return {
      showModal,
      toggleModal,
      store,
      searchString,
      searchBooks,
      booksList,
      openDetailedView,
      booksImg,
      selectedBook,
      orderBooks,
      relevanceSorted,
      newestSorted,
      showSortOptions,
      getNextPage,
      scrollEl,
      loaderRef,
      isInViewport
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/_home.scss";

</style>
