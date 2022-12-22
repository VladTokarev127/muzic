<template>
  <li class="review-card">
    <!-- Track info & controls -->
    <div class="review-card__header">
      <!-- Music player -->
      <music-player
        class="player"
        :track-artist="artist"
        :track-title="title"
        :track-artwork="artwork"
        :track-src="src"
        :track-demo="demo" />

      <!-- Feedback status -->
      <review-status class="review-status" status="reviewed" />
    </div>

    <!-- Track tags -->
    <ul class="review-card__tags">
      <base-tag color="gray" v-for="tag in musicFile.genres" key="tag">
        {{ tag }}
      </base-tag>
    </ul>

    <!-- Track reviews -->
    <div class="review-card__reviews" v-if="comments.length > 0">
      <ul class="reviews-list">
        <li
          class="reviews-list__item"
          v-for="comment in comments"
          :key="comment">
          <p>{{ comment }}</p>
        </li>
      </ul>
    </div>
  </li>
</template>

<script setup>
  import MusicPlayer from '@/components/player/MusicPlayer.vue';
  import ReviewStatus from '@/components/review/ReviewStatus.vue';

  const props = defineProps({
    musicFile: { type: Object, required: true },
  });

  // Variables for tarck details
  const artist = props.musicFile.artist;
  const title = props.musicFile.title;
  const artwork = props.musicFile.artwork;
  const src = props.musicFile.src;
  const demo = props.musicFile.demo;
  const comments = props.musicFile.comments;
</script>

<style lang="sass" scoped>
  .review-card
    background: $white-color
    padding: 20px 40px 20px 20px
    border: 1px solid $third-color
    border-radius: 20px
  .review-card__header
    display: grid
    grid-template-columns: 1fr 253px
    align-items: flex-end
    gap: 47px
  .review-card__tags
    display: flex
    margin-top: 10px
    & li + li
      margin-left: 5px
  .review-card__reviews
    margin-top: 18px
  .reviews-list__item
    max-width: 1157px
    background: $secondary-color
    padding: 30px 33px
    border-radius: 10px
    overflow: hidden
  .reviews-list__item + .reviews-list__item
    margin-top: 20px
  .reviews-list__item p
    font-size: $p-font-size
    line-height: $p-line-heigth
    letter-spacing: $letter-spacing
    color: $text-color-secondary
</style>
