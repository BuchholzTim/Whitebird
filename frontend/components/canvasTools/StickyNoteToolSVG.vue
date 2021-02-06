<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { mapState } from 'vuex';
import customEvents from '~/utils/customEvents';
import logger from '~/utils/logger';
import YellowSVG from '~/assets/images/StickyNote01Yellow.svg';

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
      this.loadSVG(payload);
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

    this.$nuxt.$on(customEvents.canvasTools.stickyNoteEnliven, (payload) => {
      this.addStickyNoteSettings(payload);
      this.addTextBoxSettings(payload.item(1));
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
    addStickyNoteSettings(group) {
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

        this.textBox.scaleX *= group.scaleX;
        this.textBox.scaleY *= group.scaleY;

        this.textBox.left = group.left + (10 * this.textBox.scaleX);
        this.textBox.top = group.top + (10 * this.textBox.scaleY);

        group.remove(group.item(1));
        this.canvas.add(this.textBox).setActiveObject(this.textBox);
        this.textBox.enterEditing();

        // end
        this.canvas.renderAll();
      });
    },

    addTextBoxSettings(textBox, group) {
      textBox.on('mouseover', (options) => {
        this.overText = true;
      });
      textBox.on('mouseout', (options) => {
        this.overText = false;
      });
      textBox.on('changed', () => {
        this.textBoxChange = true;
        this.canvas.on('after:render', (options) => {
          if (options.ctx !== undefined) {
            const objectType = null;
            this.canvas.getActiveObjects().forEach((obj) => {
              console.log(obj.type);
            });
          }
          /* In Double Klick methode schreiben und aus changed rausholen weil...
          this.canvas.off("after:render") damit es nur während
          man den Text bearbeitet wird ausgeführt ... */
        });

        let lineNumber = 0;
        let maxLineTextWidth = 0;
        const maxLineTextHight = 0;

        this.textBox._textLines.forEach((line) => {
          console.log(this.textBox.getHeightOfLine(lineNumber));
          const LineTextWidth = this.textBox.getLineWidth(lineNumber);
          if (LineTextWidth > maxLineTextWidth) { maxLineTextWidth = LineTextWidth; }
          lineNumber += 1;
        });
        textBox.width = maxLineTextWidth;

        const maxfixedWidth = group.item(0).width - (20 * group.scaleX * group.item(0).scaleX);
        const maxfixedHeight = group.item(0).height - (20 * group.scaleY * group.item(0).scaleY);

        const maxfontSize = textBox.fontSize;

        // Fontsize automatically larger
        if (textBox.width > maxfixedWidth) {
          textBox.fontSize *= maxfixedWidth / (textBox.width + 1);
          textBox.width = maxfixedWidth;
        }
        // Fontsize automatically smaller
        if (textBox.width < maxfixedWidth) {
          textBox.fontSize *= maxfixedWidth / (textBox.width + 1);
          textBox.width = maxfixedWidth;
        }

        while (textBox.height > maxfixedHeight) {
          console.log('msdkfjaskdf');
          textBox.set({ fontSize: textBox.fontSize - 1 });
        }

        this.canvas.renderAll();
      });

      textBox.set({
        hasControls: false,
        // hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
      });
    },

    loadSVG(payload) {
      let SVG = null;
      fabric.loadSVGFromURL(YellowSVG, (objects, options) => {
        const obj = fabric.util.groupSVGElements(objects, options);
        obj.whitebirdData = {
          id: v4(),
          type: 'StickyNoteSVG',
        };
        SVG = obj;
        this.createStickyNote(payload, SVG);
      });
    },

    createStickyNote(payload, object) {
      const shadow = new fabric.Shadow({
        color: 'rgb(38, 50, 56)',
        // color: #363E41,
        blur: 6,
        // offsetX: 5,
        offsetY: 5,
      });

      const text = new fabric.Textbox('Text', {
        left: 100,
        top: 100,
        width: object.width - 20,
        fontSize: 166.6,
        lockScalingY: true,
        fill: 'rgb(0,0,0)',
        fontFamily: 'Arial',
        // selectable: true
        whitebirdData: {
          id: v4(),
          tempObject: true,
        },
      });

      if (payload.color === '#000000') {
        text.set({ fill: 'rgb(255,255,255)' });
      }

      object.set({
        left: text.left - 10,
        top: text.top - 10,
        // width: text.width + 20,
      });

      const group = new fabric.Group([object, text], {
        whitebirdData: {
          id: v4(),
          type: 'StickyNote',
        },
      });

      group.set({
        // hasControls: false,
        // hasBorders: false,
      });

      this.addStickyNoteSettings(group);
      this.addTextBoxSettings(text, group);
      this.resetData();

      this.canvas.add(group).setActiveObject(group);
      this.canvas.renderAll();
    },
  },
};
</script>
