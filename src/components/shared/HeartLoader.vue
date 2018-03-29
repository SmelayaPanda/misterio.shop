<template>
  <div id="spinner">
  <span class="loader">
    <i class="fa fa-heart"></i>
    <i class="fa fa-heart"></i>
  </span>
  </div>
</template>

<script>
export default {
  name: 'HeartLoader'
}
</script>

<style scoped>
  #spinner {
    position: fixed;
    width: 100px;
    height: 100px;
    left: 50%;
    margin-left: -100px;
    top: 50%;
    margin-top: -100px;
    opacity: 0.5;
  }
  #spinner .loader {
    position: relative;
  }
  #spinner .loader i {
    position: absolute;
    font-size: 100px;
  }
  #spinner .loader i:first-of-type {
    color: #ff6868;
    -webkit-transform: scale(0, 0);
    opacity: 0.0;
    -webkit-animation: loading1 2s ease-in-out;
    -webkit-animation-iteration-count: infinite;
  }
  #spinner .loader i:last-of-type {
    color: #800000;
    -webkit-transform: scale(1, 1);
    opacity: 1.0;
    -webkit-animation: loading2 2s ease-out;
    -webkit-animation-iteration-count: infinite;
  }

  @-webkit-keyframes loading1 {
    0% {
      color: #ff6868;
      -webkit-transform: scale(0, 0);
      opacity: 0.0;
    }
    50% {
      color: #d36868;
      -webkit-transform: scale(1, 1);
      opacity: 1.0;
    }
    100% {
      color: #ff6868;
      -webkit-transform: scale(0, 0);
      opacity: 0.0;
    }
  }
  @-webkit-keyframes loading2 {
    0% {
      color: #800000;
      -webkit-transform: scale(1, 1);
      opacity: 1.0;
    }
    50% {
      color: #711f1f;
      -webkit-transform: scale(0, 0);
      opacity: 0;
    }
    100% {
      color: #800000;
      -webkit-transform: scale(1, 1);
      opacity: 1.0;
    }
  }

</style>
