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
        :track-demo="demo"
        @toggle-playback="activateReactions" />

      <!-- Skip track button -->
      <skip-button class="skip" :disabled="!canBeSkipped" />

      <!-- Leave a review button -->
      <base-button
        class="review-button"
        :mode="reviewButtonMode"
        :title="reviewButtonLabel"
        @click="showReviewForm" />
    </div>

    <!-- Track tags -->
    <ul class="review-card__tags">
      <base-tag color="gray" v-for="tag in musicFile.genres" key="tag">
        {{ tag }}
      </base-tag>
    </ul>

    <!-- Track reviews -->
    <div class="review-card__reviews">
      <ul class="reviews-list" v-if="comments.length > 0">
        <li
          class="reviews-list__item"
          v-for="comment in comments"
          :key="comment">
          <p>{{ comment }}</p>
        </li>
      </ul>

      <transition>
        <div class="review-input" v-show="reviewIsShown">
          <textarea placeholder="Напишите свою рецензию"></textarea>
          <div class="review-input__footer">
            <button class="add-to-playlist">Разместить в плейлисте</button>
            <base-button
              class="save"
              mode="primary"
              title="Сохранить"
              @click="closeInput" />
          </div>
        </div>
      </transition>
    </div>
  </li>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import MusicPlayer from '@/components/player/MusicPlayer.vue';
  import SkipButton from '@/components/review/SkipButton.vue';

  const props = defineProps({
    musicFile: { type: Object, required: true },
  });

  // Variables for track details
  const artist = props.musicFile.artist;
  const title = props.musicFile.title;
  const artwork = props.musicFile.artwork;
  const src = props.musicFile.src;
  const demo = props.musicFile.demo;
  const comments = props.musicFile.comments;

  const isPlaying = ref(false);
  const canBeSkipped = ref(false);

  const reviewButtonLabel = ref('Оценить');
  const reviewButtonMode = ref('disabled');

  // Logic to activate reactions
  const timePassed = ref(0);
  let intervalId;

  const activateReactions = () => {
    // Toogle playing status
    isPlaying.value = !isPlaying.value;

    if (isPlaying.value) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const startTimer = () => {
    intervalId = setInterval(() => {
      timePassed.value++;
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  watch(timePassed, async (newValue) => {
    if (newValue === 5) {
      canBeSkipped.value = true;
    } else if (newValue === 10) {
      reviewButtonMode.value = 'primary';
    }
  });

  // Logic to show/hide review input
  const reviewIsShown = ref(false);
  const showReviewForm = () => {
    reviewIsShown.value = !reviewIsShown.value;

    if (reviewIsShown.value) {
      reviewButtonLabel.value = 'Отменить';
      reviewButtonMode.value = 'cancel';
    } else {
      reviewButtonLabel.value = 'Оценить';
      reviewButtonMode.value = 'primary';
    }
  };

  const closeInput = () => {
    reviewIsShown.value = false;
    canBeSkipped.value = false;
    reviewButtonLabel.value = 'Оценить';
    reviewButtonMode.value = 'disabled';
  };
</script>

<style lang="sass" scoped>
  .review-card
    background: $white-color
    padding: 20px 40px 20px 20px
    border: 1px solid $third-color
    border-radius: 20px
  .review-card__header
    display: flex
    align-items: flex-start
    justify-content: space-between
  .review-card__header .player
    flex-grow: 1
    flex-shrink: 1
  .review-card__header .skip
    flex-grow: 0
    flex-shrink: 0
    align-self: end
    margin-left: 42px
  .review-card__header .review-button
    flex-grow: 0
    flex-shrink: 0
    flex-basis: 173px
    align-self: end
    margin-left: 20px
  .review-card__tags
    display: flex
    margin-top: 10px
    & li + li
      margin-left: 5px
  .review-card__reviews .reviews-list
    margin-top: 16px
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
  .review-input
    max-width: 1145px
    margin-top: 20px
    margin-left: auto
  .review-input textarea
    display: block
    max-height: 138px
    width: 100%
    font-size: $p-font-size
    line-height: $p-line-heigth
    letter-spacing: $letter-spacing
    color: $text-color-secondary
    resize: none
    background: $textarea-color
    padding: 30px 30px 30px 25px
    border: none
    border-radius: 10px
    overflow: hidden
  .review-input textarea::placeholder
    font-size: $p-font-size
    line-height: $p-line-heigth
    letter-spacing: $letter-spacing
    color: $text-color-secondary
  .review-input__footer
    display: flex
    align-items: center
    justify-content: space-between
    padding-left: 35px
    margin-top: 20px
  .review-input__footer .add-to-playlist
    font-size: $default-font-size
    font-weight: 700
    line-height: $default-line-height
    letter-spacing: $letter-spacing
    color: $main-color
  .review-input__footer .save
    flex-grow: 0
    flex-shrink: 0
    flex-basis: 173px
</style>
