<template>
  <div id="page_title">
    <div id="top_title_wrap">
      <img id="top_title" src="@/assets/icons/for_you.svg" height="20px" alt="">
    </div>
    <p id="middle_title">
      <slot name="middleTitle"></slot>
    </p>
    <p id="bottom_title">
      <slot name="bottomTitle"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'PageTitle'
}
</script>

<style scoped lang="scss">
  #page_title {
    padding-top: 60px;
    padding-bottom: 130px;
  }

  #top_title {
    margin-bottom: 18px;
  }

  #middle_title {
    font-family: $secondary-font;
    font-size: 39px;
    margin-top: -25px;
    background: linear-gradient(to right, white 43%, $color-secondary 51%);
    color: transparent;
    -webkit-background-clip: text;
  }

  #middle_title:after {
    content: "";
    display: block;
    width: 238px;
    height: 3px;
    margin: -15px auto -5px;
    border-bottom: 2px solid $color-secondary;
  }

  #bottom_title {
    font-family: $primary-font;
    font-size: 12px;
    color: white;
  }

  @media only screen and (max-width: $sm-screen) {
    #middle_title {
      font-size: 32px;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #page_title {
      padding-top: 5vh;
      padding-bottom: 5vh;
    }
    #middle_title {
      font-size: 28px;
    }
    #bottom_title {
      padding-right: 20px;
      padding-left: 20px;
    }
  }
</style>
