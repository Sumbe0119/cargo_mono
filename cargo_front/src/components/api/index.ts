import axios from 'axios'
import { coreUrl }from './config'

const axiosInstance = axios.create({
  baseURL: coreUrl(),
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', withCredentials: true, credentials: 'include' },
  withCredentials: true,
})

export async function login(body: any) {
  const response = await axiosInstance.post('/auth/login', body)
  return response.data
}


export async function fetchUser({ id }: { id: any }) {
  const response = await axiosInstance.get(`/auth/user/${id}`)
  return response.data
}