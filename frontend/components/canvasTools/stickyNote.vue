<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    overText: false,
    editingText: false,
    groupItems: [],
    currentAngle: 0,
    mtiIDGroup: null,
  }),
  mounted() {
    this.$nuxt.$on('stickyNoteTool', (payload) => {
      this.canvas.isDrawingMode = false;
      this.text();
    });

    this.canvas.on('mouse:down', (options) => {
      if (
        this.editingText === true &&
        this.overText === false
      ) {
        this.groupItems[1].exitEditing();

        this.groupItems[0].left = this.groupItems[1].left - 15;
        this.groupItems[0].top = this.groupItems[1].top - 15;
        this.groupItems[0].width = this.groupItems[1].width + 30;
        this.groupItems[0].height = this.groupItems[1].height + 30;
        this.groupItems[0].dirty = true;
        this.groupItems.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.angle = 0;
        });
        const group = new fabric.Group([this.groupItems[0], this.groupItems[1]], {
          angle: this.currentAngle,
          mtiID: this.mtiIDGroup,
        });

        this.resetData();
        this.addGroupSettings(group);
        console.log(group.mtiID);
        this.editingText = false;

        this.canvas.add(group);
        this.canvas.requestRenderAll();
      }
    });
  },
  methods: {

    resetData() {
      this.groupItems = [];
      this.currentAngle = 0;
      this.mtiIDoldGroup = null;
    },
    addGroupSettings(group) {
      const invisibleControls = ['mt', 'mr', 'ml', 'mb'];

      invisibleControls.forEach((side) => {
        group.setControlVisible(side, false);
      });
      group.on('mousedblclick', (options) => {
        console.log('Group DB Event');
        this.groupItems[0] = group.item(0);
        this.groupItems[1] = group.item(1);
        this.currentAngle = group.angle;
        this.mtiIDGroup = group.mtiID;
        console.log(group.mtiID);
        this.canvas.getActiveObject().toActiveSelection();
        this.canvas.setActiveObject(this.groupItems[1]);
        this.editingText = true;
        this.groupItems[1].enterEditing();
        this.canvas.requestRenderAll();
      });
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
        editingBorderColor: 'rgb(55, 71, 79)',
        selectable: false,
        mtiID: v4(),
      });
      text.on('mouseover', (options) => {
        this.overText = true;
      });
      text.on('mouseout', (options) => {
        this.overText = false;
      });

      const rect = new fabric.Rect({
        left: text.left - 15,
        top: text.top - 15,
        width: text.width + 30,
        height: text.height + 30,
        fill: 'rgb(55, 71, 79)',
        selectable: false,
        shadow,
        mtiID: v4(),
      });

      text.on('changed', () => {
        console.log('Event changed Triggered');
        // eslint-disable-next-line no-underscore-dangle
        this.groupItems[0].left = this.groupItems[1].left - 15;
        this.groupItems[0].top = this.groupItems[1].top - 15;
        this.groupItems[0].width = this.groupItems[1].width + 30;
        this.groupItems[0].height = this.groupItems[1].height + 30;
        this.groupItems[0].dirty = true;
        text.width = null;
        this.canvas.requestRenderAll();
      });

      const group = new fabric.Group([rect, text], {
        mtiID: v4(),
      });

      this.resetData();
      this.addGroupSettings(group);

      this.canvas.add(group);
      this.canvas.renderAll();
    },
  },
};
</script>
