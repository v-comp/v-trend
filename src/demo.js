import VTrendComponent from './index';
window.Vue.use(VTrendComponent);

// logic of your demo here...
let vm = new Vue({
  el: '#app',
  template: '<v-trend :text="text"></v-trend>',
  data() {
    return {
      text: 'Hello World'
    };
  },
});
