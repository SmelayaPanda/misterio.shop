<template>
  <div>
    <news-header></news-header>
    <!--NEWS 1-->
    <div id="article_wrapper">
      <div class="news_block">
        <el-row type="flex" justify="center" style="flex-wrap: wrap">
          <el-col :xs="20" :sm="9" :md="9" :lg="9" :xl="9">
            <v-card class="white" height="340px">
              <!--<v-card-media :src="p.img_0.card" height="300px"></v-card-media>-->
              <v-card-title style="height: 30px">
                <p class="grey--text mt-4">image</p>
              </v-card-title>
            </v-card>
          </el-col>
          <el-col id="last_news" :xs="20" :sm="9" :md="9" :lg="9" :xl="9" align="left">
            <router-link to="/news" exact>
              <div id="last_news_btn">
                Последние новости
              </div>
            </router-link>
            <div class="last_news_list">
              <span class="last_news_arrow"> > </span>
              <span class="last_news_title">Бразильские женщины остались без золотого фаллоиметатора</span>
            </div>
            <div class="last_news_list">
              <span class="last_news_arrow"> > </span>
              <span class="last_news_title">При покупке Sweet Night 3, лубрикант в Подарок!!!</span>
            </div>
            <div class="last_news_list">
              <span class="last_news_arrow"> > </span>
              <span class="last_news_title">Новое поступление!!! В разделе Фетиш, БДСМ новые позиции!!!</span>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <h1 id="news_title" align="left">Женская услада: история вибратора. 18+</h1>
            <p id="news_public_date" align="left">Опубликовано 12 марта 2018 года</p>
            <p id="news_text" align="left">Среди всех приспособлений, используемых для любовных утех, самой большой
              популярностью
              пользуются, пожалуй, наручники и, конечно, вибратор. Но применяли это чудо-изобретение поначалу немного не
              так, как мы привыкли, пользовались им в том числе и мужчины. <br> <br>
              <span class="news_text_subtitle">Бешеные матки </span> <br> <br>
              Со времен Древнего Египта многие женские болезни связывали с проблемами матки. Впервые диагноз «истерия»,
              связанный с эмоционально неустойчивым поведением женщин, появляется еще у Гиппократа, а Платон описывает
              состояние «бешенства», в которое якобы впадает матка женщины, когда не может зачать ребенка. Именно
              благодаря Платону «истерию» стали называть еще «бешенством матки». Сейчас этот диагноз, конечно, устарел,
              но сегодняшний герой — вибратор — именно ему обязан своим появлением.
              <br> <br>
              <span class="news_text_subtitle">Находка из Ульма</span>
              <br> <br>
              Лечили женскую «истерию» всевозможными способами: направленной на чувствительные места струей воды,
              поездками на лошадях, классическим массажем и различными предметами, имитирующими фаллос. Считается, что
              самый древний фаллоимитатор, которому примерно 28 тысяч лет, был обнаружен в Германии в пещере возле
              города Ульм. Сделан он из камня, и, как утверждают ученые, иногда применялся еще и для разжигания огня. В
              Древнем Египте пользовались приборами побогаче: в гробницах фараонов были найдены золотые и серебряные
              фаллоимитаторы. А в Древнем Китае применяли изделия из бронзы, нефрита и слоновой кости.Ох, нелегкая это
              работа!
              <br>
              В XIX веке диагноз «истерия» был особенно популярен, и чаще всего для его лечения применяли «массаж таза».
              Судя по всему, занятие это было довольно однообразное: нужно было «массировать таз» до наступления
              «приступа истерики» (так раньше наименовали оргазм). В фильме «Истерия» режиссера Тани Векслер хорошо
              показано, насколько утомительным был такой массаж для врача: дело далеко не всегда могло быть увенчано
              успехом, а руки у врача настолько уставали, что их приходилось окунать в чаши со льдом. Именно как
              средство борьбы с женской «истерией» и возник первый вибратор. В 1869 году американский врач Джордж Тейлор
              запатентовал прибор для лечения истерии, который работал на пару.</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import NewsHeader from './NewsHeader'

export default {
  name: 'Article',
  components: {NewsHeader},
  props: ['id'],
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
  #article_wrapper {
    margin-bottom: 30px;
  }

  #last_news {
    font-family: $primary-font;
    font-size: 12px;
    font-weight: 300;
    color: white;
    padding-top: 16px;
    padding-left: 90px;
  }

  #last_news_btn {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $color-secondary;
    color: white;
    width: 190px;
    height: 44px;
  }

  #last_news_btn:hover {
    cursor: pointer;
    text-shadow: $primary-text-shadow;
  }

  .last_news_list {
    font-family: $primary-font;
    font-size: 14px;
    font-weight: 500;
    color: $color-info;
    padding-top: 20px;
  }

  .last_news_arrow {
    font-size: 22px;
    font-weight: 600;
    color: $color-secondary;
    padding-right: 10px;
  }

  .last_news_title {
    margin-bottom: 20px;
  }

  #news_title {
    font-family: $primary-font;
    font-size: 28px;
    font-weight: 500;
    color: $color-secondary;
    padding-top: 40px;
  }

  #news_title:after {
    content: "";
    display: block;
    width: 42%;
    height: 3px;
    margin-top: 15px;
    border-bottom: 2px solid $color-secondary;
  }

  #news_public_date {
    font-family: $primary-font;
    font-size: 11px;
    font-weight: 600;
    color: $color-info;
    margin-top: 24px;
  }

  #news_text {
    font-family: $primary-font;
    font-size: 12px;
    font-weight: 600;
    color: $color-info;
    margin-top: 24px;
  }

  .news_text_subtitle {
    font-size: 14px;
  }

  @media only screen and (max-width: 767px) {
    #last_news {
      padding-left: 0;
    }
  }
</style>
