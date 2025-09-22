import { baseUrl } from '../constants'
import axios from 'axios'

const $axios = axios.create({
  baseURL: baseUrl + '/api',
})

// $axios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       localStorage.removeItem('token')
//       window.location.href = '/'
//     }
//     return Promise.reject(error)
//   }
// )
export default $axios