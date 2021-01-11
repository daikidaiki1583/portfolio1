import AxiosBase from 'axios';

const axios = AxiosBase.create({
  baseURL: 'http://ec2-13-115-56-254.ap-northeast-1.compute.amazonaws.com:9000',
  responseType: 'json',
});

export default axios;
