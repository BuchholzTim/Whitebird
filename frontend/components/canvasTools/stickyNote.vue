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
      this.createStickyNote();
    });

    this.canvas.on('mouse:down', (options) => {
      this.leaveEditingMode();
    });

    this.canvas.on('mouse:out', (options) => {
      if (options.target === null) {
        this.leaveEditingMode();
      }
    });
  },
  methods: {
    leaveEditingMode() {
      if (
        this.editingText === true &&
        this.overText === false
      ) {
        this.groupItems[1].exitEditing();

        this.resizeRect();
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
        this.editingText = false;

        this.canvas.add(group).setActiveObject(group);
        this.canvas.requestRenderAll();
      }
    },

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
        this.canvas.getActiveObject().toActiveSelection();
        this.canvas.setActiveObject(this.groupItems[1]);
        this.editingText = true;
        this.groupItems[1].enterEditing();
        this.canvas.requestRenderAll();
      });
    },
    resizeRect() {
      // this.groupItems[1].left = this.groupItems[0].left + 10;
      // this.groupItems[1].top = this.groupItems[0].top + 10;
      this.groupItems[0].width = this.groupItems[1].width + 20;
      this.groupItems[0].height = this.groupItems[1].height + 20;
      this.groupItems[0].dirty = true;
    },
    createStickyNote(event) {
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
        // editingBorderColor: 'rgb(55, 71, 79)',
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
        left: text.left - 10,
        top: text.top - 10,
        width: text.width + 20,
        height: text.height + 20,
        fill: 'rgb(55, 71, 79)',
        selectable: false,
        shadow,
        mtiID: v4(),
      });

      text.on('changed', () => {
        this.resizeRect();
        this.groupItems[1].width = null;
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
