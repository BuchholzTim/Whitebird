/* eslint-disable func-names */
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log($axios.defaults.baseURL);
    console.log(`Making request to ${config.url}`);
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status, 10);
    if (code === 404) {
      redirect('/404');
    }
  });
}
