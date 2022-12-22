<template>
  <button type="button">
    <img src="@/assets/images/icons/smile-icon.png" alt="smile icon" />
  </button>
</template>

<style lang="sass" scoped>
  button
    width: 60px
    height: 60px
    display: grid
    place-items: center
    padding: 13px
    background: $fifth-color
    border: 1px solid $main-color-light
    border-radius: 10px
    transition: all $transition
    &:disabled
      background: $third-color
      border-color: $third-color
      pointer-events: none
    &:disabled img
      filter: grayscale(1)
  button img
    transition: filter $transition
</style>
