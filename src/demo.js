import VTrendComponent from './index';
window.Vue.use(VTrendComponent);

import hanabi from 'hanabi';
import GithubBadge from 'vue-github-badge';

window.vm = new Vue({
  el: '#app',
  components: { GithubBadge },
  template: `<div class="container">
    <github-badge slug="v-comp/v-trend" />
    <h1>v-trend</h1>
    <v-trend
      :width="width"
      :height="height"
      :data="data"
      :padding="10"
      stroke-width="2"
    ></v-trend>
    <pre v-html="code"></pre>
    <v-trend
      :width="width"
      :height="height"
      :data="data"
      :padding="10"
      stroke-width="2"
      smooth
    ></v-trend>
    <pre v-html="code2"></pre>
</div>`,
  data() {
    const data = [10, 9, 9, 17, 2, 8, 7, 2, 25, 8, 14, 10, 5, 7, 3, 13, 5, 13, 7, 2, 10, 25, 27, 12, 11, 15, 2, 5, 27, 25, 9, 19, 1, 5, 26, 16, 12, 18, 12, 12, 1, 1, 8, 10, 7, 11, 1, 3, 2, 11, 8, 14];
    return {
      width: 200,
      height: 50,
      data,
      code: hanabi(`<v-trend
  :width="200"
  :height="50"
  :data="[10, 9, 9, 17, 2, 8, 7, 2, 25, 8, 14, ...]"
  :padding="10"
  :stroke-width="2"
></v-trend>`),
      code2: hanabi(`<v-trend
  :width="200"
  :height="50"
  :data="[10, 9, 9, 17, 2, 8, 7, 2, 25, 8, 14, ...]"
  :padding="10"
  :stroke-width="2"
  smooth
></v-trend>`)
    };
  },
});
