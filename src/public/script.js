const URL = 'https://github.com/login/oauth/authorize';
const options = {
  client_id: '0cd5eec6c65b8565df1e',
};
const queryString = Object.keys(options)
  .map((key) => {
    return `${key}=${encodeURIComponent(options[key])}`;
  })
  .join('&');

const authUrl = `${URL}?${queryString}`;
const link = document.getElementById('oauth');
link.setAttribute('href', authUrl);