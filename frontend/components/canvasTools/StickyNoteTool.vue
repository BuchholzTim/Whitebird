<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { mapState } from 'vuex';
import customEvents from '~/utils/customEvents';
import logger from '~/utils/logger';

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
    groupObject: null,
    textBox: null,
    textBoxChange: false,
  }),
  computed: {
    ...mapState({
      testObject: (state) => state.canvas.testObject,
    }),
  },
  mounted() {
    this.$nuxt.$on(customEvents.canvasTools.stickyNote, (payload) => {
      this.canvas.isDrawingMode = false;
      this.createStickyNote(payload);
    });

    this.canvas.on('mouse:down', (options) => {
      if (this.editingText === true) { this.leaveEditingMode(); }
    });

    /*
    "options.target === null" check if mouse outside the Canvas
    "null" means leave canvas e.g. "options.target === rect" means leaving a rectangle
    */
    this.canvas.on('mouse:out', (options) => {
      if (options.target === null) {
        if (this.editingText === true) { this.leaveEditingMode(); }
      }
    });
  },
  methods: {
    /*
    Exit Editing from the Textbox Object,
    */
    leaveEditingMode() {
      if (this.editingText === true && this.overText === false) {
        this.textBox.exitEditing();

        this.canvas.remove(this.textBox);
        this.groupObject.addWithUpdate(this.textBox);

        this.canvas.setActiveObject(this.groupObject);

        this.editingText = false;

        if (this.textBoxChange === true) {
          this.$nuxt.$emit(customEvents.canvasTools.sendCustomModified,
            this.groupObject);
        }
        this.$nuxt.$emit(
          customEvents.canvasTools.setRemoveObjectEventListener,
          true,
        );
        this.resetData();
        this.canvas.renderAll();
      }
    },

    /*
    reset the StickyNote Data to default
    */
    resetData() {
      this.groupObject = null;
      this.textBox = null;
      this.textBoxChange = false;
    },

    /*
    set/add the StickyNote Settings we need for the StickyNote
    @setControlVisible the control visibility (mt=mid_top, mr=mid_right,...) of false
    @leaveEditing = false (default Value) the Textbox (group.item(1)) setting will set to.
     */
    addStickyNoteSettings(group, leaveEditing = false) {
      const invisibleControls = ['mt', 'mr', 'ml', 'mb'];
      invisibleControls.forEach((side) => {
        group.setControlVisible(side, false);
      });

      group.on('mousedblclick', (options) => {
        this.$nuxt.$emit(
          customEvents.canvasTools.setRemoveObjectEventListener,
          false,
        );
        this.editingText = true;
        this.groupObject = group;

        // start

        this.textBox = group.item(1);
        this.textBox.left = group.left + (group.width / 2) + group.item(1).left;
        this.textBox.top = group.top + (group.height / 2) + group.item(1).top;
        group.remove(group.item(1));
        this.canvas.add(this.textBox).setActiveObject(this.textBox);
        this.textBox.enterEditing();

        // end
        this.canvas.renderAll();
      });
    },

    addTextBoxSettings(textBox) {
      textBox.on('mouseover', (options) => {
        this.overText = true;
      });
      textBox.on('mouseout', (options) => {
        this.overText = false;
      });
      textBox.on('changed', () => {
        this.textBoxChange = true;
        this.resizeRect(this.groupObject.item(0), this.textBox);
        this.textBox.width = null;
        this.canvas.renderAll();
      });
    },

    resizeRect(rect, textBox) {
      rect.width = textBox.width + 20;
      rect.height = textBox.height + 20;
      // When dirty set to `true`, object's cache will be rerendered next render call.
      rect.dirty = true;
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
        fontFamily: 'Arial',
        // selectable: true,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        whitebirdData: {
          id: v4(),
          tempObject: true,
        },
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
        whitebirdData: { id: v4() },
      });

      const group = new fabric.Group([rect, text], {
        whitebirdData: {
          id: v4(),
          type: 'StickyNote',
        },
      });

      this.addStickyNoteSettings(group);
      this.addTextBoxSettings(text);
      this.resetData();

      this.canvas.add(group).setActiveObject(group);
      this.canvas.renderAll();
    },
  },
};
</script>
