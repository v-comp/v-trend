import VTrendComp from './v-trend.vue';

VTrendComp.install =  Vue => {
  Vue.component(VTrendComp.name, VTrendComp);
};

if (window.Vue && Vue.use) {
  window.Vue.use(VTrendComp);
}

export default VTrendComp;
