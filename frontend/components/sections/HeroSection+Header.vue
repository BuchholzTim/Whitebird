<template>
  <section class="hero is-fullheight is-default is-bold">
    <!-- eslint-disable max-len -->

    <!-- fixed nav bar-->
    <nav
      class="navbar is-fresh is-transparent no-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <!-- the container-hero -->
      <div class="container-hero">
        <!-- brand icon -->
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="../../assets/images/art_logo.png" alt width="88" height="40" />
          </a>
        </div>
        <!-- nav items-->
        <div id="navbar-menu" class="navbar-menu is-static">
          <div class="navbar-start">
            <a class="navbar-item is-hidden-mobile">
              <div
                id="menu-icon-wrapper"
                class="menu-icon-wrapper"
                style="visibility: visible"
                :class="{ open: isOpen }"
              >
                <svg width="1000px" height="1000px">
                  <path
                    class="path1"
                    d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                  ></path>
                  <path class="path2" d="M 300 500 L 700 500"></path>
                  <path
                    class="path3"
                    d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                  ></path>
                </svg>
                <button
                  id="menu-icon-trigger"
                  class="menu-icon-trigger"
                  @click="toggleClass"
                ></button>
              </div>
            </a>
          </div>
          <div class="navbar-end">
            <a href="#features" class="navbar-item is-secondary"> Features </a>
            <a href="#" class="navbar-item is-secondary"> Log in </a>
            <a target="_blank" href="#" class="navbar-item">
              <span class="button signup-button rounded secondary-btn raised">
                Register
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- our clone when we scroll -->
    <nav
      id="navbar-clone"
      class="navbar is-fresh is-transparent"
      :class="{ active: didScroll }"
      role="navigation"
      aria-label="main navigation"
    >
      <!-- the container-hero -->
      <div class="container-hero">
        <!-- brand icon -->
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="../../assets/images/art_logo.png" alt width="88" height="40" />
          </a>
        </div>
        <!-- nav items-->
        <div id="navbar-menu" class="navbar-menu is-static">
          <div class="navbar-start">
            <a class="navbar-item is-hidden-mobile">
              <div
                id="menu-icon-wrapper"
                class="menu-icon-wrapper"
                style="visibility: visible"
                :class="{ open: isOpen }"
              >
                <svg width="1000px" height="1000px">
                  <path
                    class="path1"
                    d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"
                  ></path>
                  <path class="path2" d="M 300 500 L 700 500"></path>
                  <path
                    class="path3"
                    d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"
                  ></path>
                </svg>
                <button
                  id="menu-icon-trigger"
                  class="menu-icon-trigger"
                  @click="toggleClass"
                ></button>
              </div>
            </a>
          </div>
          <div class="navbar-end">
            <NuxtLink to="/Whiteboard">Whiteboard</NuxtLink>
            <a
              href="https://github.com/BuchholzTim/MTI-Projekt"
              target="_blank"
              rel="noopener noreferrer"
              class="header-github-link is-small"
              aria-label="Github Repository"
            >
              <img src="../../assets/images/github-logo.svg" />
            </a>
            <a href="#features" class="navbar-item is-secondary"> Features </a>
            <a href="#" class="navbar-item is-secondary"> Log in </a>
            <a target="_blank" href="#" class="navbar-item">
              <span class="button signup-button rounded secondary-btn raised">
                Register
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="hero-body">
      <div class="container-hero">
        <div class="columns is-vcentered">
          <div class="column is-5 is-offset-1 landing-caption">
            <p class="subtitle">The state of the</p>
            <h1 class="title is-1 is-bold is-spaced">ART</h1>
            <p>
              <a
                target="_blank"
                href="https://github.com/BuchholzTim/MTI-Projekt"
                class="header-github-link"
              >
                <img src="../../assets/images/github-logo.svg" />
              </a>
            </p>
          </div>
          <div class="column is-5 is-offset-1">
            <figure class="image is-4by4">
              <img
                class="lazy"
                src="../../assets/images/whiteboard.svg"
                style="display: block"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
    <SideBar v-if="isOpen" style="transform: translateX(0)" />
  </section>
</template>

