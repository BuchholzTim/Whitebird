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

import customEvents from '~/utils/customEvents';

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
    topOffset: {
      type: Number,
      required: true,
    },
    leftOffset: {
      type: Number,
      required: true,
    },
    fontstyles: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedFont: 'Arial',
      selectedStyle: 'normal',
      selectedColor: 'rgb(0,0,0)',
    };
  },
  methods: {
    createStickyToolBox(obj) {
      const objCenter = obj.getCenterPoint();
      const newContainer = {
        options: ['Pacifico', 'VT323', 'Quicksand', 'Inconsolata', 'Roboto', 'Arial'],
        topOffset: objCenter.y + (obj.height * 0.5 * obj.scaleY) + 50,
        leftOffset: objCenter.x - (obj.width * 0.5 * obj.scaleX),
        fontstyles: ['italic', 'bold', 'normal'],
      };
      this.containers.push(newContainer);
    },
    changeFont() {
      const font = this.selectedFont;
      const canvasObject = this.canvas.getActiveObject();
      if (canvasObject.whitebirdData.type === 'StickyNote') {
        canvasObject.item(1).set('fontFamily', font);
        this.canvas.requestRenderAll();
      } else {
        // when font is loaded, use it.
        this.canvas.getActiveObject().set('fontFamily', font);
        this.canvas.requestRenderAll();
      }
      this.$nuxt.$emit(customEvents.canvasTools.sendCustomModified, canvasObject);
    },
    changeStyle() {
      const fontstyle = this.selectedStyle;
      const canvasObject = this.canvas.getActiveObject();
      if (canvasObject.whitebirdData.type === 'StickyNote') {
        canvasObject.item(1).set('fontStyle', fontstyle);
        this.canvas.requestRenderAll();
      } else {
        this.canvas.getActiveObject().set('fontStyle', fontstyle);
        this.canvas.requestRenderAll();
      }
      this.$nuxt.$emit(customEvents.canvasTools.sendCustomModified, canvasObject);
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
