<template lang="pug">
svg(
  :width="width",
  :height="height",
  :viewBox="viewBox"
)
  defs
    linearGradient(
      :id="gradId",
      x1="0",
      x2="0",
      y1="1",
      y2="0"
    )
      stop(
        v-for="stop in stops",
        :offset="stop.offset",
        :stop-color="stop.color"
      )
    mask(
      :id="maskId",
      x="0",
      y="0",
      width="100%",
      height="100%"
    )
      polyline(
        v-if="!isSmooth",
        :points="path",
        :stroke-width="strokeWidth",
        fill="transparent",
        stroke="#8cc665",
        ref="path"
      )
      path(
        v-if="isSmooth",
        :d="path",
        :stroke-width="strokeWidth",
        fill="transparent",
        stroke="#8cc665",
        ref="path"
      )
  g
    rect(
      :style="rectStyle",
      x="0",
      y="0",
      width="100%",
      height="100%"
    )
</template>

<script>
import getSmoothPath from './smooth.js';
let uid = 0;
const prefix = 'vTrEnD';
const defaultColors = [
  '#c6e48b',
  '#7bc96f',
  '#239a3b',
  '#196127'
];
const percent = n => (n * 100) + '%';
const toFixed = (n, d = 2) => +n.toFixed(d);

export default {
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
      default() {
        return defaultColors.slice(0);
      }
    },
    smooth: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    const gradId = `${prefix}-grad-${uid++}`;
    const maskId = `${prefix}-mask-${uid++}`;
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
    isSmooth() {
      return this.smooth && this.data.length > 2;
    },
    stops() {
      const divider = this.gradients.length - 1;
      return this.gradients.map((color, i) => ({
        color,
        offset: percent(i / divider)
      }));
    },
    points() {
      const p = this.padding;
      const w = this.width  - p * 2;
      const h = this.height - p * 2;
      const s = this.strokeWidth;
      const data = this.data.length >= 2 ? this.data : [this.data[0] || 0, 0, 0];
      const yMin = Math.min.apply(Math, data) - s/2;
      const yMax = Math.max.apply(Math, data) + s/2;
      const xUnit = w / data.length;
      const yUnit = h / (yMax - yMin);

      return data.map((d, i) => {
          const x = toFixed(i * xUnit, 5) + p;
          const y = toFixed(h - (d - yMin)* yUnit, 5) + p;
          return { x, y };
        });
    },
    viewBox() {
      const w = this.width;
      const h = this.height;
      return `0 0 ${w} ${h}`;
    },
    path() {
      return this.makePath(this.points);
    }
  },
  methods: {
    makePath(points) {
      if (this.isSmooth) {
        return getSmoothPath(points);
      } else {
        return points
          .map(({x, y}) => `${x},${y}`)
          .join(' ');
      }
    }
  }
};
</script>
