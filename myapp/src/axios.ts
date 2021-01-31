import AxiosBase from 'axios';

const axios = AxiosBase.create({
  baseURL: 'https://kintrecord.link:9000',
  responseType: 'json',
});

export default axios;
