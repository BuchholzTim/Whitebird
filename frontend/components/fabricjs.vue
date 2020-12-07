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

const groupItems = [];
let editingText = false;
let overText = false;
let overRect = false;

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
    this.canvas.on('mouse:dblclick', (options) => {
      console.log('Canvas mouse:dblclick');
    });

    this.canvas.on('mouse:down', (options) => {
      if (editingText === true && overText === false && overRect === false) {
        groupItems[1].exitEditing();
        const angleGroup = groupItems[0].angle;

        groupItems[0].angle = 0;
        groupItems[1].angle = 0;

        groupItems[0].left = groupItems[1].left - 15;
        groupItems[0].top = groupItems[1].top - 15;
        groupItems[0].width = groupItems[1].width + 30;
        groupItems[0].height = groupItems[1].height + 30;
        groupItems[0].dirty = true;
        const group = new fabric.Group([groupItems[0], groupItems[1]], {
          angle: 0,
        });

        const invisibleControls = ['mt', 'mr', 'ml', 'mb'];

        invisibleControls.forEach((side) => {
          group.setControlVisible(side, false);
        });

        this.canvas.add(group);
        this.groupAddonMouse(group);
        editingText = false;
        this.canvas.requestRenderAll();
      }
    });
  },

  methods: {

    groupAddonMouse(group) {
      group.on('mousedblclick', (options) => {
        console.log('Group DB Event');
        groupItems[0] = group.item(0);
        groupItems[1] = group.item(1);

        this.canvas.getActiveObject().toActiveSelection();
        this.canvas.setActiveObject(groupItems[1]);
        editingText = true;
        groupItems[1].enterEditing();
        this.canvas.requestRenderAll();
      });
    },

    rectangleTool(event) {
      const rect = new fabric.Rect({
        left: width / 2,
        top: height / 2,
        width: 150,
        height: 120,
        fill: 'red',
      });
      rect.on('mousedown', (options) => {
        console.log('rect event');
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
        fill: 'rgb(0,0,0)',
        // fill: 'rgb(255,255,255)',
        fontFamily: 'Arial',
        mtiID: v4(),
      });
      text.on('mouseover', (options) => {
        overText = true;
      });
      text.on('mouseout', (options) => {
        overText = false;
      });

      const rect = new fabric.Rect({
        left: text.left - 15,
        top: text.top - 15,
        width: text.width + 30,
        height: text.height + 30,
        fill: 'rgb(55, 71, 79)',
        shadow,
        mtiID: v4(),
      });
      rect.on('mouseover', (options) => {
        overRect = true;
      });
      rect.on('mouseout', (options) => {
        overRect = false;
      });

      const group = new fabric.Group([rect, text], {
      });
      const invisibleControls = ['mt', 'mr', 'ml', 'mb'];

      invisibleControls.forEach((side) => {
        group.setControlVisible(side, false);
      });

      this.groupAddonMouse(group);

      this.canvas.add(group);
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
