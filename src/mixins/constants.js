export const appConstants = {
  data: function () {
    return {
      appMail: 'montessoriberdsk@gmail.com',
      PRODUCT_CLASSIFICATION: [{
        value: 'sexToy',
        label: 'Секс-игрушки',
        icon: '/static/icon/shop/penis.svg',
        children: [
          {value: 'vibrator', label: 'вибраторы'},
          {value: 'dildo', label: 'фаллоимитаторы'},
          {value: 'vaginalBall', label: 'вагинальные шарики'},
          {value: 'analToy', label: 'анальные игрушки'},
          {value: 'strap', label: 'страпоны'},
          {value: 'ring', label: 'кольца и насадки'},
          {value: 'masturbator', label: 'мастурбаторы'},
          {value: 'pump', label: 'помпы'},
          {value: 'prostate', label: 'массажеры простаты'}
        ]
      }, {
        value: 'bdsm',
        label: 'BDSM, фетиш',
        icon: '/static/icon/shop/cuffs.svg',
        children: [
          {value: 'fixation', label: 'фиксация и бондаж'},
          {value: 'mask', label: 'маски'},
          {value: 'collar', label: 'ошейники'},
          {value: 'gag', label: 'кляпы'},
          {value: 'sets', label: 'наборы'},
          {value: 'bdsmClothes', label: 'BDSM-одежда'},
          {value: 'nipple', label: 'зажимы для сосков'},
          {value: 'medical', label: 'медицинский фетиш'},
          {value: 'percussion', label: 'ударные девайсы'}
        ]
      }, {
        value: 'cosmetic',
        label: 'Интим-косметика',
        icon: '/static/icon/shop/cream.svg',
        children: [
          {value: 'lubricant', label: 'спреи, крема, лубриканты'},
          {value: 'oil', label: 'массажные масла'},
          {value: 'perfume', label: 'духи с феромонами'}
        ]
      }, {
        value: 'eroticLingerie',
        label: 'Эротическое белье',
        icon: '/static/icon/shop/underwear.svg',
        children: [
          {value: 'womenEroticLingerie', label: 'женское белье'},
          {value: 'menEroticLingerie', label: 'мужское белье'}
        ]
      }, {
        value: 'condom',
        label: 'Презервативы',
        icon: '/static/icon/shop/condom.svg'
      }, {
        value: 'baa',
        label: 'БАДЫ',
        icon: '/static/icon/shop/pills.svg',
        children: [
          {value: 'womenBaa', label: 'для женщин'},
          {value: 'menBaa', label: 'для мужчин'},
          {value: 'unisexBaa', label: 'унисекс'}
        ]}
      ]
    }
  }
}
