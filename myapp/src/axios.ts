import AxiosBase from 'axios';

const axios = AxiosBase.create({
  baseURL: 'https://ec2-54-150-97-23.ap-northeast-1.compute.amazonaws.com:9000',
  responseType: 'json',
});

export default axios;
