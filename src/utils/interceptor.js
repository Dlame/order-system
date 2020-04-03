import axios from 'axios';
import { API_BASE_URL } from "../config";
import { message } from 'antd';

axios.defaults.timeout = 10000; // 设置超时时间
axios.defaults.showLoading = true; // 设置请求是否loading

function createInterceptor(instance) {
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      return config;
    },
    function(error) {
      // Do something with request error
      message.error('请求超时');
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Do something with response data
      return response.data;
    },
    function(error) {
      // Do something with response error
      message.error('网络错误');
      return Promise.reject(error);
    }
  );
}

// 初始化实例
const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});
// const apiInstance = axios.create({
//   baseURL: API_BASE_URL
// });

createInterceptor(axiosInstance);

export const $axios = axiosInstance;
// export const $api = apiInstance;
