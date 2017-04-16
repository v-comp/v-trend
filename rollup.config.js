import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import replace from 'rollup-plugin-replace';

const isDEV = process.env.NODE_ENV !== 'production';

export default {
  entry: isDEV ? './src/demo.js' : './src/index.js',
  targets: isDEV ? [
    { dest: 'dist/demo.js', format: 'umd' }
  ] : [
    { dest: 'dist/v-trend.js', format: 'umd' },
    { dest: 'dist/v-trend.common.js', format: 'cjs' },
    { dest: 'dist/v-trend.esm.js', format: 'es' }
  ],
  format: 'umd',
  sourceMap: true,
  useStrict: true,
  moduleName: 'VTrend',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    vue({
      css: true,
      compileTemplate: true
    }),
    commonjs(),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    buble({
      objectAssign: 'Object.assign'
    })
  ]
};
