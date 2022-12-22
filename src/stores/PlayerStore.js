import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    playbackActive: false,
  }),
  actions: {
    togglePlayback() {
      this.playbackActive = !this.playbackActive;
    },
  },
});
