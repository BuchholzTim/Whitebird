<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { mapState } from 'vuex';
import customEvents from '~/utils/customEvents';
import WhitebirdLogger from '~/utils/WhitebirdLogger';

import stickynoteBlack from '~/assets/images/stickynote/black.svg';
import stickynoteBlue from '~/assets/images/stickynote/blue.svg';
import stickynoteGreen from '~/assets/images/stickynote/green.svg';
import stickynoteRed from '~/assets/images/stickynote/red.svg';
import stickynoteYellow from '~/assets/images/stickynote/yellow.svg';

const logger = new WhitebirdLogger('StickyNote.vue');
export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      overText: false,
      editingText: false,
      groupObject: null,
      textBox: null,
      textBoxChange: false,
    };
  },
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

    this.canvas.on('mouse:down', () => {
      if (this.editingText === true) { this.leaveEditingMode(); }
    });

    /*
    "options.target === null" check if mouse outside the Canvas
    "null" means leave canvas e.g. "options.target === rect" means leaving a rectangle
    */
    // this.canvas.on('mouse:out', (options) => {
    //    if (options.target === null) {
    //      if (this.editingText === true) { this.leaveEditingMode(); }
    //    }
    //  });

    this.$nuxt.$on(customEvents.canvasTools.stickyNoteEnliven, (payload) => {
      this.addStickyNoteSettings(payload);
      this.addTextBoxSettings(payload.item(1), payload);
    });
    this.$nuxt.$on(customEvents.canvasTools.stickyNoteFontResize, (payload) => {
      if (payload.whitebirdData.type === 'StickyNoteTextBox') {
        this.FontResizeStickyNote(payload, this.groupObject);
      } else {
        this.FontResizeStickyNote(payload.item(1), payload);
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
        this.groupObject.set({
          selectable: true,
          evented: true,
        });

        this.$nuxt.$emit(customEvents.canvasTools.sendCustomModified,
          this.groupObject);

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
      const invisibleControls = ['mt', 'mr', 'ml', 'mb', 'mtr'];
      invisibleControls.forEach((side) => {
        group.setControlVisible(side, false);
      });

      group.on('mousedblclick', () => {
        group.set({
          selectable: false,
          evented: false,
        });
        this.$nuxt.$emit(customEvents.canvasTools.sendCustomModified, group);
        this.$nuxt.$emit(
          customEvents.canvasTools.setRemoveObjectEventListener,
          false,
        );
        this.editingText = true;
        this.groupObject = group;

        // declare the textBox Variables
        // ! The scaling must be multiplied by the scaling of the group.
        // ! If not, the text box has a different size.
        // the left and upper sides of the individual objects
        // are indicated relative to the group centre.
        this.textBox = group.item(1);
        this.textBox.scaleX *= group.scaleX;
        this.textBox.scaleY *= group.scaleY;
        this.textBox.left = group.left + (10 * this.textBox.scaleX);
        this.textBox.top = group.top + (10 * this.textBox.scaleY);

        group.remove(group.item(1));
        this.canvas.add(this.textBox).setActiveObject(this.textBox);
        this.textBox.enterEditing();

        this.canvas.renderAll();
      });
    },

    addTextBoxSettings(textBox, group) {
      textBox.on('mouseover', () => {
        this.overText = true;
      });
      textBox.on('mouseout', () => {
        this.overText = false;
      });
      textBox.on('changed', () => {
        this.textBoxChange = true;
        this.FontResizeStickyNote(textBox, group);
      });

      textBox.set({
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
      });
    },
    FontResizeStickyNote(textBox, group) {
      let lineNumber = 0;
      let maxLineTextWidth = 0;

      // Calculation of the maximum line length
      textBox._textLines.forEach(() => {
        const LineTextWidth = textBox.getLineWidth(lineNumber);
        if (LineTextWidth > maxLineTextWidth) { maxLineTextWidth = LineTextWidth; }
        lineNumber += 1;
      });
      textBox.width = maxLineTextWidth;

      // Automatic change of the FontSize
      const maxfixedWidth = group.item(0).width - 20;
      const maxfixedHeight = group.item(0).height - 20;
      const maxfontSize = group.item(0).height - 20;

      let newfontSize = textBox.fontSize;
      // if the text width is too long or too short
      newfontSize *= maxfixedWidth / (textBox.width + 1);
      if (newfontSize > maxfontSize) {
        newfontSize = maxfontSize;
        textBox.set({ fontSize: maxfontSize });
      } else {
        textBox.set({ fontSize: newfontSize });
      }
      textBox.width = maxfixedWidth;

      // if the text height is too long or too short
      while (textBox.height > maxfixedHeight) {
        const scale = textBox.height / maxfixedHeight;
        if (textBox.fontSize > maxfontSize) {
          textBox.fontSize = maxfontSize;
        }
        if (scale >= 4) {
          newfontSize -= scale;
        } else if (scale < 4 && scale >= 1) {
          newfontSize -= 4;
        } else {
          newfontSize -= 1;
        }

        textBox.set({ fontSize: newfontSize });
      }
      this.canvas.renderAll();
    },

    getStickyNote(color) {
      let stickynote = '';
      switch (String(color)) {
        case '#000000':
          stickynote = stickynoteBlack;
          break;
        case '#8A0000':
          stickynote = stickynoteRed;
          break;
        case '#FFD54F':
          stickynote = stickynoteYellow;
          break;
        case '#58CA68':
          stickynote = stickynoteGreen;
          break;
        case '#8CB8DE':
          stickynote = stickynoteBlue;
          break;
        default:
          logger.error('create Stickynote with undefined colour');
          stickynote = stickynoteYellow;
          break;
      }
      return stickynote;
    },

    createStickyNote(payload) {
      fabric.loadSVGFromURL(this.getStickyNote(payload.color), (objects, options) => {
        const SVGObject = fabric.util.groupSVGElements(objects, options);
        SVGObject.whitebirdData = {
          id: v4(),
          type: 'StickyNote',
        };

        const text = new fabric.Textbox('Text', {
          left: 100,
          top: 100,
          width: SVGObject.width - 20,
          fontSize: 166.6,
          lockScalingY: true,
          fill: 'rgb(0,0,0)',
          fontFamily: 'Arial',
          // selectable: true,
          whitebirdData: {
            id: v4(),
            tempObject: true,
            type: 'StickyNoteTextBox',
          },
        });

        if (payload.color === '#000000') {
          text.set({ fill: 'rgb(255,255,255)' });
        }

        SVGObject.set({
          left: text.left - 10,
          top: text.top - 10,
        // width: text.width + 20,
        });

        const group = new fabric.Group([SVGObject, text], {
          scaleX: 0.5,
          scaleY: 0.5,
          selectable: true,
          evented: true,
          whitebirdData: {
            id: v4(),
            type: 'StickyNote',
          },
        });

        this.addStickyNoteSettings(group);
        this.addTextBoxSettings(text, group);
        this.resetData();
        this.canvas.add(group).setActiveObject(group);
        this.canvas.renderAll();
      });
    },
  },
};
</script>
