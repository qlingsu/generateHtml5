import axios from 'axios';
import store from "@/store";

// axios.interceptors.request.use(
//     config => {
//         console.log('【请求拦截器启动】->', config)

//         // 设置请求token
//         if (window.appConfig.initToken) {
//             !config.headers['customToken'] && (config.headers['Authorization'] = `Bearer ${store.getters.getToken}`)
//         }

//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )
// axios.interceptors.response.use(
//     response => {
//         console.log('【请求返回拦截器启动】->', response)
//         if (response.status == 200) {
//             return response.data;
//         } else {
//             return {}
//         }

//     },
//     error => {
//         return Promise.reject(error)
//     }
// )
export default axios
