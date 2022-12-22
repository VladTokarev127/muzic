<template>
  <div class="slider">
    <div class="slider-hit-area" @click="onClick">
      <div class="slider-container" ref="wrapper">
        <div class="filled" :style="{ height: percent + '%' }"></div>
        <div
          class="handle"
          :style="{ bottom: percent + '%' }"
          @mousedown="onMouseDown"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  const emit = defineEmits(['changeVolume']);

  const percent = ref(50);
  const dragging = ref(false);
  const wrapper = ref(null);

  const clamp = (val, min, max) => {
    return Math.max(min, Math.min(max, val));
  };

  onMounted(() => {
    document.addEventListener('mousemove', (e) => {
      if (!dragging.value) return;
      update(e);
    });
    document.addEventListener('mouseup', (e) => {
      dragging.value = false;
    });
  });

  const onMouseDown = () => {
    dragging.value = true;
  };

  const getRect = () => {
    const container = wrapper.value;
    return container.getBoundingClientRect();
  };

  const update = (e) => {
    const rect = getRect();
    percent.value =
      100 -
      ((clamp(e.clientY, rect.top, rect.bottom) - rect.top) / rect.height) *
        100;
    emit('changeVolume', percent.value);
  };

  const onClick = (e) => {
    update(e);
  };
</script>

<style lang="sass" scoped>
  .slider
    position: relative
    width: 30px
    background-color: $fifth-color
    padding: 5px 12px
    border: 1px solid $main-color-light
    border-radius: 5px
    &::after
      content: ''
      position: absolute
      bottom: -6px
      left: 10px
      width: 0
      height: 0
      border-right: 4px solid transparent
      border-top: 7px solid $fifth-color
      border-left: 4px solid transparent
      filter: drop-shadow(0 2px 0 $main-color-light)
      z-index: 1
  .slider-hit-area
    height: 100px
    display: flex
    flex-direction: column
    align-items: center
    cursor: pointer
  .slider-hit-area .slider-container
    position: relative
    width: 6px
    height: 100%
    background-color: $main-color-light
    border-radius: 5px
  .slider-hit-area .filled
    width: 100%
    position: absolute
    bottom: 0
    left: 0
    background-color: $main-color
    border-radius: 5px
  .slider-hit-area .handle
    width: 20px
    height: 20px
    position: absolute
    left: 50%
    background-color: $main-color
    border: 3px solid $white-color
    border-radius: 50%
    transform: translate(-50%, 50%)
    z-index: 2
</style>
