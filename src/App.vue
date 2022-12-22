<template>
  <router-view />
</template>

<style lang="sass">
  *
    box-sizing: border-box
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
  :before, :after
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
  *, body
    -webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-focus-ring-color: rgba(0,0,0,0)
    outline: none
  *::-webkit-input-placeholder
    color: #8E9CBB
    opacity: 1
    transition: opacity .3s
  *:focus::-webkit-input-placeholder
    opacity: 0
  *:-moz-placeholder
    color: #8E9CBB
    opacity: 1
    transition: opacity .3s
  *:focus::-moz-placeholder
    opacity: 0
  *::-moz-placeholder
    color: #8E9CBB
    opacity: 1
    transition: opacity .3s
  *:focus:-moz-placeholder
    opacity: 0
  *:-ms-input-placeholder
    color: #8E9CBB
    opacity: 1
    transition: opacity .3s
  *:focus:-ms-input-placeholder
    opacity: 0
  body input:focus:required:invalid,
  body textarea:focus:required:invalid
    color: #000
  body input:required:valid,
  body textarea:required:valid
    color: #000
  *, body
    -webkit-tap-highlight-color: rgba(0,0,0,0)
    -webkit-focus-ring-color: rgba(0,0,0,0)
    outline: none
  button
    font-family: inherit
    background: none
    padding: 0
    border: none
    margin: 0
    outline: none
    overflow: visible
    cursor: pointer
  img
    max-width: 100%
    height: auto
  ul
    padding: 0
    margin: 0
  ul li
    list-style: none
  h1,
  h2,
  h3,
  h4,
  h5,
  h6
    margin: 0
  p
    margin: 0
  html, body
    height: 100%
  body
    position: relative
    min-width: 320px
    font-family: $default-font
    font-size: $default-font-size
    line-height: $default-line-height
    margin: 0
    overflow-x: hidden
    &.overflow-hidden
      overflow: hidden
  .page-wrapper
    background-color: $background-color
    display: flex
    flex-direction: column
    min-height: 100vh
  .container
    width: 100%
    max-width: $container-max-width
    padding: $container-padding
    margin: 0 auto
  .main
    flex: 1
    margin-top: auto
    margin-bottom: auto
  .v-enter-from
    opacity: 0
    transform: translateY(-30px)
  .v-enter-active
    transition: all $transition
  .v-enter-to
    opacity: 1
    transform: translateY(0)
  .v-leave-from
    opacity: 1
    transform: translateY(0)
  .v-leave-active
    transition: all $transition
  .v-leave-to
    opacity: 0
    transform: translateY(-30px)
</style>
