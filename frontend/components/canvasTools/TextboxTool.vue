<template>
  <div></div>
</template>

<script>
import { v4 } from 'uuid'
import { mapState } from 'vuex'
import customEvents from '~/utils/customEvents'

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
    }
  },
  computed: {
    ...mapState({
      testObject: (state) => state.canvas.testObject,
    }),
  },
  mounted() {
    this.$nuxt.$on(customEvents.canvasTools.textbox, (payload) => {
      this.canvas.isDrawingMode = false
      this.createTextBox(payload)
    })

    this.canvas.on('mouse:down', () => {
      if (this.editingText === true) { this.leaveEditingMode() }
    })

    // this.$nuxt.$on(customEvents.canvasTools.stickyNoteFontResize, (payload) => {
    //   if (payload.whitebirdData.type === 'StickyNoteTextBox') {
    //     this.FontResizeStickyNote(payload, this.groupObject)
    //   } else {
    //     this.FontResizeStickyNote(payload.item(1), payload)
    //   }
    // })
  },
  methods: {
    /* Exit Editing from the Textbox Object. */
    leaveEditingMode() {
      if (this.editingText === true && this.overText === false) {
        this.textBox.exitEditing()

        this.canvas.remove(this.textBox)

        this.groupObject.addWithUpdate(this.textBox)

        this.canvas.setActiveObject(this.groupObject)

        this.editingText = false
        this.groupObject.set({
          selectable: true,
          evented: true,
        })

        this.$nuxt.$emit(customEvents.canvasTools.sendCustomModified,
          this.groupObject)

        this.$nuxt.$emit(
          customEvents.canvasTools.setRemoveObjectEventListener,
          true,
        )
        this.resetData()
        this.canvas.renderAll()
      }
    },
    /* Reset the text box data to default. */
    resetData() {
      this.groupObject = null
      this.textBox = null
      this.textBoxChange = false
    },
    /* set/add the text box settings we need.
    @setControlVisible the control visibility (mt=mid_top, mr=mid_right,...) of false
    @leaveEditing = false (default Value) the Textbox (group.item(1)) setting will set to. */
    addGroupSettings(group) {
      const invisibleControls = ['mt', 'mr', 'ml', 'mb', 'mtr']
      invisibleControls.forEach((side) => {
        group.setControlVisible(side, false)
      })

      group.on('mousedblclick', () => {
        group.set({
          selectable: false,
          evented: false,
        })
        this.$nuxt.$emit(customEvents.canvasTools.sendCustomModified, group)
        this.$nuxt.$emit(
          customEvents.canvasTools.setRemoveObjectEventListener,
          false,
        )
        this.editingText = true
        this.groupObject = group

        // declare the textBox Variables
        // ! The scaling must be multiplied by the scaling of the group.
        // ! If not, the text box has a different size.
        // the left and upper sides of the individual objects
        // are indicated relative to the group centre.
        this.textBox = group.item(1)
        this.textBox.scaleX *= group.scaleX
        this.textBox.scaleY *= group.scaleY
        this.textBox.left = group.left + (10 * this.textBox.scaleX)
        this.textBox.top = group.top + (10 * this.textBox.scaleY)

        group.remove(group.item(1))
        this.canvas.add(this.textBox).setActiveObject(this.textBox)
        this.textBox.enterEditing()

        this.canvas.renderAll()
      })
    },
    addTextBoxSettings(textBox, group) {
      textBox.on('mouseover', () => {
        this.overText = true
      })
      textBox.on('mouseout', () => {
        this.overText = false
      })
      textBox.on('changed', () => {
        this.textBoxChange = true
        // this.FontResizeStickyNote(textBox, group)
      })

      textBox.set({
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
      })
    },
    FontResizeStickyNote(textBox, group) {
      let lineNumber = 0
      let maxLineTextWidth = 0

      // Calculation of the maximum line length
      textBox._textLines.forEach(() => {
        const LineTextWidth = textBox.getLineWidth(lineNumber)
        if (LineTextWidth > maxLineTextWidth) { maxLineTextWidth = LineTextWidth }
        lineNumber += 1
      })
      textBox.width = maxLineTextWidth

      // Automatic change of the FontSize
      const maxfixedWidth = group.item(0).width - 20
      const maxfixedHeight = group.item(0).height - 20
      const maxfontSize = group.item(0).height - 20

      let newfontSize = textBox.fontSize
      // if the text width is too long or too short
      newfontSize *= maxfixedWidth / (textBox.width + 1)
      if (newfontSize > maxfontSize) {
        newfontSize = maxfontSize
        textBox.set({ fontSize: maxfontSize })
      } else {
        textBox.set({ fontSize: newfontSize })
      }
      textBox.width = maxfixedWidth

      // if the text height is too long or too short
      while (textBox.height > maxfixedHeight) {
        const scale = textBox.height / maxfixedHeight
        if (textBox.fontSize > maxfontSize) {
          textBox.fontSize = maxfontSize
        }
        if (scale >= 4) {
          newfontSize -= scale
        } else if (scale < 4 && scale >= 1) {
          newfontSize -= 4
        } else {
          newfontSize -= 1
        }

        textBox.set({ fontSize: newfontSize })
      }
      this.canvas.renderAll()
    },
    createTextBox() {
      // Outline shape
      const rectangle = new fabric.Rect({
        width: 0,
        height: 0,
        whitebirdData: { 
          id: v4(),
          type: 'textboxGroup',
        },
      })

      const tbox = new fabric.Textbox('hello world', {
        left: 100,
        top: 100,
        width: 150,
        fill: 'rgb(0, 0, 0)',
        fontFamily: 'Arial',
        whitebirdData: {
          id: v4(), 
          tempObject: true,
          type: 'textbox',
        },
      })
      // const invisibleControls = ['mt', 'mr', 'ml', 'mb']
      // invisibleControls.forEach((side) => {
      //   tbox.setControlVisible(side, false)
      // })

      rectangle.set({
        left: tbox.left - 10,
        top: tbox.top - 10,
      })

      const group = new fabric.Group([rectangle, tbox], {
        scaleX: 2,
        scaleY: 2,
        selectable: true,
        evented: true,
        whitebirdData: {
          id: v4(),
          type: 'textboxGroup',
        },
      })

      this.addGroupSettings(group)
      this.addTextBoxSettings(tbox, group)
      this.resetData()
      this.canvas.add(group).setActiveObject(group)
      this.canvas.renderAll()
    },
  },
}
</script>
