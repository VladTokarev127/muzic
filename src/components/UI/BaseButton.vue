<template>
  <button type="button" :class="mode">
    {{ title }}
  </button>
</template>

<script setup>
  const props = defineProps({
    mode: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      validator(value) {
        return ['Оценить', 'Отменить', 'Сохранить'].includes(value);
      },
    },
  });
</script>

<style lang="sass" scoped>
  button
    display: block
    font-size: $default-font-size
    font-weight: 600
    line-height: $default-line-height
    letter-spacing: $letter-spacing
    padding: 20px
    border: 1px solid
    border-radius: 10px
    transition: all $transition

  button.primary
    color: $white-color
    background: $main-color
    border-color: $main-color

  button.cancel
    color: $text-color-secondary
    background: $fifth-color
    border-color: $main-color-light

  button.disabled
    color: $disabled-button-color
    background: $third-color
    border-color:  $third-color
    pointer-events: none
</style>
