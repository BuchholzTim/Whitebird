<template>
  <div class="whiteboard--menu">
    <!-- Toolbar Top Left with board name and export, share button -->
    <div class="toolbar--box--top-left">
      <!-- Logo box, shows spinner when loading, logo_box is--loading, loader is--animated -->
      <div class="logo--box">
        <img src="../../assets/images/identity.png" />
      </div>
      <div class="toolbar toolbar--big flex mr--1">
        <div class="toolbar--board toolbar--board--item flex">
          <!-- Readonly name -->
          <div style="display: flex">
            <input readonly value="MTI Whiteboard" class="toolbar--board--name" />
          </div>

          <!-- Dropdown button -->
          <div
            id="board-menu-button"
            class="toolbar--board--drop flex--middle"
            @click="toggleWhiteboardActions"
          >
            <i class="fas fa-caret-down"></i>
          </div>
          <div
            v-if="isWhiteboardActionsOpened"
            id="board-menu"
            class="dropdown dropdown-board-menu dropdown--toolbar fadeInUp"
          >
            <ul class="dropdown--menu">
              <li class="dropdown--menu--item">
                <a id="board-save" href="#" class="dropdown--menu--link"
                  >Save whiteboard</a
                >
              </li>
              <li class="dropdown--menu--item">
                <a id="board-rename" href="#" class="dropdown--menu--link"
                  >Rename whiteboard</a
                >
              </li>
              <li class="dropdown--menu--item">
                <a id="board-create-new" href="#" class="dropdown--menu--link"
                  >Create new whiteboard</a
                >
              </li>
              <li class="dropdown--menu--item">
                <a id="board-delete-w" href="#" class="dropdown--menu--link"
                  >Delete whiteboard</a
                >
              </li>
            </ul>
          </div>

          <!-- Export button -->
          <div
            id="export-menu-buton"
            class="toolbar--board toolbar--board--pdf flex--middle"
            @click="toggleExportDropdown"
          >
            <i class="fas fa-download toolbar--button--icon"></i>
            <div>Export whiteboard</div>

            <!-- Export menu -->
            <div
              v-if="isExportActionsOpened"
              id="export-menu"
              class="dropdown dropdown-export dropdown--toolbar fadeInUp"
            >
              <ul class="dropdown--menu">
                <li class="dropdown--menu--item">
                  <a
                    id="export-pdf"
                    href="#"
                    class="dropdown--menu--link"
                    @click="exportWhiteboardAsPDF"
                    >Export as PDF</a
                  >
                </li>
                <li class="dropdown--menu--item">
                  <a id="export-image" href="#" class="dropdown--menu--link"
                    >Export as image</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Colloboration button -->
      <div
        id="colloboration-button"
        class="toolbar--button toolbar--button--colored toolbar--big"
        @click="getInviteLink"
      >
        <i class="fas fa-user-plus toolbar--button--icon"></i>
        <span>Invite</span>
      </div>
      <ShareWhiteboardModal />
    </div>

    <!-- Toolbar middle Left with primary actions -->
    <div class="toolbar-box-middle-left">
      <div class="toolbar toolbar--vertical">
        <ul class="tools--menu">
          <!-- Pencil -->
          <li id="toolbar-item-select" class="tools--item">
            <div class="tools--item--button" @click="togglePencilToolbox">
              <i class="fas fa-pencil-alt"></i>
            </div>

            <!-- Slider to choose pencil size -->
            <div v-if="isPencilToolboxOpened" class="toolbox fadeInLeft">
              <ul class="tools--menu tools--menu--inline">
                <div class="tools--slider">
                  <p class="paragraph-pen-size">Pencil size</p>
                  <div class="tools--slider-wrapper flex--middle">
                    <div class="tools--slider-value">{{ sliderValue }}</div>
                    <div class="tools--slider-slide">
                      <div class="slider--bg">
                        <Slider
                          v-model="sliderValue"
                          style="margin-top: 0 !important"
                          min="0"
                          max="7"
                          step="0.5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </li>

          <!-- Eraser -->
          <li id="toolbar-item-eraser" class="tools--item">
            <div class="tools--item--button">
              <i class="fas fa-eraser"></i>
            </div>
          </li>

          <!-- Color palette -->
          <li id="toolbar-item-color_palette" class="tools--item">
            <!-- the button -->
            <div
              class="tools--item--button btn-color-palette"
              @click="toggleColorToolbox"
            >
              <i class="fas fa-palette"></i>
              <!-- color picked indicator -->
              <div :style="{ background: colorPicked }" class="color--picked"></div>
            </div>
            <div
              v-if="isColorToolBoxOpened"
              class="toolbox fadeInLeft"
              style="min-width: 300px"
            >
              <colorPalette :colors="colors" />
              <div class="toolbox--seperator" />
              <div class="action--wrapper">
                <span
                  v-if="!colorPickerSelected"
                  @click="colorPickerSelected = !colorPickerSelected"
                >
                  <i class="fas fa-tint"></i>
                </span>
                <span
                  v-if="colorPickerSelected"
                  @click="colorPickerSelected = !colorPickerSelected"
                >
                  <i class="fas fa-tint-slash"></i>
                </span>
                <span class="tools--center" @click="updateColorArr(colorAdded)">
                  <i class="fas fa-plus"></i>
                </span>
              </div>
              <ul
                class="tools--menu tools--menu--inlinefloat wrap--8 tools--menu--colors"
              >
                <li v-for="(item, key) in colorPickedArr" :key="key">
                  <div class="tools--item--button" @click="colorPicked = item">
                    <div
                      class="predefined--color"
                      :style="{ background: item }"
                    ></div>
                  </div>
                </li>
              </ul>
              <div class="color-picker-wrapper">
                <ColorPicker
                  v-if="colorPickerSelected"
                  :color="colorAdded"
                  :visible-formats="['hex', 'hsl']"
                  @color-change="updateColor"
                />
              </div>
            </div>
            <!-- Color toolbox -->
          </li>

          <!-- Shape -->
          <li id="toolbar-item-shapes" class="tools--item">
            <div class="tools--item--button" @click="toggleShapeToolbox">
              <span>
                <i :class="shapeIsSelected"></i>
              </span>
            </div>
            <!-- Shapes -->
            <div v-if="isShapeToolBoxOpened" class="toolbox fadeInLeft">
              <ul class="tools--menu tools--menu--inline">
                <!-- Rectangle -->
                <li
                  id="tools-rectangle"
                  class="tools--item mg-0"
                  @click="toggleRectangle"
                >
                  <div class="tools--item--button">
                    <i class="far fa-square"></i>
                  </div>
                </li>
                <!-- Rectangle pre filled -->
                <li
                  id="tools-rectangle-fl"
                  class="tools--item mg-0"
                  @click="toggleRectangleFilled"
                >
                  <div class="tools--item--button">
                    <i class="fas fa-square"></i>
                  </div>
                </li>
                <!-- Circle -->
                <li id="tools-circle" class="tools--item mg-0" @click="toggleCircle">
                  <div class="tools--item--button">
                    <i class="far fa-circle"></i>
                  </div>
                </li>
                <!-- Circle filled-->
                <li
                  id="tools-circle-fl"
                  class="tools--item mg-0"
                  @click="toggleCircleFilled"
                >
                  <div class="tools--item--button">
                    <i class="fas fa-circle"></i>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <!-- Text -->
          <li id="toolbar-item-text" class="tools--item">
            <div class="tools--item--button">
              <i class="fas fa-font"></i>
            </div>
          </li>

          <li id="toolbar-item-text" class="tools--item">
            <div class="tools--item--button" @click="toggleStickyNotes">
              <i class="fas fa-sticky-note"></i>
            </div>
          </li>

          <!-- Redo -->
          <li id="toolbar-item-redo" class="tools--item">
            <div class="tools--item--button">
              <i class="fas fa-undo"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Toolbar top right with home, user, login-->
    <div class="toolbar-box-top-right">
      <div class="user--information">
        <!--  Home button -->
        <a id="home-button" href="/" class="toolbar--button mr--1">
          <i class="fas fa-home"></i>
        </a>
        <!-- Log in/Register button-->
        <div id="login-register-button" class="toolbar--button mr--1">
          Register or Log in
        </div>
        <!-- User Information/Logout -->
        <div id="account-button" class="toolbar--button" @click="logoutDropdown">
          <i
            class="far fa-user toolbar--button--icon toolbar--button--profile-icon avatar-thumb"
          ></i>
          <div>Hi, {{ name }}</div>
          <i
            class="fas fa-caret-down toolbar--button--icon toolbar--board--user ml--1 is--last"
          ></i>
          <!-- Reverse class to add is--visible when user pesses drop down icon -->
          <div
            v-if="isLogoutDropdownOpened"
            class="dropdown dropdown--toolbar dropdown--user is--reverse fadeInUp"
          >
            <ul class="dropdown--menu">
              <li class="dropdown--menu--item">
                <a href="/" class="dropdown--menu--link">Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'vue-custom-range-slider';
