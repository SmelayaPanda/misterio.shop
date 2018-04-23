<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
               class="sub_header">
      Доставка и оплата
    </el-button>
    <el-dialog
      id="delivery_info_dialog"
      center
      close-on-press-escape
      fullscreen
      :visible.sync="dialogVisible">
      <img src="@/assets/img/home/black_pattern.svg" class="bg_pattern" alt="">
      <el-row id="delivery_info_body_wrap">
        <el-col :xs="24" :sm="22" :md="9" :lg="7" :xl="6" id="delivery_info_img_wrap">
          <img src="@/assets/img/info/delivery.png" id="delivery_info_img" alt="">
        </el-col>
        <el-col :xs="24" :sm="22" :md="13" :lg="13" :xl="9">
          <h2 id="delivery_info_title">оставка и оплата</h2>
          <div id="delivery_info_text">
            <h3>Доставка курьером по г. Новосибирску:</h3>

            <p>Покупка доставляется по указанному адресу в течение 3 часов с 9.00 до 23.00, либо можно договориться о
              времени. Курьер за 30-60 минут до прибытия на адрес доставки предупреждает звонком о том, что выдвигается
              в вашу сторону. После прибытия курьера к клиенту время ожидания курьера не более 15 минут. Мы гарантируем
              полную конфиденциальность данных при доставке. <br>
              <b>Доставка по Новосибирску бесплатная. Отдаленные районы – от 200 рублей.</b> <br>
              <b>Бесплатная доставка при заказе от 3000 рублей вне зависимости от удаленности.</b> <br>
              <b>Способы оплаты: </b>
              наличными при получении, банковская карта.</p>

            <h3>Постаматы PickPoint</h3>
            <p> - возможность получить товар абсолютно анонимно:
              Пункты выдачи PickPoint расположены в торговых центрах, крупных розничных сетях и супермаркетах.
              Вы можете самостоятельно забрать заказ в постамате или пункте выдачи PickPoint. <br>
              Срок доставки составляет 2-5 рабочих дней. <br>
              Стоимость доставки: по тарифам PickPoint, в зависимости от региона. <br>
              <b>Бесплатная доставка при заказе от 3000 рублей.</b> <br>
              Способы оплаты: оплата наличными при получении.</p>

            <h3>Почта России:</h3>
            <p>Вы забираете заказ в отделении почты. <br>
              Срок доставки составляет 5-15 рабочих дней. <br>
              <b>Стоимость доставки: от 200 рублей. Бесплатная доставка при заказе от 3000 рублей.</b> <br>
              Способы оплаты: наложенный платеж.</p>

            <h3>Транспортная компания СДЭК:</h3>
            <p>Доставка на дом или до ближайшего пункта выдачи. <br>
              Срок доставки – от 2-х рабочих дней. <br>
              <b>Стоимость доставки: от 300 рублей. Бесплатная доставка при заказе от 3000 рублей.</b> <br>
              <b>Способы оплаты: оплата на сайте интернет-магазина (банковская карта).</b>
            </p>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeliveryInfo',
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
  }

  .sub_header:hover {
    cursor: pointer;
  }

  #delivery_info_body_wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 10vh;
  }

  #delivery_info_text {
    color: $color-info;
    margin-top: 20px;
    padding: 10px;
    height: 360px;
    overflow: scroll;
  }

  #delivery_info_text::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: $color-secondary-dark;
  }

  #delivery_info_text::-webkit-scrollbar {
    width: 12px;
    background-color: $color-secondary-dark;
  }

  #delivery_info_text::-webkit-scrollbar-corner {
    background-color: $color-secondary-dark;
  }

  #delivery_info_text::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: $color-primary;
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

  #delivery_info_img_wrap {
    text-align: end;
  }

  #delivery_info_img {
    height: 420px;
    margin: auto 0;
  }

  #delivery_info_title {
    color: $color-primary;
    font-family: $secondary-font;
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 12px;
  }

  @media only screen and (max-width: $sm-screen) {
    #delivery_info_img_wrap {
      text-align: left;
    }
    #delivery_info_body_wrap {
      margin-top: 2vh;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #delivery_info_img_wrap {
      text-align: center;
    }
    #delivery_info_body_wrap {
      margin-top: 0;
    }
    #delivery_info_img {
      height: 300px;
    }
    #delivery_info_title {
      text-align: center;
    }
  }
</style>
