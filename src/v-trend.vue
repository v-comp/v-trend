<template>
  <h1 :class="styles.heading">{{text}}</h1>
</template>

<script>
  import classNames from 'classnames';
  import styles from './v-trend.css';

  export default {
    name: 'v-trend',
    props: {
      text: String
    },
    data() {
      return {
        styles: {
          heading: classNames(styles['heading'], styles['heading-primary'])
        }
      };
    }
  };
</script>
