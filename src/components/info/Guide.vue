<template>
  <div>
    <el-button type="text" @click="dialogVisible = true"
       class="sub_header">
      Гид размеров
    </el-button>
    <el-dialog
      id="guide_dialog"
      center
      close-on-press-escape
      fullscreen
      :visible.sync="dialogVisible">
      <img src="@/assets/img/home/white_pattern.svg" class="bg_pattern" alt="">
      <el-row id="guide_body_wrap">
        <el-col :xs="24" :sm="22" :md="9" :lg="7" :xl="5" id="guide_img_wrap">
          <img src="@/assets/img/info/guide.png" id="guide_img" alt="">
        </el-col>
        <el-col :xs="23" :sm="22" :md="14" :lg="13" :xl="9">
          <h2 id="guide_title">ид размеров</h2>
          <p id="table_1_caption">
            Таблица соответствия размеров женской одежды
          </p>
          <table id="guide_table_1" style="width:100%">
            <tr>
              <th>EU</th>
              <th>32</th>
              <th>34</th>
              <th>36</th>
              <th>38</th>
              <th>40</th>
              <th>42</th>
              <th>44</th>
              <th>46</th>
              <th>48</th>
            </tr>
            <tr>
              <th>RUS</th>
              <th>38</th>
              <th>40</th>
              <th>42</th>
              <th>44</th>
              <th>46</th>
              <th>48</th>
              <th>50</th>
              <th>52</th>
              <th>54</th>
            </tr>
            <tr>
              <th>US</th>
              <th>0</th>
              <th>2</th>
              <th>4</th>
              <th>6</th>
              <th>8</th>
              <th>10</th>
              <th>12</th>
              <th>14</th>
              <th>16</th>
            </tr>
            <tr>
              <th>UK</th>
              <th>4</th>
              <th>6</th>
              <th>8</th>
              <th>10</th>
              <th>12</th>
              <th>14</th>
              <th>16</th>
              <th>18</th>
              <th>20</th>
            </tr>
            <tr>
              <th>GER</th>
              <th>30</th>
              <th>32</th>
              <th>34</th>
              <th>36</th>
              <th>38</th>
              <th>40</th>
              <th>42</th>
              <th>44</th>
              <th>46</th>
            </tr>
            <tr>
              <th>FR</th>
              <th>32</th>
              <th>34</th>
              <th>36</th>
              <th>38</th>
              <th>40</th>
              <th>42</th>
              <th>44</th>
              <th>46</th>
              <th>48</th>
            </tr>
            <tr>
              <th>INT</th>
              <th>XXS</th>
              <th>XS</th>
              <th>S</th>
              <th>M</th>
              <th>M</th>
              <th>L</th>
              <th>XL</th>
              <th>XXL</th>
              <th>XXXL</th>
            </tr>
          </table>
          <table id="guide_table_2">
            <tr>
              <th>Российский размер</th>
              <th>40</th>
              <th>42</th>
              <th>44</th>
              <th>46</th>
              <th>48</th>
              <th>50</th>
              <th>52</th>
              <th>54</th>
              <th>56</th>
            </tr>
            <tr>
              <th>Обхват груди(см)</th>
              <th>78-82</th>
              <th>82-86</th>
              <th>86-90</th>
              <th>90-94</th>
              <th>94-98</th>
              <th>98-102</th>
              <th>102-106</th>
              <th>106-110</th>
              <th>110-114</th>
            </tr>
            <tr>
              <th>Обхват талии(см)</th>
              <th>58-62</th>
              <th>62-66</th>
              <th>66-70</th>
              <th>70-74</th>
              <th>74-78</th>
              <th>78-82</th>
              <th>82-86</th>
              <th>86-90</th>
              <th>90-94</th>
            </tr>
            <tr>
              <th>Обхват бедер(см)</th>
              <th>84-88</th>
              <th>88-92</th>
              <th>92-96</th>
              <th>96-100</th>
              <th>100-104</th>
              <th>104-108</th>
              <th>108-112</th>
              <th>112-116</th>
              <th>116-120</th>
            </tr>
          </table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Guide',
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

  #guide_body_wrap {
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

  #guide_img_wrap {
    text-align: end;
  }

  #guide_img {
    height: 420px;
    margin: auto 0;
  }

  #guide_title {
    color: $color-secondary;
    font-family: $secondary-font;
    font-size: 32px;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 12px;
  }

  @mixin guide_table {
    color: $color-info;
    font-size: 12px;
    font-weight: 500;
    margin-top: 80px;
    padding-right: 20px;
  }

  #guide_table_1 {
    @include guide_table;
    margin-top: 0px;
  }

  #guide_table_2 {
    @include guide_table;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #table_1_caption {
    color: white;
    font-weight: 500;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 3px;
  }

  table, th, td {
    border: 1px solid $color-secondary-ultra-dark;
    border-collapse: collapse;
  }

  th, td {
    padding: 5px 5px 5px 10px;
    text-align: left;
  }

  @media only screen and (max-width: $sm-screen) {
    #guide_img_wrap {
      text-align: left;
    }
    #guide_body_wrap {
      margin-top: 5vh;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #guide_img_wrap {
      text-align: center;
    }
    #guide_body_wrap {
      margin-top: 0;
    }
    #guide_table_1,
    #guide_table_2 {
      margin: 0;
      writing-mode: vertical-rl;
      /*transform: rotate(90deg);*/
    }
    #guide_table_2 {
      margin-top: 10px;
    }
    #guide_img {
      height: 380px;
    }
    #guide_title {
      text-align: center;
      margin-top: 0;
    }
  }
</style>
