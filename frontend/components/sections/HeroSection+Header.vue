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
            <a href="#resources" class="navbar-item is-secondary">
              {{ $t('heroSection.resources') }}
            </a>
            <a href="#features" class="navbar-item is-secondary">
              {{ $t('heroSection.features') }}
            </a>
          </div>
        </div>
      </div>
    </nav>
    <!-- our clone when we scroll -->
    <nav
      id="navbar-clone"
      class="navbar is-fresh is-transparent navbar-is-clone"
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
            <a href="#resources" class="navbar-item is-secondary">
              {{ $t('heroSection.resources') }}
            </a>
            <a href="#features" class="navbar-item is-secondary">
              {{ $t('heroSection.features') }}
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="hero-body">
      <div class="container-hero">
        <div class="columns is-vcentered">
          <div class="column is-5 landing-caption">
            <p>
              <a
                target="_blank"
                href="https://github.com/BuchholzTim/Whitebird"
                class="header-github-link"
              >
                <img
                  src="~/assets/images/identity.svg"
                  style="margin-bottom: 20px"
                />
              </a>
            </p>
            <h1 class="title is-1 is-bold is-spaced delay-5">
              {{ $t('heroSection.whitebird') }}
            </h1>
            <p class="subtitle delay-4 has-text-centered">
              {{ $t('heroSection.heroDescription') }}
            </p>
          </div>
          <img
            width="80%"
            class="lazy"
            src="~/assets/images/whitebird_collab_animated.gif"
            style="display: block"
          />
        </div>
      </div>
    </div>
    <SideBar v-if="isOpen" style="transform: translateX(0)" />
  </section>
</template>

<script>
import SideBar from '~/components/sections/SideBar.vue';

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      isOpen: false,
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
@import '~assets/scss/_header+hero.scss';
@import '~assets/scss/_animations.scss';
</style>
