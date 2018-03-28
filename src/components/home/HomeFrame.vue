<template>
  <div class="full_slide">
    <user-icons></user-icons>
    <social-icons></social-icons>
    <div id="phone_number">+7 (800) <b>100 66 66</b></div>
    <app-header></app-header>
    <div id="flip_down_wrapper">
      <p id="flip_down">Листай вниз</p>
    </div>
    <!--LIVE CHAT-->
    <div id="load_wrapper">
      <div class="load">
        <i class="fa fa-heartbeat fa-3x"></i>
      </div>
    </div>
    <slot name="bg_image"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
import UserIcons from '@/components/home/UserIcons'
import SocialIcons from '@/components/home/SocialIcons'
import AppHeader from '@/components/home/Header'

export default {
  name: 'HomeFrame',
  components: {
    SocialIcons,
    UserIcons,
    AppHeader
  },
  methods: {
    nextSlide () {
      console.log('Next')
    }
  }
}
</script>

<style scoped lang="scss">
  .full_slide {
    z-index: 10;
  }

  #flip_down_wrapper {
    position: absolute;
    bottom: 12px;
    left: 50%;
    @include translateX(-43px);
    #flip_down {
      font-size: 11px;
      color: white;
      @include rotate(-90deg);
    }
    #flip_down:after {
      content: "";
      display: block;
      width: 60px;
      margin: 5px auto;
      border-bottom: 1px solid $color-secondary;
    }
  }

  #phone_number {
    position: absolute;
    bottom: 54px;
    left: 40px;
    font-size: 19px;
    color: $color-secondary;
  }

  /* the loader */
  /* the loader */
  #load_wrapper {
    position: absolute;
    bottom: 40px;
    right: 45px;
  }
  .load {
    width: 80px;
    height: 80px;
    /** height is required as absolute value **/
    background-color: $color-secondary;
    border-radius: 100%;
    position: relative;
    animation: pulse 2000ms linear infinite;
    -webkit-animation: pulse 2000ms linear infinite;
    -moz-animation: pulse 2000ms linear infinite;
  }

  .load i {
    position: absolute;
    top: 22px;
    left: 18px;
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 1em red;
  }

  .load:after,
  .load:before {
    display: block;
    margin: auto;
    position: absolute;
    content: "";
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background-color: $color-secondary;
  }

  .load:after {
    z-index: -100;
    -webkit-animation: outer-ripple 2000ms linear infinite;
    -moz-animation: outer-ripple 2000ms linear infinite;
    animation: outer-ripple 2000ms linear infinite;
  }

  .load:before {
    z-index: -200;
    -webkit-animation: inner-ripple 2000ms linear infinite;
    -moz-animation: inner-ripple 2000ms linear infinite;
    animation: inner-ripple 2000ms linear infinite;
  }

  /* outer ripple */

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    10% {
      transform: scale(1.1);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    20% {
      transform: scale(0.9);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }

  @-moz-keyframes pulse {
    0% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    10% {
      transform: scale(1.1);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    20% {
      transform: scale(0.9);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }

  @-webkit-keyframes pulse {
    0% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    10% {
      transform: scale(1.1);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    20% {
      transform: scale(0.9);
      filter: alpha(opacity=1);
      opacity: 1;
    }
    100% {
      transform: scale(0.8);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }

  @keyframes outer-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    80% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
    100% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-webkit-keyframes outer-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    80% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
    100% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-moz-keyframes outer-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    80% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
    100% {
      transform: scale(3);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  /* inner ripple */

  @keyframes inner-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    30% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-webkit-keyframes inner-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    30% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }

  @-moz-keyframes inner-ripple {
    0% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    30% {
      transform: scale(1);
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.5);
      filter: alpha(opacity=0);
      opacity: 0;
    }
  }
</style>
