<template>
  <div>
    <Header />
    <JoinLobbySection />
    <FeatureSection />
    <ResourceSection />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/sections/HeroSection+Header.vue';
import FeatureSection from '../components/sections/FeatureSection.vue';
import Footer from '../components/Footer.vue';
import ResourceSection from '../components/sections/ResourceSection.vue';
import JoinLobbySection from '../components/sections/JoinLobbySection.vue';

export default {
  components: {
    Header,
    FeatureSection,
    Footer,
    ResourceSection,
    JoinLobbySection,
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('DOMContentLoaded', this.onLoad);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('DOMContentLoaded', this.onLoad);
  },
  methods: {
    handleScroll() {
      const elementsToShow = document.querySelectorAll('.revealOnScroll');
      const navBarClone = document.querySelector('.navbar-is-clone');
      /** better get the feature section here instead of hard coded values */
      if (window.scrollY > 1000) {
        elementsToShow.forEach((element) => {
          element.classList.add('animated');
          element.classList.add('fadeInLeft');
        });
      }

      if (window.scrollY > 10) {
        navBarClone.classList.add('active');
      } else {
        navBarClone.classList.remove('active');
      }
    },
    onLoad() {
      const showOnLoad = document.querySelectorAll('.revealOnLoad');
      showOnLoad.forEach((ele) => {
        ele.classList.add('animated');
        ele.classList.add('fadeInLeft');
      });
    },
  },
};
</script>

<style scoped>
@import '~assets/scss/_animations.scss';
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
