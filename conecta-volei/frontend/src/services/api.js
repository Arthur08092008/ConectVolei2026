import axios from 'axios'

export const TOKEN_KEY = 'voleitcc_token'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

export const mensagemErro = (e) => e.response?.data?.mensagem || 'Não foi possível comunicar com o servidor.'

export default api
