<template>
  <footer class="footer footer-dark">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="footer-column">
            <img src="../assets/images/whitebird.png" style="width: 88px" />
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>{{ $t('footer.appInfo') }}</h3>
            </div>
            <ul class="link-list">
              <li>
                <a href="https://github.com/BuchholzTim/Whitebird" target="_blank">{{
                  $t('footer.getCode')
                }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>{{ $t('footer.docs') }}</h3>
            </div>
            <ul class="link-list" style="width: 150px;">
              <li>
                <a
                  href="https://github.com/BuchholzTim/Whitebird/wiki"
                  target="_blank"
                  >{{ $t('footer.seeDocs') }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>{{ $t('footer.credits') }}</h3>
            </div>
            <ul class="link-list">
              <li>
                <a
                  href="https://github.com/BuchholzTim/Whitebird/graphs/contributors"
                  target="_blank"
                  >{{ $t('footer.contributors') }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column"><LocaleSwitcher /></div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>{{ $t('footer.follow') }}</h3>
              <nav class="level">
                <div class="level-centered">
                  <a
                    class="level-item"
                    href="https://github.com/BeckmannArmin"
                    target="_blank"
                  >
                    <span class="icon">
                      <img src="~/assets/images/armin.png" />
                    </span>
                  </a>
                  <a
                    class="level-item"
                    href="https://github.com/BuchholzTim"
                    target="_blank"
                  >
                    <span class="icon">
                      <img src="~/assets/images/tim.png" />
                    </span>
                  </a>
                  <a
                    class="level-item"
                    href="https://github.com/GeiserRafael"
                    target="_blank"
                  >
                    <span class="icon">
                      <img src="~/assets/images/raphael.png" />
                    </span>
                  </a>
                  <a
                    class="level-item"
                    href="https://github.com/MarcBollmann"
                    target="_blank"
                  >
                    <span class="icon">
                      <img src="~/assets/images/bollmann.png" />
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import LocaleSwitcher from '~/components/LocaleSwitcher.vue';

export default {
  components: {
    LocaleSwitcher,
  },
};
</script>

<style scoped>
@import '~/assets/scss/_footer.scss';
</style>
