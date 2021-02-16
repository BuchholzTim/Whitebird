<template>
  <div class="colorPicker">
    <div
      v-for="(color, i) in colors"
      :key="i"
      class="color"
      :style="{ 'background-color': color }"
      @click="selectColor(color)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    colors: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    selectColor(color) {
      this.$nuxt.$emit('colorChanged', color);
    },
  },
};
</script>

<style lang="scss">
.colorPicker {
  justify-content: space-between;
  display: flex;
  .color {
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 15px;
    transition: opacity 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:not(.active):hover {
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
