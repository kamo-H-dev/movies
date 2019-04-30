import axios from 'axios'
// import queryString from 'query-string'

const axiosApi = axios.create({
  baseURL: process.env.VUE_APP_MOVIE_API + '/'
})

axiosApi.interceptors.request.use(
  function (config) {
    config['url'] += `&api_key=${process.env.VUE_APP_API_KEY}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosApi
