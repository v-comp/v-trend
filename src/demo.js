import VTrendComponent from './index';
window.Vue.use(VTrendComponent);

window.vm = new Vue({
  el: '#app',
  template: `
  <v-trend :width="width" :height="height" :data="data"></v-trend>`,
  data() {
    return {
      width: 155,
      height: 30,
      data: [10, 9, 9, 17, 2, 8, 7, 2, 25, 8, 14, 10, 5, 7, 3, 13, 5, 13, 7, 2, 10, 25, 27, 12, 11, 15, 2, 5, 27, 25, 9, 19, 1, 5, 26, 16, 12, 18, 12, 12, 1, 1, 8, 10, 7, 11, 1, 3, 2, 11, 8, 14]
    };
  },
});
