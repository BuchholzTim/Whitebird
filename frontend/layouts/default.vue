<template>
  <div>
    <Header />
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

export default {
  components: {
    Header,
    FeatureSection,
    Footer,
    ResourceSection,
  },
};
</script>

<style scoped>
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
