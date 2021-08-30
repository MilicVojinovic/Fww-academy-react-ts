import { TOKEN_LS_NAME } from '../constants/constants'
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.VUE_APP_API_PATH
})

// const loaderOff = () => {
// 	store.commit('appStore/setState', {
// 		prop: 'loader',
// 		value: false,
// 	})
// }

// const loaderOn = () => {
// 	store.commit('appStore/setState', {
// 		prop: 'loader',
// 		value: true,
// 	})
// }


// axiosInstance.interceptors.request.use((config) => {
// 	const token = localStorage.getItem(TOKEN_LS_NAME);
// 	if (token) {
// 		config.headers["session-id"] = token
// 	}
// 	loaderOn();
// 	return config;
// });

// axiosInstance.interceptors.response.use(
// 	(response) => {
// 		loaderOff();
// 		return Promise.resolve(response);
// 	},
// 	(error) => {
// 		loaderOff();
// 		return Promise.reject(error);
// 	}
// );

export const api = axiosInstance;