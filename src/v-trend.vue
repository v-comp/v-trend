<template>
  <svg :width="width" :height="height" :viewBox="viewBox">
    <defs>
      <linearGradient :id="gradId" x1="0" x2="0" y1="1" y2="0">
        <stop v-for="stop in stops" :offset="stop.offset" :stop-color="stop.color"></stop>
      </linearGradient>
      <mask :id="maskId" x="0" y="0" width="100%" height="100%">
        <polyline :points="points" fill="transparent" stroke="#8cc665" 
        transform="scale(1, 1)"
        :stroke-width="strokeWidth"></polyline>
      </mask>
    </defs>
    <g transform="scale(1, 1)">
      <rect x="0" y="0" width="100%" height="100%" :style="rectStyle"></rect>
    </g>
  </svg>
</template>

<script>
let linearGradientUid = 0;
const idPrefix = 'vTrEnD';
const defaultGradientStops = [
  '#c6e48b',
  '#7bc96f',
  '#239a3b',
  '#196127'
];
const percent = n => (n * 100) + '%';
const toFixed = (n, d = 2) => n.toFixed(d);

export default {
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
      default() {
        return defaultGradientStops.slice(0);
      }
    },
    data: String
  },
  data() {
    const gradId = `${idPrefix}-grad-${linearGradientUid++}`;
    const maskId = `${idPrefix}-mask-${linearGradientUid++}`;
    return {
      gradId,
      maskId,
      rectStyle: {
        stroke: 'none',
        fill: `url(#${gradId})`,
        mask: `url(#${maskId})`
      }
    };
  },
  computed: {
    stops() {
      const divider = this.gradients.length - 1;
      return this.gradients.map((color, i) => ({
        color,
        offset: percent(i / divider)
      }));
    },
    points() {
      const w = this.width;
      const h = this.height;
      const s = this.strokeWidth;
      const data = this.data;
      const yMin = Math.min.apply(Math, data) - s/2;
      const yMax = Math.max.apply(Math, data) + s/2;
      const xUnit = w / data.length;
      const yUnit = h / (yMax - yMin);
      return data.map((d, i) => {
          const x = toFixed(i * xUnit, 5);
          const y = toFixed(h - (d - yMin)* yUnit, 5);
          return `${x},${y}`;
        }).join(' ');
    },
    viewBox() {
      const w = this.width;
      const h = this.height;
      return `0 0 ${w} ${h}`;
    }
  }
};
</script>
