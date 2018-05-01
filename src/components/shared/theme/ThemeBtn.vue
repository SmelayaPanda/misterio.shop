<template>
  <span
    :class="type === 'primary' ? 'primary_btn' : 'secondary_btn'"
    :style="`
      width: ${width};
      height: ${height};
      font-weight: ${fontWeight};
      font-size: ${fontSize};
    `">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'PrimaryBtn',
  props: ['type', 'width', 'height', 'fontWeight', 'fontSize']
}
</script>

<style scoped lang="scss">
  @mixin btnCommon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 180px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 1px;
    transition: all .3s;
  }

  .primary_btn {
    @include btnCommon;
    font-family: $primary-font;
    background: $color-secondary;
    color: white;
  }

  .secondary_btn {
    @include btnCommon;
    border: 1px solid $color-secondary;
    color: white;
  }

  .primary_btn:hover {
    cursor: pointer;
  }

  .secondary_btn:hover {
    cursor: pointer;
    background: $color-secondary;
  }
</style>
