<template>
  <div class="player">
    <!-- Track thumbnail -->
    <track-thumb class="player__thumb" :track-artwork="trackArtwork" />

    <!-- Player controls and track info -->
    <div class="player__controls">
      <!-- Track info -->
      <div class="header">
        <button
          type="button"
          class="playback"
          @click="
            startPlaying();
            toggleMusicPlaying();
            $emit('togglePlayback');
          ">
          <pause-icon v-if="isPlaying"></pause-icon>
          <play-icon v-else></play-icon>
        </button>

        <div class="header__info">
          <h2 class="header__title">{{ trackArtist }}</h2>

          <div class="header__details">
            <span class="header__artist">{{ trackTitle }}</span>

            <div class="header__demo" v-if="trackDemo">демо</div>
          </div>
        </div>
      </div>

      <!-- Playback bar and volume bar -->
      <div class="controls">
        <div
          class="playback-bar"
          @click="update"
          :class="playerStarted ? '' : 'disabled'">
          <div
            class="playback-bar__time-elapsed"
            :class="isWhite ? 'white' : ''">
            {{ timeElapsed }}
          </div>

          <div
            class="range-container"
            :style="{ '--progress-position': progressPosition }">
            <div class="range" ref="wrapper">
              <div
                class="progress"
                :class="playerStarted ? 'active' : ''"></div>
            </div>
            <div class="handle" @mousedown="onMouseDown"></div>
          </div>

          <div class="playback-bar__total-time">
            {{ trackDuration }}
          </div>
        </div>

        <div class="controls__volume">
          <sound-button @showVolumeBar="toggleVolumeBar" />

          <volume-range
            class="volume-slider"
            @change-volume="setVolume"
            v-show="volumeBarOpened" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import TrackThumb from '@/components/player/TrackThumb.vue';
  import PlayIcon from '@/components/icons/PlayIcon.vue';
  import PauseIcon from '@/components/icons/PauseIcon.vue';
  import SoundButton from '@/components/player/SoundButton.vue';
  import VolumeRange from '@/components/player/VolumeRange.vue';

  import { useConvertSecondsToMinutes } from '@/composables/useGetMinutes.js';

  const props = defineProps({
    trackArtist: { type: String, required: true },
    trackTitle: { type: String, required: true },
    trackArtwork: { type: String, required: true },
    trackSrc: { type: String, required: true },
    trackDemo: { type: Boolean, required: true },
  });

  defineEmits(['togglePlayback']);

  // Logic to start/pause playing
  const playerStarted = ref(false);
  const isPlaying = ref(false);
  const progressPosition = ref(0);
  const startPlaying = () => {
    playerStarted.value = true;
    isPlaying.value = !isPlaying.value;
  };

  const audioTrack = props.trackSrc;
  const musicPlayer = new Audio(audioTrack);
  musicPlayer.volume = 0.5;

  // Logic to convert seconds to minutes and set track initial and total time
  let trackSeconds;
  const trackDuration = ref('');
  musicPlayer.onloadedmetadata = () => {
    trackSeconds = Math.round(musicPlayer.duration);
    trackDuration.value = useConvertSecondsToMinutes(trackSeconds);
  };

  // Function to update time elapsed
  const timeElapsed = ref('00:00');
  const setTimeElapsed = () => {
    const timeElapsedSeconds = Math.round(musicPlayer.currentTime);
    timeElapsed.value = useConvertSecondsToMinutes(timeElapsedSeconds);
  };

  // Function to start/pause music playing
  const toggleMusicPlaying = () => {
    if (isPlaying.value) {
      musicPlayer.play();
    } else {
      musicPlayer.pause();
    }
  };

  // Function to change volume
  const setVolume = (volume) => {
    musicPlayer.volume = volume / 100;
  };

  // Logic related to scrubing
  const isScrubbing = ref(false);
  const wrapper = ref(null);

  const disableScrubbing = () => {
    isScrubbing.value = false;
  };

  onMounted(() => {
    document.addEventListener('mousemove', (e) => {
      if (!isScrubbing.value) return;
      update(e);
    });
    document.addEventListener('mouseup', disableScrubbing);
  });

  onUnmounted(() => {
    document.removeEventListener('mousemove', (e) => update(e));
    document.removeEventListener('mouseup', disableScrubbing);
  });

  const onMouseDown = () => {
    isScrubbing.value = true;
  };

  const update = (e) => {
    const container = wrapper.value;
    const rect = container.getBoundingClientRect();
    const percent =
      Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width - 0.04;

    if (percent > -0.005) {
      progressPosition.value = percent;
      seekTrack();
    }
  };

  const seekTrack = () => {
    musicPlayer.currentTime = trackSeconds * progressPosition.value;
    setTimeElapsed();
  };

  musicPlayer.ontimeupdate = () => {
    progressPosition.value = musicPlayer.currentTime / trackSeconds;
    setInterval(() => {
      setTimeElapsed();
    }, 1000);
    if (progressPosition.value > 0.96) progressPosition.value = 0.96;
  };

  // Change current time color based on progress
  const isWhite = ref(false);
  watch(progressPosition, async (newValue) => {
    if (newValue > 0.01) {
      isWhite.value = true;
    } else {
      isWhite.value = false;
    }
  });

  // Logic to restart UI after playback has finished
  musicPlayer.onended = () => {
    playerStarted.value = false;
    isPlaying.value = false;
    progressPosition.value = 0;
    musicPlayer.currentTime = 0;
  };

  // Logic to show/hide volume bar
  const volumeBarOpened = ref(false);
  const toggleVolumeBar = () => {
    volumeBarOpened.value = !volumeBarOpened.value;
  };
