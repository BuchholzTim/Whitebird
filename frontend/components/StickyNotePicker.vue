<template>
  <div class="colorPicker">
    <div
      v-for="(color, i) in colors"
      :key="i"
      class="stickyNote"
      @click="selectColor(color)"
    >
      <i class="fas fa-sticky-note" :style="{ color: color }"></i>
    </div>
  </div>
</template>

<script>
import customEvents from '~/utils/customEvents';

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
      this.$nuxt.$emit(customEvents.canvasTools.stickyNote, { color });
      /**  this.$nuxt.$emit('stickyColorChanged', color); */
    },
  },
};
</script>

<style lang="scss">
.colorPicker {
  justify-content: space-between;
  display: flex;
  .stickyNote {
    margin: 15px;
    transition: opacity 0.2s;
    &:not(.active):hover {
      cursor: pointer;
    }

    i {
      font-size: 2rem;
    }
  }
}
</style>
