<template>
  <section id="resources" class="resources">
    <div class="resources-container">
      <div class="row">
        <!-- TODO: Look over this, this does not seem right for ipads -->
        <div class="col col--11 col--offset-1">
          <div class="headline-resources">
            <h2 class="title-msts">
              {{ $t('resourceSection.browse') }}
            </h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col resource-cards-left delay-1">
          <a
            v-scrollanimation
            class="card card-l1"
            href="https://github.com/BuchholzTim/Whitebird/wiki/Getting-Started"
            target="_blank"
          >
            <div class="card--header">
              <div class="card--icon">
                <i class="fas fa-question"></i>
              </div>
              <div class="card--body" style="padding-left: 0 !important">
                <p>{{ $t('resourceSection.getStarted') }}</p>
              </div>
            </div>
          </a>
          <a
            v-scrollanimation
            class="card card-l1"
            href="https://github.com/BuchholzTim/Whitebird/issues"
            target="_blank"
          >
            <div class="card--header">
              <div class="card--icon">
                <i class="fas fa-wrench"></i>
              </div>
              <div class="card--body" style="padding-left: 0 !important">
                <p>{{ $t('resourceSection.wiki') }}</p>
              </div>
            </div>
          </a>
        </div>
        <div class="col resource-cards-middle delay-2">
          <a
            v-scrollanimation
            class="card card-m1"
            href="https://github.com/BuchholzTim/Whitebird/wiki"
            target="_blank"
          >
            <div class="card--header">
              <div class="card--icon">
                <i class="fas fa-book"></i>
              </div>
              <h3>{{ $t('resourceSection.documentation') }}</h3>
            </div>
            <div class="card--body">
              <p>{{ $t('resourceSection.documentationText') }}</p>
            </div>
          </a>
        </div>
        <div class="col resource-cards-right delay-3">
          <a
            v-scrollanimation
            class="card card-m1"
            href="https://github.com/BuchholzTim/Whitebird/pulls"
            target="_blank"
          >
            <div class="card--header">
              <div class="card--icon">
                <i class="fab fa-github"></i>
              </div>
              <h3>{{ $t('resourceSection.contribute') }}</h3>
            </div>
            <div class="card--body">
              <p>{{ $t('resourceSection.contributeText') }}</p>
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
