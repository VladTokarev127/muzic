<template>
  <button type="button" @click="$emit('showVolumeBar')">
    <sound-icon></sound-icon>
  </button>
</template>

<script setup>
  import SoundIcon from '@/components/icons/SoundIcon.vue';

  defineEmits(['showVolumeBar']);
</script>
