(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var linearGradientUid = 0;
var idPrefix = 'vTrEnD';
var defaultGradientStops = [
  '#c6e48b',
  '#7bc96f',
  '#239a3b',
  '#196127'
];
var percent = function (n) { return (n * 100) + '%'; };
var toFixed = function (n, d) {
  if ( d === void 0 ) d = 2;

  return n.toFixed(d);
};

var VTrendComponent$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":_vm.width,"height":_vm.height,"viewBox":_vm.viewBox}},[_c('defs',[_c('linearGradient',{attrs:{"id":_vm.gradId,"x1":"0","x2":"0","y1":"1","y2":"0"}},_vm._l((_vm.stops),function(stop){return _c('stop',{attrs:{"offset":stop.offset,"stop-color":stop.color}})})),_c('mask',{attrs:{"id":_vm.maskId,"x":"0","y":"0","width":"100%","height":"100%"}},[_c('polyline',{attrs:{"points":_vm.points,"fill":"transparent","stroke":"#8cc665","transform":"scale(1, 1)","stroke-width":_vm.strokeWidth}})])],1),_c('g',{attrs:{"transform":"scale(1, 1)"}},[_c('rect',{style:(_vm.rectStyle),attrs:{"x":"0","y":"0","width":"100%","height":"100%"}})])])},staticRenderFns: [],
  name: 'v-trend',
  props: {
    width: {
      type: [Number, String],
      default: 155
    },
    height: {
      type: [Number, String],
      default: 30
    },
    strokeWidth: {
      type: [Number, String],
      default: 2.0
    },
    gradients:{
      type: Array,
      default: function default$1() {
        return defaultGradientStops.slice(0);
      }
    },
    data: String
  },
  data: function data() {
    var gradId = idPrefix + "-grad-" + (linearGradientUid++);
    var maskId = idPrefix + "-mask-" + (linearGradientUid++);
    return {
      gradId: gradId,
      maskId: maskId,
      rectStyle: {
        stroke: 'none',
        fill: ("url(#" + gradId + ")"),
        mask: ("url(#" + maskId + ")")
      }
    };
  },
  computed: {
    stops: function stops() {
      var divider = this.gradients.length - 1;
      return this.gradients.map(function (color, i) { return ({
        color: color,
        offset: percent(i / divider)
      }); });
    },
    points: function points() {
      var w = this.width;
      var h = this.height;
      var s = this.strokeWidth;
      var data = this.data;
      var yMin = Math.min.apply(Math, data) - s/2;
      var yMax = Math.max.apply(Math, data) + s/2;
      var xUnit = w / data.length;
      var yUnit = h / (yMax - yMin);
      return data.map(function (d, i) {
          var x = toFixed(i * xUnit, 5);
          var y = toFixed(h - (d - yMin)* yUnit, 5);
          return (x + "," + y);
        }).join(' ');
    },
    viewBox: function viewBox() {
      var w = this.width;
      var h = this.height;
      return ("0 0 " + w + " " + h);
    }
  }
};

VTrendComponent$1.install =  function (Vue) {
  Vue.component(VTrendComponent$1.name, VTrendComponent$1 );
};

window.Vue.use(VTrendComponent$1);

window.vm = new Vue({
  el: '#app',
  template: "\n  <v-trend :width=\"width\" :height=\"height\" :data=\"data\"></v-trend>",
  data: function data() {
    return {
      width: 155,
      height: 30,
      data: [10, 9, 9, 17, 2, 8, 7, 2, 25, 8, 14, 10, 5, 7, 3, 13, 5, 13, 7, 2, 10, 25, 27, 12, 11, 15, 2, 5, 27, 25, 9, 19, 1, 5, 26, 16, 12, 18, 12, 12, 1, 1, 8, 10, 7, 11, 1, 3, 2, 11, 8, 14]
    };
  },
});

})));
//# sourceMappingURL=demo.js.map
