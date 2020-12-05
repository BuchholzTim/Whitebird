<template>
  <div @mousemove="updateCoordinates">
    <canvas id="canvas" width="1200px" height="850px"> </canvas> <br />
    <button @click="rectangleTool">Rectangle</button>
    <button @click="text">Text</button>
    <button @click="changeDrawingMode">Drawing</button>
    <button @click="clear">Clear</button>
    <br />
    Coordinates: {{ x }} / {{ y }} <br />
  </div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { log } from 'util';

let width;
let height;
const canvas = null;

if (process.client) {
  width = window.innerWidth;
  height = window.innerHeight;
}
export default {
  data: () => ({
    drawingMode: false,
    points: {
      from: null,
      to: null,
    },
    x: 0,
    y: 0,
  }),
  mounted() {
    console.log('Component created!');
    this.canvas = new fabric.Canvas('canvas');
  },

  methods: {
    rectangleTool(event) {
      const rect = new fabric.Rect({
        left: width / 2,
        top: height / 2,
        width: 150,
        height: 120,
        fill: 'red',
      });
      this.canvas.add(rect).setActiveObject(rect);
      this.canvas.renderAll();
    },
    text(event) {
      const shadow = new fabric.Shadow({
        color: 'rgb(38, 50, 56)',
        blur: 6,
        // offsetX: 5,
        offsetY: 5,
      });

      const text = new fabric.Textbox('hello world', {
        left: 100,
        top: 100,
        lockScalingY: true,
        fill: 'rgb(255,255,255)',
        fontFamily: 'Arial',
        mtiID: v4(),
      });

      const rect = new fabric.Rect({
        left: 85,
        top: 85,
        width: text.width + 30,
        height: text.height + 30,
        fill: 'rgb(55, 71, 79)',
        shadow,
        mtiID: v4(),
      });
      this.canvas.add(rect);
      this.canvas.add(text);
      this.canvas.renderAll();
    },

    changeDrawingMode(event) {
      const obj = this.canvas.getObjects();
      console.log(obj);
      obj.forEach((el) => {
        // eslint-disable-next-line no-underscore-dangle
        console.log(el.mtiID);
      });
      console.log((this.drawingMode = !this.drawingMode));
      this.canvas.isDrawingMode = this.drawingMode;
    },

    updateCoordinates(event) {
      // pass event object, bound to mouse move with updat
      this.x = event.clientX;
      this.y = event.clientY;
    },

    clear(event) {
      this.canvas.clear();
    },
  },
};
</script>

<style>
#canvas {
  border: 1px solid;
}
</style>
