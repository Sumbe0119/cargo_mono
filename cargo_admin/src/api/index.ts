import axios from 'axios'
import config from '../config'

const axiosInstance = axios.create({
  baseURL: config.get('API_BASE_URL'),
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', withCredentials: true, credentials: 'include' },
  withCredentials: true,
})

export async function fetchServices() {
  const response = await axiosInstance.get('/servicing/all')
  return response.data?.result?.list
}

export async function fetchCalendar({ serviceId, limit }: { serviceId: string; limit: number }) {
  const response = await axiosInstance.get(`/calendar?servicingId=${serviceId}&dayLimit=${limit}`)
  return response.data?.result
}

export async function createOrder(body: any) {
  const response = await axiosInstance.post(`/order/create`, body)
  return response.data?.result
}
