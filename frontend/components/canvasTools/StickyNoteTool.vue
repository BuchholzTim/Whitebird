<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import customEvents from '~/utils/customEvents';

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
    this.$nuxt.$on(customEvents.canvasTools.stickyNote, (payload) => {
      console.log(payload);
      this.canvas.isDrawingMode = false;
      this.createStickyNote(payload);
    });

    this.canvas.on('mouse:down', (options) => {
      this.leaveEditingMode();
    });

    /*
    "options.target === null" check if mouse outside the Canvas
    "null" means leave canvas e.g. "options.target === rect" means leaving a rectangle
    */
    this.canvas.on('mouse:out', (options) => {
      if (options.target === null) {
        this.leaveEditingMode();
      }
    });
  },
  methods: {
    /*
    Exit Editing from the Textbox Object,
    */
    leaveEditingMode() {
      if (this.editingText === true && this.overText === false) {
        this.groupItems[1].exitEditing();
        this.resizeRect();
        this.groupItems.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          item.angle = 0;
          this.canvas.remove(item);
        });

        const group = new fabric.Group([this.groupItems[0]], {
          angle: this.currentAngle,
          mtiID: this.mtiIDGroup,
        });

        this.groupItems[1].top = this.groupItems[0].top + 10 * this.groupItems[0].scaleX;
        this.groupItems[1].left = this.groupItems[0].left + 10 * this.groupItems[0].scaleY;

        group.add(this.groupItems[1]);

        this.resetData();
        this.addGroupSettings(group);
        this.editingText = false;

        this.canvas.add(group);

        this.canvas.requestRenderAll();
        this.$nuxt.$emit(
          customEvents.canvasTools.setRemoveObjectEventListener,
          true,
        );
      }
    },

    /*
    reset the StickyNote Data to default
    */
    resetData() {
      this.groupItems = [];
      this.currentAngle = 0;
      this.mtiIDGroup = null;
    },

    /*
    set/add the Group Settings we need for the StickyNote
    @setControlVisible the control visibility (mt=mid_top, mr=mid_right,...) of false
     */
    addGroupSettings(group) {
      const invisibleControls = ['mt', 'mr', 'ml', 'mb'];
      invisibleControls.forEach((side) => {
        group.setControlVisible(side, false);
      });

      group.on('mousedblclick', (options) => {
        this.$nuxt.$emit(
          customEvents.canvasTools.setRemoveObjectEventListener,
          false,
        );
        this.groupItems[0] = group.item(0);
        this.groupItems[1] = group.item(1);
        this.mtiIDGroup = group.mtiID;
        this.currentAngle = group.angle;
        this.canvas.getActiveObject().toActiveSelection();
        this.canvas.setActiveObject(this.groupItems[1]);
        this.editingText = true;
        this.groupItems[1].enterEditing();
        this.canvas.requestRenderAll();
      });
    },
    resizeRect() {
      this.groupItems[0].width = this.groupItems[1].width + 20;
      this.groupItems[0].height = this.groupItems[1].height + 20;
      // When dirty set to `true`, object's cache will be rerendered next render call.
      this.groupItems[0].dirty = true;
    },
    createStickyNote(payload) {
      const shadow = new fabric.Shadow({
        color: 'rgb(38, 50, 56)',
        // color: #363E41,
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
        editingBorderColor: payload.color,
        selectable: false,
        mtiID: v4(),
      });

      if (payload.color === '#000000') {
        text.set({ fill: 'rgb(255,255,255)' });
      }

      const rect = new fabric.Rect({
        left: text.left - 10,
        top: text.top - 10,
        width: text.width + 20,
        height: text.height + 20,
        // fill: 'rgb(55, 71, 79)',
        fill: payload.color,
        selectable: false,
        shadow,
        mtiID: v4(),
      });

      text.on('mouseover', (options) => {
        this.overText = true;
      });
      text.on('mouseout', (options) => {
        this.overText = false;
      });

      text.on('changed', () => {
        this.resizeRect();
        this.groupItems[1].width = null;
        this.canvas.requestRenderAll();
      });

      const group = new fabric.Group([rect, text], {
        mtiID: v4(),
      });

      this.addGroupSettings(group);
      this.resetData();

      this.canvas.add(group).setActiveObject(group);
      this.canvas.renderAll();
    },
  },
};
</script>
