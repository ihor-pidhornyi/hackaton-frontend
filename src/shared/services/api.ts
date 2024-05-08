import axios from 'axios'

const client = axios.create({
  baseURL: `https://roman-ko.net`,
})

client.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem('token') || JSON.stringify(null)) as string | null
  if (token) {
    config.headers = {
      'Authorization': 'Bearer ' + token
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

export default client
