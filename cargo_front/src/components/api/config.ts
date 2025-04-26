import { ApiConfig } from './types'

export const defaultConfig: ApiConfig = {
  api: {
    core: process.env.VITE_CORE_API_URL || 'http://localhost:8080/api',
    imageUrl: process.env.VITE_IMAGE_API_URL || 'http://localhost:8080/api'
  },
  withCredentials: false,
}

export const StoreBase = {
  config: defaultConfig,
}

const convertToBoolean = (value: string | boolean): boolean => {
  return String(value) === 'true'
}

export const coreUrl = () => StoreBase.config.api.core
export const imageUrl = () => StoreBase.config.api.imageUrl
export const withCredentials = () => convertToBoolean(StoreBase.config.withCredentials)
