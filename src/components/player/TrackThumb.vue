<template>
  <div class="image">
    <img :src="trackArtwork" alt="track thumbnail" />

    <button type="button" @click="toggleFavourite">
      <favourite-icon v-if="filledIcon"></favourite-icon>
      <favourite-icon-filled v-else></favourite-icon-filled>
    </button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import FavouriteIcon from '@/components/icons/FavouriteIcon.vue';
  import FavouriteIconFilled from '@/components/icons/FavouriteIconFilled.vue';

  const props = defineProps({
    trackArtwork: { type: String, required: true },
  });

  const filledIcon = ref(true);

  const toggleFavourite = () => {
    filledIcon.value = !filledIcon.value;
  };
</script>

<style lang="sass" scoped>
  .image
    position: relative
    border-radius: 10px
    overflow: hidden
  .image button
    position: absolute
    right: 5px
    bottom: 5px
    width: 26px
    height: 26px
    display: grid
    place-items: center
    background: rgba(210, 179, 179, 0.15)
    backdrop-filter: blur(5px)
    border-radius: 50%
    z-index: 10
</style>
