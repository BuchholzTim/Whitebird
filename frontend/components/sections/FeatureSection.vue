<template>
  <section id="features" class="section section-feature-grey is-medium">
    <div class="feature-container">
      <div class="title-wrapper has-text-centered">
        <h2 class="title is-2">{{ $t('featureSection.collaborative') }}</h2>
        <div class="divider is-centered"></div>
      </div>
      <div class="content-wrapper">
        <div class="columns">
          <!-- column left -->
          <div class="column is-one-third">
            <div
              id="animatedcard"
              v-scrollanimation
              class="feature-card is-bordered has-text-centered delay-1"
            >
              <div class="card-title">
                <h4>{{ $t('featureSection.productive') }}</h4>
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
                <p>{{ $t('featureSection.productiveText') }}</p>
              </div>
            </div>
          </div>
          <!-- column center -->
          <div class="column">
            <div
              id="animatedcard"
              v-scrollanimation
              class="feature-card is-bordered has-text-centered delay-2"
            >
              <div class="card-title">
                <h4>{{ $t('featureSection.workflow') }}</h4>
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
                <p>{{ $t('featureSection.workflowText') }}</p>
              </div>
            </div>
          </div>
          <!-- column right -->
          <div class="column">
            <div
              id="animatedcard"
              v-scrollanimation
              class="feature-card is-bordered has-text-centered delay-3"
            >
              <div class="card-title">
                <h4>{{ $t('featureSection.sharable') }}</h4>
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
                <p>{{ $t('featureSection.sharableText') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '~assets/scss/_featureSection.scss';
@import '~assets/scss/_animations.scss';
</style>
