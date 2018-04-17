<template>
  <div class="loading">
    <div class="loading-text">
      <span class="loading-text-words">M</span>
      <span class="loading-text-words">i</span>
      <span class="loading-text-words">s</span>
      <span class="loading-text-words">t</span>
      <span class="loading-text-words">e</span>
      <span class="loading-text-words">r</span>
      <span class="loading-text-words">i</span>
      <span class="loading-text-words">o</span>
      <span class="loading-text-words"></span>
      <span class="loading-text-words">S</span>
      <span class="loading-text-words">h</span>
      <span class="loading-text-words">o</span>
      <span class="loading-text-words">p</span>
      <p id="open_game">Откровенные игры 18+</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingMisterio'
}
</script>

<style scoped lang="scss">
  .loading {
    position: fixed;
    top: -100px;
    z-index: 1000;
  }

  .loading-text {
    text-align: center;
    position: absolute;
    width: 100%;
    font-size: 32px;
    height: 100px;
    line-height: 100px;
    span {
      display: inline-block;
      margin: 0 1px;
      color: #fff;
      @for $i from 0 through 16 {
        &:nth-child(#{$i + 1}) {
          filter: blur(0px);
          animation: blur-text 1.3s $i/16+s infinite linear alternate;
        }
      }
    }
  }

  #open_game {
    color: $color-info;
    margin-top: -60px;
    font-size: 14px;
    opacity: 0.8;
    font-family: $primary-font
  }

  @keyframes blur-text {
    0% {
      filter: blur(0px);
    }
    100% {
      filter: blur(3px);
    }
  }
</style>
