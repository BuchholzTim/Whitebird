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
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
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
  },
};
</script>

<style scoped>
.animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
}

.delay-1 {
  animation-delay: 0.25s;
}
.delay-2 {
  animation-delay: 0.5s;
}
.delay-3 {
  animation-delay: 0.75s;
}
.delay-4 {
  animation-delay: 1s;
}

@keyframes fadeInLeft {
  from {
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0);
    opacity: 0;
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@-webkit-keyframes fadeInLeft {
  from {
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0);
    opacity: 0;
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.fadeInLeft {
  opacity: 0;
  animation-name: fadeInLeft;
  -webkit-animation-name: fadeInLeft;
}

.feature-card .card-text p {
  color: #999;
  margin-top: 20px;
}
.feature-card .card-icon img {
  height: 120px;
  margin-top: 20px;
}
.feature-card .card-title h4 {
  font-family: 'Open Sans', sans-serif;
  padding-top: 25px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #444f60;
}

.feature-card .card-text {
  padding: 0 40px;
}
.feature-card.is-bordered {
  border: 1px solid #ededed;
}
.feature-card {
  width: 300px;
  height: 320px;
  background-color: #fff;
  border-radius: 3px;
  margin: 0 auto;
  border-radius: calc(0.4rem * 2);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.has-text-centered {
  text-align: center !important;
}
@media screen and (min-width: 769px) {
  .column.is-one-third {
    -ms-flex: none;
    flex: none;
    width: 33.3333%;
  }
}
.column {
  display: block;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  padding: 0.75rem;
}
.columns:last-child {
  margin-bottom: -0.75rem;
}
.columns {
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;
}
.content-wrapper {
  padding: 60px 0;
}
.divider {
  height: 3px;
  border-radius: 50px;
  background: #f39200;
  width: 60px;
}
.divider.is-centered {
  margin: 0 auto;
}
.title.is-2 {
  font-size: 2.5rem;
}
.title-wrapper {
  max-width: 500px;
  margin: 0 auto;
}
.has-text-centered {
  text-align: center !important;
}
.section.section-feature-grey {
  background-color: #fbfbfb;
}

.section {
  padding: 3rem 1.5rem;
  display: block;
}

.feature-container {
  margin: 0 auto;
  position: relative;
  display: block;
}

@media screen and (min-width: 1088px) {
  .feature-container {
    max-width: 960px;
    width: 960px;
  }
}

@media screen and (min-width: 1088px) {
  .section.is-medium {
    padding: 9rem 1.5rem;
  }
}

@media screen and (min-width: 1280px) {
  .feature-container {
    max-width: 1152px;
    width: 1152px;
  }
}
</style>
