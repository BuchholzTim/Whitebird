<template>
  <section id="resources" class="resources">
    <div class="resources-container">
      <div class="row">
        <!-- TODO: Look over this, this does not seem right for ipads -->
        <div class="col col--11 col--offset-1">
          <div class="headline-resources">
            <h2 class="title-msts">
              Browse through our resources to see how to get started
            </h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col resource-cards-left delay-1">
          <a
            v-scrollanimation
            class="card card-l1"
            href="https://github.com/BuchholzTim/Whitebird/wiki"
          >
            <div class="card--header">
              <div class="card--icon">
                <i class="fas fa-question"></i>
              </div>
              <div class="card--body" style="padding-left: 0 !important">
                <p>How to get started?</p>
              </div>
            </div>
          </a>
          <a
            v-scrollanimation
            class="card card-l1"
            href="https://github.com/BuchholzTim/Whitebird/wiki"
          >
            <div class="card--header">
              <div class="card--icon">
                <i class="fas fa-wrench"></i>
              </div>
              <div class="card--body" style="padding-left: 0 !important">
                <p>Check out our wiki to see the latest issues and updates</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col resource-cards-middle delay-2">
          <a v-scrollanimation class="card card-m1">
            <div class="card--header">
              <div class="card--icon">
                <i class="fas fa-book"></i>
              </div>
              <h3>Documentation</h3>
            </div>
            <div class="card--body">
              <p>Check out our docs</p>
            </div>
          </a>
        </div>
        <div class="col resource-cards-right delay-3">
          <a v-scrollanimation class="card card-m1">
            <div class="card--header">
              <div class="card--icon">
                <i class="fab fa-github"></i>
              </div>
              <h3>Contribute</h3>
            </div>
            <div class="card--body">
              <p>Help us improve with issueing bugs and feature requests</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '~assets/scss/_resourceSection.scss';
@import '~assets/scss/_animations.scss';
</style>
