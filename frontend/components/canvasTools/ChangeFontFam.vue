<template>
  <div
    class="is-flex font-wrapper has-border"
    :style="{ top: topOffset + 'px', left: leftOffset + 'px' }"
  >
    <div id="font-family">
      <select
        id="test"
        v-model="selectedFont"
        class="form-select p-2 has-border-left"
        name="form-select"
        @change="changeFont"
      >
        <option v-for="(option, key) in options" :key="key" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div id="font-style">
      <select
        id="font-style"
        v-model="selectedStyle"
        class="form-select p-2 has-border-right"
        name="form-select"
        @change="changeStyle"
      >
        <option v-for="(fontstyle, key) in fontstyles" :key="key" :value="fontstyle">
          {{ fontstyle }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['options', 'topOffset', 'leftOffset', 'fontstyles'],
  data() {
    return {
      selectedFont: 'Arial',
      selectedStyle: 'normal',
      selectedColor: 'rgb(0,0,0)',
    };
  },
  methods: {
    changeFont() {
      if (this.selectedFont !== 'Arial') {
        $nuxt.$emit('loadAndUse', this.selectedFont);
      } else {
        $nuxt.$emit('getActiveObject', this.selectedFont);
      }
    },
    changeStyle() {
      if (this.selectedStyle !== 'normal') {
        $nuxt.$emit('changeFontStyle', this.selectedStyle);
      } else {
        $nuxt.$emit('changeFontStyle', 'normal');
      }
    },
  },
};
</script>
<style scoped>
.form-select {
  height: 55px;
  background: transparent;
  border: none;
}
.font-wrapper {
  position: absolute;
}
.has-border {
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 55px;
  background-color: #f0f0f0;
}
.has-border-left {
  border: 0.5px solid darkgray;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.has-border-right {
  border: 0.5px solid darkgray;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
