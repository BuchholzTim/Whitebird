<template>
  <div class="whiteboard--menu">
    <!-- Toolbar Top Left with board name and export, share button -->
    <div class="toolbar--box--top-left">
      <!-- Logo box, shows spinner when loading, logo_box is--loading, loader is--animated -->
      <div class="logo--box"></div>
      <div class="toolbar toolbar--big flex mr--1">
        <div class="toolbar--board toolbar--board--item flex">
          <!-- Readonly name -->
          <div style="display: flex">
            <input readonly value="MTI Whiteboard" class="toolbar--board--name" />
          </div>

          <!-- Dropdown button -->
          <div id="board-menu-button" class="toolbar--board--drop flex--middle">
            <i class="fas fa-caret-down"></i>
          </div>
          <div
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
          >
            <i class="fas fa-download toolbar--button--icon"></i>
            <div>Export whiteboard</div>

            <!-- Export menu -->
            <div
              id="export-menu"
              class="dropdown dropdown-export dropdown--toolbar fadeInUp"
            >
              <ul class="dropdown--menu">
                <li class="dropdown--menu--item">
                  <a id="export-pdf" href="#" class="dropdown--menu--link"
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
      >
        <i class="fas fa-user-plus toolbar--button--icon"></i>
        <span>Invite</span>
      </div>
    </div>

    <!-- Toolbar middle Left with primary actions -->
    <div class="toolbar-box-middle-left">
      <div class="toolbar toolbar--vertical">
        <ul class="tools--menu">
          <!-- Pencil -->
          <li id="toolbar-item-select" class="tools--item">
            <div class="tools--item--button">
              <i class="fas fa-pencil-alt"></i>
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
            <div class="tools--item--button btn-color-palette">
              <i class="fas fa-palette"></i>
            </div>
            <!-- the color palette to choose from some colors if is--visible flag is set -->
            <div class="toolbox fadeInLeft">
              <ul class="tools--menu tools--menu--inline tools--menu--colors">
                <!-- black -->
                <li id="palette-color-0" class="tools--item">
                  <div class="tools--item--button">
                    <div
                      class="predefined--color"
                      style="background-color: #000000"
                    ></div>
                  </div>
                </li>
                <!-- red -->
                <li id="palette-color-1" class="tools--item">
                  <div class="tools--item--button">
                    <div
                      class="predefined--color"
                      style="background-color: red"
                    ></div>
                  </div>
                </li>
                <!-- green -->
                <li id="palette-color-2" class="tools--item">
                  <div class="tools--item--button">
                    <div
                      class="predefined--color"
                      style="background-color: green"
                    ></div>
                  </div>
                </li>
                <!-- blue -->
                <li id="palette-color-3" class="tools--item">
                  <div class="tools--item--button">
                    <div
                      class="predefined--color"
                      style="background-color: blue"
                    ></div>
                  </div>
                </li>
                <!-- yellow -->
                <li id="palette-color-3" class="tools--item">
                  <div class="tools--item--button">
                    <div
                      class="predefined--color"
                      style="background-color: yellow"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </li>

          <!-- Shape -->
          <li id="toolbar-item-shapes" class="tools--item">
            <div class="tools--item--button">
              <i class="fas fa-shapes"></i>
            </div>
          </li>

          <!-- Text -->
          <li id="toolbar-item-text" class="tools--item">
            <div class="tools--item--button">
              <i class="fas fa-font"></i>
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
        <div id="account-button" class="toolbar--button">
          <i
            class="far fa-user toolbar--button--icon toolbar--button--profile-icon avatar-thumb"
          ></i>
          <div>Hi, {{ name }}</div>
          <i
            class="fas fa-caret-down toolbar--button--icon toolbar--board--user ml--1 is--last"
          ></i>
          <!-- Reverse class to add is--visible when user pesses drop down icon -->
          <div
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
import $ from 'jquery'; // eslint-disable-line import/no-extraneous-dependencies

export default {
  data() {
    return {
      name: 'Armin',
    };
  },
  mounted() {
    this.addClassToElement();
  },
  methods: {
    addClassToElement() {
      $(() => {
        $('.tools--item--button').click(() => {
          $('.tools--item--button').removeClass('is--selected');
          $(this).toggleClass('is--selected').siblings().removeClass('is--selected');
        });

        $('.toolbar--board--drop').click(() => {
          $('.dropdown-board-menu').toggleClass('is--visible');
        });

        $('.toolbar--board--pdf').click(() => {
          $('.dropdown-export').toggleClass('is--visible');
        });

        $('.toolbar--board--user').click(() => {
          $('.dropdown--user').toggleClass('is--visible');
        });

        $('.btn-color-palette').click(() => {
          $('.toolbox').toggleClass('is--visible');
        });
      });
    },
  },
};
</script>

