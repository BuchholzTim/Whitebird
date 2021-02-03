import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('PLUGIN: i18n');

export default ({ app }) => {
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    logger.log(`OldLocale: ${oldLocale} -> NewLocale: ${newLocale}`);
  };
};
