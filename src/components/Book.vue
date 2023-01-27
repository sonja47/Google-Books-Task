<template>
  <div class="book-wrapper"
  >
    <img
        class="book-image"
        v-if="book.imageLinks"
        alt="image of book"
        :src="book.imageLinks.thumbnail"
    />
    <div class="book-overlay">
      <div class="book-info">
        <p class="book-name" v-text="book.title"/>
      </div>
      <div
          v-for="(author, index) in book.authors"
          :key="index"
          class="book-author"
      >
        <p v-text="author"/>
      </div>
      <div class="book-stats">
        <StarsRating :rating="book.averageRating"/>
      </div>
    </div>
  </div>
</template>

<script>
import StarsRating from './Rating'

export default {
  name: "Book-Card",
  components: {
    StarsRating
  },
  props: {
    book: {type: Object}
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/_book.scss";

</style>