<style scoped>
.toolbar-box-middle-left {
  position: absolute;
  margin-top: 100px;
  margin-left: 20px;
}
.toolbar--vertical {
  width: 56px;
  height: auto;
}

.toolbar,
.toolbar-button {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f0f0f0;
}

.tools--menu {
  width: 100%;
  position: relative;
  padding: 7px;
}

.tools--item:first-child {
  margin-top: 0;
}

ul {
  margin-bottom: 0;
  list-style: none;
}

.tools--item {
  margin-top: 6px;
  position: relative;
  border-radius: 8px;
}

.tools--item--button {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tools--item--button.is--selected {
  background-color: #d6d6d6;
}

.toolbar--box--top-left,
.toolbar-box-top-right {
  margin-top: 12px;
  display: flex;
  z-index: 200;
  position: absolute;
}

.logo--box {
  display: flex;
  margin-right: 15px;
}

.toolbar--big,
.user--information {
  height: 50px;
}

.mr--1 {
  margin-right: 10px !important;
}

.flex,
.user--information {
  display: flex;
}

.toolbar--board--name {
  margin-top: -5px;
  margin-left: -4px;
  font-size: 16px;
  line-height: 1.25;
  display: block;
  font-family: 'Poppins', sans-serif;
}

.toolbar--board--name[readonly] {
  color: #333;
  cursor: text;
}

.toolbar--board--name,
.toolbar--board--name[readonly] {
  background: 0 0;
  border: 1px solid transparent;
  padding: 0 3px;
}

.toolbar--board--drop {
  height: 28x;
  cursor: pointer;
  margin-left: 15px;
  padding-right: 15px;
  border-right: 1px solid #ddd;
}

.flex--middle {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.dropdown.is--visible {
  display: block;
}

.dropdown--toolbar {
  top: 56px;
  left: -1px;
  min-width: 200px;
  width: 200px;
  background-color: #f0f0f0;
  border: 1px solid #e6e6e6;
}

.dropdown {
  display: none;
  position: absolute;
  border-radius: 8px;
  z-index: 500;
  width: auto;
}

.fadeInUp {
  animation: fadeInUp 0.35 ease-in-out;
}

.dropdown--menu--item {
  border-bottom: 1px solid #e6e6e6;
}

.dropdown--menu--link {
  padding: 16px;
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  color: #333;
}

a {
  text-decoration: none;
}

.dropdown.dropdown--toolbar ul {
  padding: 0;
  margin: 0;
}

.toolbar--board--button {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}

.toolbar--board--item {
  padding: 10px 15px 10px 10px;
}

.toolbar--board--pdf {
  padding: 10px 15px 10px 10px;
}

.toolbar--board {
  position: relative;
}

.toolbar--button--icon {
  display: inline-block;
  margin-right: 10px;
}

.toolbar--button--colored {
  background-color: #fe6011 !important;
  color: #fff;
}

.toolbar--button {
  background-color: #f3f3f3;
}

.toolbar--button {
  pointer-events: all;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  padding: 0 12px;
  position: relative;
  font-size: 14px;
  font-weight: 700;
}

.toolbar-box-top-right {
  display: flex;
  right: 120px;
  flex-direction: row;
}

.is--hidden {
  display: none !important;
}

.toolbar--button--profile-icon {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}

.toolbar--button--icon.is--last {
  margin-right: 0;
}

.ml--1 {
  margin-left: 10px !important;
}

.dropdown.is--reverse {
  right: 0 !important;
  left: initial;
}

.fa-home {
  color: #333;
}

.toolbox {
  display: none;
  top: -12px;
  left: 54px;
  border-radius: 24px;
  border: 1px solid #ddd;
  padding: 5px;
  z-index: 100;
  position: absolute;
  background-color: #f0f0f0;
}

.toolbox.is--visible {
  display: block;
}

.fadeInLeft {
  animation: fadeInLeft 0.35 ease-in-out;
}

.tools--menu--colors.tools--menu--inline {
  margin: 0 -2px !important;
}

.tools--menu--inline {
  padding: 7px 15px;
  display: flex;
  flex-direction: row;
  margin: 0 2px;
  position: relative;
}

.tools--menu {
  padding: 7px;
  position: relative;
  width: 100%;
}

.tools--menu--colors .tools--item {
  margin: 0 2px;
}

.tools--item--button .predefined--color {
  width: 22px;
  height: 22px;
  border-radius: 11px;
}
</style>
