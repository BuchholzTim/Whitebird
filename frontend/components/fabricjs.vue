<template>
  <div>
    <canvas id="canvas" @mousemove="updateCoordinates"> </canvas>
    <button @click="rectangleTool">Rectangle</button>

      Coordinates: {{ x }} / {{ y }} <br />
  </div>
</template>

<script>
import { fabric } from 'fabric';

let width;
let height;

if (process.client) {
  width = window.innerWidth;
  height = window.innerHeight;
}
export default {

  data: () => ({
    srectangleTool: null,
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

    console.log(JSON.stringify(this.canvas));
  },

  methods: {
    rectangleTool(event) {
      const rect = new fabric.Rect({
        left: 0,
        top: 0,
        width: 150,
        height: 120,
        fill: 'red',
      });
      this.canvas.add(rect).setActiveObject(rect);
      this.canvas.renderAll();
      console.log(JSON.stringify(this.canvas));
    },
    updateCoordinates(event) {
    // pass event object, bound to mouse move with updat
      this.x = event.clientX;
      this.y = event.clientY;
    },

  },
};
</script>
