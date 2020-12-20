import logger from '../utils/logger';

const REFERER = 'PLUGIN: Axios';

/* eslint-disable func-names */
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const message = `${$axios.defaults.baseURL} \nMaking request to ${config.url}`;
    logger(REFERER, message);
  });

  $axios.onError((error) => {
    logger(REFERER, error.message, true);
    const code = parseInt(error.response && error.response.status, 10);
    if (code === 404) {
      redirect('/404');
    }
  });
}