</script>

<style lang="sass" scoped>
  .player
    display: grid
    grid-template-columns: 100px 1fr
    align-items: flex-start
    gap: 20px
  .player__thumb
    height: 100px
  .player__controls
    display: grid
    gap: 20px
  .player__controls .header
    display: grid
    grid-template-columns: 50px 1fr
    align-items: flex-start
    gap: 15px
  .player__controls .playback
    height: 50px
    display: grid
    place-items: center
    background: $main-color
    border-radius: 10px
  .player__controls .header__info
    display: grid
    gap: 5px
  .player__controls .header__title
    font-size: $h4-font-size
    font-weight: $p-font-weight
    line-height: $h4-line-heigth
    letter-spacing: $letter-spacing
    color: $text-color
  .player__controls .header__details
    display: grid
    grid-template-columns: auto 45px
    align-items: center
    justify-content: start
    gap: 10px
  .player__controls .header__artist
    font-size: $p-font-size
    font-weight: $h4-font-weight
    line-height: $default-line-height
    letter-spacing: $letter-spacing
    color: $text-color
  .player__controls .header__demo
    display: grid
    place-items: center
    font-size: 12px
    line-height: $default-line-height
    letter-spacing: $letter-spacing
    text-transform: uppercase
    color: $main-color
    background: $secondary-color
    padding: 2px 5px
    border-radius: 5px
  .player__controls .controls
    display: grid
    grid-template-columns: 1fr 24px
    align-items: center
    gap: 12px
  .playback-bar
    position: relative
    height: 20px
    flex-grow: 1
    flex-shrink: 1
    cursor: pointer
    user-select: none
  .playback-bar.disabled
    pointer-events: none
  .playback-bar.disabled .handle
    display: none
  .playback-bar__time-elapsed,
  .playback-bar__total-time
    position: absolute
    top: 3px
    font-size: 12px
    line-height: $default-line-height
    letter-spacing: $letter-spacing
    color: $title-color
    z-index: 10
  .playback-bar__time-elapsed
    left: 10px
  .playback-bar__time-elapsed.white
    color: $white-color
  .playback-bar__total-time
    right: 10px
  .playback-bar .range-container
    width: 100%
    height: 100%
    background: $secondary-color
    border-radius: 15px
  .playback-bar .range
    position: relative
    width: 100%
    height: 100%
    border-radius: 15px
    overflow: hidden
  .playback-bar .range .progress
    position: absolute
    left: 0
    top: 0
    bottom: 0
    height: 100%
    right: calc(100% - var(--progress-position) * 100%)
    background: $main-color
    &.active
      box-shadow: 10px 0 0 10px $main-color
  .playback-bar .handle
    width: 40px
    height: 40px
    position: absolute
    top: calc(50% - 20px)
    left: calc(var(--progress-position) * 100%)
    background-color: $main-color
    border: 7px solid $fifth-color
    border-radius: 50%
    cursor: pointer
    z-index: 20
  .player__controls .controls__volume
    position: relative
    height: 24px
  .player__controls .volume-slider
    position: absolute
    bottom: 33px
    left: calc(50% - 15px)
</style>