<script>
import SideBar from './SideBar.vue';

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      isOpen: false,
      didScroll: true,
    };
  },
  methods: {
    toggleClass() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
<style scoped>
.hero.is-halfheight .hero-body > .container-hero,
.hero.is-fullheight .hero-body > .container-hero {
  flex-grow: 1;
  flex-shrink: 1;
}

@media screen and (min-width: 1280px) {
  .container-hero {
    max-width: 1152px;
    width: 1152px;
  }
}

@media screen and (min-width: 1088px) {
  .container-hero {
    max-width: 960px;
    width: 960px;
  }
}

.container-hero {
  margin: 0 auto;
  position: relative;
}

.hero.is-fullheight {
  min-height: 100vh;
}

.hero {
  align-items: stretch;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.subtitle {
  color: #4a4a4a;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.25;
}
.landing-caption p {
  display: flex;
  justify-content: center;
}
.image img {
  display: block;
  height: auto;
  width: 100%;
}
.image {
  display: block;
  position: relative;
}

.header-github-link.is-small img {
  height: 24px;
  width: 24px;
}
.header-github-link img {
  content: '';
  width: 60px;
  height: 60px;
  display: flex;
}
.hero-body .title.is-bold {
  font-weight: 700;
}
.hero-body .title,
.hero-body .subtitle {
  font-family: 'Open Sans', sans-serif;
}
.title.is-1 {
  font-size: 3rem;
  margin-top: 5px;
  text-align: center;
}
.column {
  display: block;
  width: 41.66667%;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
}

.column.is-offset-1 {
  margin-left: 8.33333%;
}

.column.is-5 {
  flex: none;
}

.columns.is-vcentered {
  -ms-flex-align: center;
  align-items: center;
}

.columns:last-child {
  margin-bottom: -0.75rem;
}

.columns {
  display: flex;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}
.hero-body {
  padding-top: 6rem;
  padding-bottom: 6rem;
}

.hero.is-halfheight .hero-body,
.hero.is-fullheight .hero-body {
  -ms-flex-align: center;
  align-items: center;
  display: -ms-flexbox;
  display: flex;
}

.hero-body {
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
}

.navbar.is-fresh.no-shadow {
  box-shadow: none !important;
}
.navbar.is-fresh {
  position: relative;
  min-height: 3.8rem;
  transition: all 0.3s;
  z-index: 29;
}

.navbar.is-fresh .container-hero {
  min-height: 4rem;
}
.hero .navbar {
  background: none;
}
.navbar {
  background-color: white;
  box-shadow: 0 2px 0 0 whitesmoke;
  min-height: 3.25rem;
  position: relative;
  z-index: 30;
}

.navbar > .container-hero {
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -ms-flexbox;
  display: flex;
  min-height: 3.25rem;
  width: 100%;
}

.navbar-brand,
.navbar-tabs {
  -ms-flex-align: stretch;
  align-items: stretch;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  min-height: 3.25rem;
}

.navbar.is-fresh .navbar-item {
  color: #999;
}

a.navbar-item,
.navbar-link {
  cursor: pointer;
}

.navbar.is-fresh .navbar-brand img {
  max-height: 36px !important;
  height: 36px;
}

.navbar.is-fresh .navbar-item {
  color: #999;
}

a.navbar-item,
.navbar-link {
  cursor: pointer;
}

.menu-icon-wrapper {
  position: relative;
  left: 0;
  top: 0;
  width: 34px;
  height: 34px;
  pointer-events: none;
  transition: 0.1s;
}

.menu-icon-wrapper svg {
  position: absolute;
  top: -18px;
  left: -18px;
  -webkit-transform: scale(0.07);
  transform: scale(0.07);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}

.menu-icon-wrapper svg path {
  stroke: #f39200;
  stroke-width: 40px;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: transparent;
  transition: stroke-dasharray 0.5s;
}

.menu-icon-wrapper svg path.path1 {
  stroke-dashoffset: 5803.15px;
  stroke-dasharray: 2901.57px, 2981.57px, 240px;
}

.menu-icon-wrapper svg path.path2 {
  stroke-dashoffset: 800px;
  stroke-dasharray: 400px, 480px, 240px;
}

.menu-icon-wrapper svg path.path3 {
  stroke-dashoffset: 6993.11px;
  stroke-dasharray: 3496.56px, 3576.56px, 240px;
}

.menu-icon-wrapper .menu-icon-trigger {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  pointer-events: auto;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
}

.menu-icon-wrapper.open svg path.path1 {
  stroke-dasharray: 2901.57px, 5258.15px, 240px;
}

.menu-icon-wrapper.open svg path.path2 {
  stroke-dasharray: 400px, 600px, 0px;
}

.menu-icon-wrapper.open svg path.path3 {
  stroke-dasharray: 3496.56px, 6448.11px, 240px;
}

.navbar.is-fresh .navbar-end {
  -ms-flex-align: center;
  align-items: center;
}

.navbar.is-fresh .navbar-item.is-secondary:hover {
  color: #f39200 !important;
}

.button.secondary-btn {
  outline: none;
  border-color: #f39200;
  background-color: #f39200;
  color: #fff;
  transition: all 0.5s;
}

.button.signup-button {
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Papillo', sans-serif;
  padding: 24px 26px;
  width: 130px;
  border-color: #f39200;
}

#navbar-clone {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  -webkit-transform: translateY(-100%);
  transform: translateY(-100%);
  z-index: 100;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
}

#navbar-clone.active {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}
</style>
