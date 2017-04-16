(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VTrend = factory());
}(this, (function () { 'use strict';

// https://gielberkers.com/drawing-a-smooth-bezier-line-through-several-points/
var calc = function (points, i) {
  var pCurr = points[i];
  var pNext = points[i + 1] || points[i - 1];
  var pNeNe = points[i + 2] || points[i - 2];
  var dirX  = pNeNe['x'] - pCurr['x'];
  var dirY  = pNeNe['y'] - pCurr['y'];
  var distance = Math.sqrt(
    Math.pow(dirX, 2) + Math.pow(dirY, 2)
  );
  var unitX = dirX / distance;
  var unitY = dirY / distance;
  var normal1 = { x: -unitY, y: unitX };
  var normal2 = { x: unitY, y: -unitX };
  var normal = i < points.length - 2 ? normal1 : normal2;
  var angle = Math.atan2(normal['y'], normal['x']) + Math.PI / 2;

  var s = 9;

  return {
    x: pNext['x'] + Math.cos(angle) * (distance / s),
    y: pNext['y'] + Math.sin(angle) * (distance / s)
  }
};

function getSmoothPath(points) {
  var path = "M ";
  for (var i = 0; i < points.length - 1; i++) {
    var elem$1 = points[i];
    var ctrl = calc(points, i);
    path += (elem$1.x) + " " + (elem$1.y) + " S " + (ctrl.x) + " " + (ctrl.y) + " ";
  }
  var elem = points[points.length - 1];
  path += (elem.x) + " " + (elem.y);
  return path;
}

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

  return +n.toFixed(d);
};

var VTrendComponent$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":_vm.width,"height":_vm.height,"viewBox":_vm.viewBox}},[_c('defs',[_c('linearGradient',{attrs:{"id":_vm.gradId,"x1":"0","x2":"0","y1":"1","y2":"0"}},_vm._l((_vm.stops),function(stop){return _c('stop',{attrs:{"offset":stop.offset,"stop-color":stop.color}})})),_c('mask',{attrs:{"id":_vm.maskId,"x":"0","y":"0","width":"100%","height":"100%"}},[(!_vm.useBezier)?_c('polyline',{ref:"path",attrs:{"points":_vm.path,"stroke-width":_vm.strokeWidth,"fill":"transparent","stroke":"#8cc665"}}):_vm._e(),(_vm.useBezier)?_c('path',{ref:"path",attrs:{"d":_vm.path,"stroke-width":_vm.strokeWidth,"fill":"transparent","stroke":"#8cc665"}}):_vm._e()])],1),_c('g',[_c('rect',{style:(_vm.rectStyle),attrs:{"x":"0","y":"0","width":"100%","height":"100%"}})])])},staticRenderFns: [],
  name: 'v-trend',
  props: {
    width: {
      type: Number,
      default: 155
    },
    height: {
      type: Number,
      default: 30
    },
    strokeWidth: {
      type: Number,
      default: 2.0
    },
    padding: {
      type: Number,
      default: 5
    },
    gradients: {
      type: Array,
      default: function default$1() {
        return defaultGradientStops.slice(0);
      }
    },
    smooth: {
      type: Boolean,
      default: false
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
    useBezier: function useBezier() {
      return this.smooth && this.data.length > 2;
    },
    stops: function stops() {
      var divider = this.gradients.length - 1;
      return this.gradients.map(function (color, i) { return ({
        color: color,
        offset: percent(i / divider)
      }); });
    },
    points: function points() {
      var p = this.padding;
      var w = this.width  - p * 2;
      var h = this.height - p * 2;
      var s = this.strokeWidth;
      var data = this.data.length >= 2 ? this.data : [this.data[0] || 0, 0, 0];
      var yMin = Math.min.apply(Math, data) - s/2;
      var yMax = Math.max.apply(Math, data) + s/2;
      var xUnit = w / data.length;
      var yUnit = h / (yMax - yMin);

      return data.map(function (d, i) {
          var x = toFixed(i * xUnit, 5) + p;
          var y = toFixed(h - (d - yMin)* yUnit, 5) + p;
          return { x: x, y: y };
        });
    },
    viewBox: function viewBox() {
      var w = this.width;
      var h = this.height;
      return ("0 0 " + w + " " + h);
    },
    path: function path() {
      return this.makePath(this.points);
    }
  },
  methods: {
    makePath: function makePath(points) {
      if (this.useBezier) {
        return getSmoothPath(points);
      } else {
        return points
          .map(function (ref) {
            var x = ref.x;
            var y = ref.y;

            return (x + "," + y);
        })
          .join(' ');
      }
    }
  }
};

VTrendComponent$1.install =  function (Vue) {
  Vue.component(VTrendComponent$1.name, VTrendComponent$1 );
};

return VTrendComponent$1;

})));
//# sourceMappingURL=v-trend.js.map
