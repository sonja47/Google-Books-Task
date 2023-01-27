<template>
  <div
      v-if="ratingArray.length"
      class="rating-container"
  >
    <img
        v-for="star in ratingArray" :key="star"
        :src="Star"
        class="star-rating-icon"
        alt="star"
    />
    <img
        v-if="hasHalfStar"
        :src="Star"
        class="star-rating-icon half-star"
        alt="half star"
    >
  </div>
  <div v-else
       v-text="`No rating available`"
  />
</template>

<script>
import StarIcon from '../assets/star.svg'
import {ref} from 'vue'

export default {
  name: "StarsRating",
  props: {
    rating: {
      type: Number,
    }
  },
  setup(props) {
    const Star = StarIcon;
    const hasHalfStar = ref(props.rating ? props.rating - Math.floor(props.rating) !== 0 : false);
    const starRating = props.rating ? Math.floor(props.rating) : 0;
    const ratingArray = ref(Array.from(Array(starRating).keys()))

    return {
      Star,
      ratingArray,
      starRating,
      hasHalfStar
    }
  }
}
</script>

<style scoped lang="scss">
@import "/src/scss/_book.scss";
</style>