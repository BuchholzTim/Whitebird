<template>
  <div class="locale-changer">
    <select v-model="language" class="p-1">
      <option value="choose-one" class="choose-lang" disabled="true">{{
        $t('footer.chooselang')
      }}</option>
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
        lang
      }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'LocaleChanger',
  data() {
    return {
      langs: ['en', 'de'],
      language: 'de',
    };
  },
  watch: {
    language(localLang) {
      this.$i18n.setLocale(localLang);
    },
  },
  mounted() {
    this.language = this.$i18n.locale;
  },
  methods: {
    switchLang(lang) {
      this.$i18n.setLocale(lang);
    },
  },
};
</script>

<style lang="scss" scoped>
select {
  background: #111111;
  border: 1px solid #ebedf0;
  border-radius: 4px;
  color: #ebedf0;
  .choose-lang {
    color: #ebedf0;
  }
}
</style>
