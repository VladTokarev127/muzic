<template>
  <li :class="color">
    <slot />
  </li>
</template>

<script setup>
  const props = defineProps({
    color: { type: String, required: true },
  });
</script>

<style lang="sass" scoped>
  li
    display: inline-block
    font-size: 14px
    line-height: 17px
    letter-spacing: $letter-spacing
    color: $text-color-secondary
    padding: 8px 10px
    border-radius: 8px

  li.gray
    background: $third-color
  li.pink
    background: $pink-color
  li.peach
    background: $main-color-light
</style>
