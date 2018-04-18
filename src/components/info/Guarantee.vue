<template>
  <div>
    <p @click="dialogVisible = true"
       class="sub_header">
      Гарантия и возврат
    </p>
    <el-dialog
      id="guarantee_dialog"
      center
      close-on-press-escape
      fullscreen
      :visible.sync="dialogVisible">
      <img src="@/assets/img/home/black_pattern.svg" class="bg_pattern" alt="">
      <el-row id="guarantee_body_wrap">
        <el-col :xs="22" :sm="10" :md="7" :lg="6" :xl="5" id="guarantee_img_wrap">
          <img src="@/assets/img/info/guarantee.png" id="guarantee_img" alt="">
        </el-col>
        <el-col :xs="22" :sm="12" :md="11" :lg="10" :xl="9">
          <h2 id="guarantee_title">арантии и возврат</h2>
          <p class="guarantee_text">
            По закону РФ товары интимного назначения, белье и косметика обмену или возврату не подлежат. Исключением
            является заводской брак производителя. Вы можете проверить работоспособность при получении заказа и, в
            случае брака, вернуть товар, если он не является бывшим в использовании, а также не повреждена упаковка.
            Если товар доставляется курьером, Вы можете связаться с нами в течение двух часов после получения товара в
            случае выявления брака.
            На товары брендов We-Vibe, LELO, Ovo, Satisfyer, Mystim, Nexus, Womanizer, Svakom, Magic Motion, RestArt,
            Imtoy действует гарантия от производителя в течение 1 года эксплуатации.
            На товары брендов Fun Factory действует гарантия 2 года от производителя.
            <br> <br>
            В случае поломки этих товаров необходимо связаться с нами. К обмену и возврату не принимается товар в
            неполной комплектации или поврежденной упаковке.
          </p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Guarantee',
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style scoped lang="scss">
  .sub_header {
    font-family: $primary-font;
    font-weight: 600;
    color: $color-info;
    font-size: 12px;
    line-height: 22px;
  }

  .sub_header:hover {
    cursor: pointer;
  }

  #guarantee_body_wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10vh;
  }

  .bg_pattern {
    position: fixed;
    width: auto;
    height: 100%;
    top: 0;
    transform: scale(1.35);
    object-fit: cover;
    opacity: 0.2;
    z-index: 0;
  }

  #guarantee_img_wrap {
    text-align: end;
  }

  #guarantee_img {
    height: 380px;
    margin: auto 0;
  }

  #guarantee_title {
    color: $color-primary;
    font-family: $secondary-font;
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 5px;
  }

  .guarantee_text {
    color: white;
    font-size: 12px;
    font-weight: 500;
    margin-top: 15px;
    padding-right: 20px;
  }

  @media only screen and (max-width: $sm-screen) {
    .sub_header {
      line-height: 18px;
    }
  }
  @media only screen and (max-width: $xs-screen) {
    #guarantee_img_wrap {
      text-align: center;
    }
    #guarantee_body_wrap {
      margin-top: 1vh;
    }
    #guarantee_img {
      height: 340px;
    }
    #guarantee_title {
      text-align: center;
      margin-top: 0;
    }
  }
</style>
