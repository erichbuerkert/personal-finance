import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8080',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = 'http://localhost:3001/login'
    }
    return Promise.reject(err)
  }
)

export default API