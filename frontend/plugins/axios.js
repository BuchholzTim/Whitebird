import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('PLUGIN: Axios');

/* eslint-disable func-names */
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const message = `${$axios.defaults.baseURL} \nMaking request to ${config.url}`;
    logger.log(message);
  });

  $axios.onError((error) => {
    logger.error(error.message);
    const code = parseInt(error.response && error.response.status, 10);
    if (code === 404) {
      redirect('/404');
    }
  });
}
