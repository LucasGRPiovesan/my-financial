import axios, { type AxiosInstance, type AxiosResponse, AxiosError, type InternalAxiosRequestConfig, AxiosHeaders } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  headers: new AxiosHeaders({
    'Content-Type': 'application/json',
  }),
  timeout: 10000,
})

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token')

    // Garantir que headers nunca seja undefined
    if (!config.headers) {
      config.headers = new AxiosHeaders()
    }

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`)
    }

    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // logout / redirect
          break
        case 403:
          break
        case 500:
          console.error('Internal server error')
          break
      }
    }
    return Promise.reject(error)
  }
)

export default api
