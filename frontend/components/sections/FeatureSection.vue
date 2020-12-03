<template>
  <section
    id="features"
    class="section section-feature-grey is-medium"
    tabindex="-1"
  >
    <div class="feature-container">
      <div class="title-wrapper has-text-centered">
        <h2 class="title is-2">Colloborative</h2>
        <div class="divider is-centered"></div>
      </div>
      <div class="content-wrapper">
        <div class="columns">
          <!-- column left -->
          <div class="column is-one-third">
            <div
              id="animatedcard"
              class="feature-card is-bordered has-text-centered revealOnScroll delay-1"
              data-animation="fadeInLeft"
            >
              <div class="card-title">
                <h4>Productive</h4>
              </div>
              <div class="card-icon">
                <img
                  alt="AppSeed App Generator Logo."
                  class="lazy"
                  src="../../assets/images/productive.svg"
                  style="display: inline-block"
                />
              </div>
              <div class="card-text">
                <p>Create productive whiteboard to work on with a team</p>
              </div>
            </div>
          </div>
          <!-- column center -->
          <div class="column">
            <div
              id="animatedcard"
              class="feature-card is-bordered has-text-centered revealOnScroll delay-2"
              data-animation="fadeInLeft"
            >
              <div class="card-title">
                <h4>Workflow</h4>
              </div>
              <div class="card-icon">
                <img
                  alt="AppSeed App Generator Logo."
                  class="lazy"
                  src="../../assets/images/organized.svg"
                  style="display: inline-block"
                />
              </div>
              <div class="card-text">
                <p>Great workflow, guaranteed through history control</p>
              </div>
            </div>
          </div>
          <!-- column right -->
          <div class="column">
            <div
              id="animatedcard"
              class="feature-card is-bordered has-text-centered revealOnScroll delay-3"
            >
              <div class="card-title">
                <h4>Sharable</h4>
              </div>
              <div class="card-icon">
                <img
                  alt="AppSeed App Generator Logo."
                  class="lazy"
                  src="../../assets/images/sharable.svg"
                  style="display: inline-block"
                />
              </div>
              <div class="card-text">
                <p>Invite your team with join codes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
      /** better get the feature section here instead of hard coded values */
      if (window.scrollY > 1000) {
        elementsToShow.forEach((element) => {
          element.classList.add('animated');
          element.classList.add('fadeInLeft');
        });
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
@import '~assets/scss/_featureSection.scss';
@import '~assets/scss/_animations.scss';
</style>
