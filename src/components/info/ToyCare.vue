<template>
  <div>
    <p @click="dialogVisible = true"
       class="sub_header">
      Уход за игрушками
    </p>
    <el-dialog
      id="toy_care_dialog"
      center
      close-on-press-escape
      fullscreen
      :visible.sync="dialogVisible">
      <div id="toy_care_body">
        <img src="@/assets/img/home/white_pattern.svg" class="bg_pattern" alt="">
        <el-row id="toy_care_body_wrap">
          <el-col :xs="22" :sm="22" :md="9" :lg="7" :xl="6" id="toy_care_img_wrap">
            <img src="@/assets/img/info/care.png" id="toy_care_img" alt="">
          </el-col>
          <el-col :xs="22" :sm="22" :md="13" :lg="11" :xl="9">
            <h2 id="toy_care_title">ход за игрушками</h2>
            <div id="toy_care_text">
              <h4>Секс игрушки делаются из разных материалов, которые имеют свою специфику, но есть несколько общих
                основных
                правил обращения с любой интим игрушкой:
              </h4>

              <p>
                1. Любую секс-игрушку перед первым использованием необходимо помыть и проделывать это после каждого
                использования. Игрушки с батарейками надо мыть с особой осторожностью, чтобы не допустить попадания воды
                на контакты. Помимо мытья игрушки необходимо обрабатывать специальными средствами, предназначенными для
                ухода за ними.
              </p>

              <p>2. Не стоит хранить секс-игрушки с батарейками внутри, это может стать причиной их порчи.</p>

              <p>3. Практически со всеми секс-игрушками, которые вводятся внутрь тела или контактируют с половыми
                органами,
                необходимо использовать смазку. Для деликатных материалов подойдут смазки только на водной основе: они
                безопасны для любых материалов.</p>

              <h4>Уход за игрушками из силикона</h4>

              <p>Силикон является одним из наиболее популярных материалов в секс-индустрии. С такими игрушками
                рекомендуется использовать только лубриканты на водной основе. Игрушки из силикона хорошо переносят
                кипячение. Однако, если игрушка не из чистого силикона, а смеси, от подобных процедур лучше
                воздержаться.</p>

              <h4>Уход за игрушками из киберкожи</h4>

              <p>Такой материал широко используется для производства мастурбаторов, фаллоимитаторов и вибраторов, так
                как
                он очень точно имитирует человеческую кожу. С игрушками из киберкожи нужно обращаться по возможности
                бережно и аккуратно: так как материал пористый и нежный, он может легко порваться.</p>

              <p> Игрушки из киберкожи нужно вымыть теплой водой с антибактериальным средством. Чтобы быстро
                нейтрализовать
                все остатки влаги, можно обсыпать изделие специальной пудрой. После использования рекомендуется
                обработать
                игрушку специальным очистительным спреем.</p>

              <h4>Уход за гелевыми игрушками</h4>

              <p>Гель широко распространен, изделия из него мягки, эластичны и неприхотливы. Обычно их выпускают самых
                невообразимых ярких расцветок. С ними допускается использование любых лубрикантов, в том числе и на
                силиконовой основе. Мыть их можно обычным мылом с водой.</p>

              <h4>Уход за стеклянными игрушками</h4>

              <p>Для изготовления секс-игрушек используется специальная разновидность стекла: пирексное стекло. Оно
                обладает высочайшей механической прочностью и его сложно разбить или повредить даже в результате
                интенсивного механического воздействия. Такие игрушки можно мыть в 10%
                растворе хозяйственных дезинфицирующих средств, с водой и мылом, кипятить. Для стеклянных стимуляторов
                можно использовать посудомоечную машину.
              </p>

              <h4>Уход за игрушками из металла</h4>

              <p>Металлические игрушки служат больше других. Их можно мыть в 10% растворе хозяйственных дезинфицирующих
                средств, с водой и мылом, кипятить, но не рекомендуется пользоваться посудомоечной машиной, так как
                химические средства для полоскания могут навредить некоторым видам металла.</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ToyCare',
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

  #toy_care_body {
    width: 100vw;
    height: 100vh;
  }

  #toy_care_body_wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10vh;
  }

  #toy_care_text {
    color: $color-info;
    margin-top: 20px;
    padding: 10px;
    height: 360px;
    overflow: scroll;
  }

  #toy_care_text::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: $color-primary;
  }

  #toy_care_text::-webkit-scrollbar
  {
    width: 12px;
    background-color: $color-primary;
  }

  #toy_care_text::-webkit-scrollbar-corner {
    background-color: $color-primary;
  }

  #toy_care_text::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: $color-secondary;
  }

  .bg_pattern {
    position: absolute;
    height: 100vh;
    width: 100vw;
    top: 0;
    object-fit: cover;
    opacity: 0.2;
    z-index: 0;
  }

  #toy_care_img_wrap {
    text-align: end;
  }

  #toy_care_img {
    height: 420px;
    margin: auto 0;
  }

  #toy_care_title {
    color: $color-secondary;
    font-family: $secondary-font;
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 12px;
  }

  @media only screen and (max-width: $sm-screen) {
    #toy_care_img_wrap {
      text-align: left;
    }
    #toy_care_body_wrap {
      margin-top: 2vh;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #toy_care_img_wrap {
      text-align: center;
    }
    #toy_care_body_wrap {
      margin-top: 0;
    }
  }
</style>
