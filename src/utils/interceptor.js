import axios from 'axios';
import { API_BASE_URL } from '../config';
import { message } from 'antd';
import { get } from '../utils/storage';

axios.defaults.timeout = 10000; // 设置超时时间
axios.defaults.showLoading = false; // 设置请求是否loading
axios.defaults.adminCheck = false; // 默认请求不携带aoken
axios.defaults.userCheck = false; // 默认请求不携带aoken

function createInterceptor(instance) {
	instance.interceptors.request.use(
		function (config) {
			const adminInfo = get('adminInfo');
			if (config.adminCheck && adminInfo.token) {
				config.headers.token = adminInfo.token;
			}
			const userInfo = get('userInfo');
			if (config.userCheck && userInfo.token){
			  config.headers.token = userInfo.token;
			}
			// Do something before request is sent
			return config;
		},
		function (error) {
			// Do something with request error
			message.error('请求超时');
			return Promise.reject(error);
		}
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// Do something with response data
			if(response.data.code === 401){
        message.error(response.data.desc);
			  window.location('/')
			  return response.data;;
      }
			return response.data;
		},
		function (error) {
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
