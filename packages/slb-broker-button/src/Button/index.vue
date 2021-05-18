<!--
 * @Date: 2021-05-18 14:25:41
 * @LastEditors: Timothy
 * @LastEditTime: 2021-05-18 15:52:05
 * @Description: 
-->
<template>
  <el-button type="button" :class="classes" @click="onClick1" :style="style">{{ label }}</el-button>
</template>

<script>

export default {
  name: 'MyButton',

  props: {
    label: {
      type: String,
      default:"按钮"
    },
    primary: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  computed: {
    classes() {
      return {
        'storybook-button': true,
        'storybook-button--primary': this.primary,
        'storybook-button--secondary': !this.primary,
        [`storybook-button--${this.size}`]: true,
      };
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      };
    },
  },

  methods: {
    onClick1() {
      this.$emit('onClick1');
    },
  },
};
</script>
