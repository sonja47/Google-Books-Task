<template>
  <div
      class="modal-overlay"
      @click="$emit('closeModal')"
  />
  <div class="modal-wrapper">
    <div class="header-holder">
      <h2
          class="book-title"
          v-text="selectedBook.title"
      />
      <h5
          v-text="selectedBook.subtitle"
          class="book-subtitle"
      />
      <img
          @click="$emit('closeModal')"
          class="close-modal"
          :src="closeImg"
          alt="close modal"
      />
    </div>
    <img
        v-if="selectedBook.imageLinks"
        alt="thumbnail"
        :src="selectedBook.imageLinks.thumbnail"
        class="thumbnail-image"
    />
    <div
        class="no-image"
        v-else
        v-text="`No image has been provided for this book`"
    />
    <div>
      <p
          class="book-description"
          v-text="selectedBook['description']"/>
    </div>
    <div>
      <p
          class="book-rating"
          v-if="selectedBook.averageRating">
        Rating: <span v-text="selectedBook.averageRating"/>
      </p>
      <p
          v-else
          class="book-rating"
      >
        Rating: <span v-text="`There is no rating for this book yet!`"/>
      </p>
    </div>
    <div>
      <p
          v-if="selectedBook.publisher"
          class="book-publisher"
          v-text="`Published by: ${selectedBook.publisher}`"
      />
      <a
          class="book-source"
          :href="selectedBook.infoLink"
          target="_blank"
      >Original source</a>
    </div>
  </div>
</template>

<script>
import close from "../assets/close.png"

export default {
  name: "book-modal",
  props: {
    closeModal: {
      type: Function,
    },
    selectedBook: {
      type: Object,
      required: true
    }
  },
  setup() {
    const closeImg = close;

    return {
      closeImg
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/_modal.scss";

</style>