import 'vue-custom-range-slider/dist/vue-custom-range-slider.css';
import { ColorPicker } from 'vue-accessible-color-picker';
import ColorPalette from '../ColorPicker.vue';
import ShareWhiteboardModal from '../models/ShareWhiteboard.vue';
import * as modalHelper from '../_helpers/modalHelper.js';
import colorPalette from '../_helpers/colorPalette.js';
import customEvents from '~/utils/customEvents';

export default {
  components: {
    ShareWhiteboardModal,
    Slider,
    colorPalette: ColorPalette,
    ColorPicker,
  },
  data() {
    return {
      name: 'Armin',
      colors: colorPalette,
      isColorToolBoxOpened: false,
      isPencilToolboxOpened: false,
      isShapeToolBoxOpened: false,
      isWhiteboardActionsOpened: false,
      isExportActionsOpened: false,
      isLogoutDropdownOpened: false,
      colorPickerSelected: false,
      sliderValue: '0',
      colorPicked: 'black',
      shapeIsSelected: 'fas fa-shapes',
      colorAdded: '#f80b',
      colorPickedArr: [],
    };
  },
  created() {
    this.$nuxt.$on('colorChanged', (color) => {
      this.colorPicked = color;
    });
  },
  methods: {
    getInviteLink() {
      modalHelper.showInviteModal();
    },
    togglePencilToolbox() {
      this.$nuxt.$emit(customEvents.canvasTools.drawing);
      this.isPencilToolboxOpened = !this.isPencilToolboxOpened;
      this.isShapeToolBoxOpened = false;
      this.isColorToolBoxOpened = false;
      this.isWhiteboardActionsOpened = false;
      this.isLogoutDropdownOpened = false;
    },
    toggleShapeToolbox() {
      this.isShapeToolBoxOpened = !this.isShapeToolBoxOpened;
      this.isPencilToolboxOpened = false;
      this.isColorToolBoxOpened = false;
      this.isWhiteboardActionsOpened = false;
      this.isLogoutDropdownOpened = false;
    },
    toggleColorToolbox() {
      this.isColorToolBoxOpened = !this.isColorToolBoxOpened;
      this.isPencilToolboxOpened = false;
      this.isShapeToolBoxOpened = false;
      this.isWhiteboardActionsOpened = false;
      this.isLogoutDropdownOpened = false;
    },
    toggleWhiteboardActions() {
      this.isWhiteboardActionsOpened = !this.isWhiteboardActionsOpened;
      this.isPencilToolboxOpened = false;
      this.isShapeToolBoxOpened = false;
      this.isExportActionsOpened = false;
      this.isLogoutDropdownOpened = false;
    },
    toggleExportDropdown() {
      this.isExportActionsOpened = !this.isExportActionsOpened;
      this.isPencilToolboxOpened = false;
      this.isShapeToolBoxOpened = false;
      this.isWhiteboardActionsOpened = false;
      this.isLogoutDropdownOpened = false;
    },
    logoutDropdown() {
      this.isLogoutDropdownOpened = !this.isLogoutDropdownOpened;
      this.isPencilToolboxOpened = false;
      this.isShapeToolBoxOpened = false;
      this.isWhiteboardActionsOpened = false;
    },
    exportWhiteboardAsPDF() {
      console.log('export pdf');
    },
    toggleRectangle() {
      console.log('rectangle');
      this.shapeIsSelected = 'far fa-square';
      this.$nuxt.$emit(customEvents.canvasTools.rectangle, {});
    },
    toggleRectangleFilled() {
      console.log('rectangle filled');
      this.shapeIsSelected = 'fas fa-square';
      this.$nuxt.$emit(customEvents.canvasTools.rectangle, {
        fill: this.colorPicked,
      });
    },
    toggleCircle() {
      console.log('circle');
      this.shapeIsSelected = 'far fa-circle';
    },
    toggleCircleFilled() {
      console.log('circle filled');
      this.shapeIsSelected = 'fas fa-circle';
    },
    toggleStickyNotes() {
      this.$nuxt.$emit(customEvents.canvasTools.stickyNote);
      console.log('sticky added');
    },
    updateColor(eventData) {
      console.log(eventData);
      this.colorAdded = eventData.colors.hex;
    },
    updateColorArr(color) {
      this.colorPickedArr.push(color);
    },
  },
};
</script>

<style scoped>
@import '~assets/scss/_whiteboard.scss';
</style>
