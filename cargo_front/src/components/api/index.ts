import axios, { AxiosResponse, ResponseType } from 'axios'
import { coreUrl }from './config'
import { JsonBody, makeRequest } from './requistBuilder'



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
export interface RequestOptions {
  apiVersion: 'core' | 'imageUrl';
  withHeaders?: boolean;
  headers?: any;
  withCredentials?: boolean;
  responseType?: ResponseType
}

export type RequestBody = JsonBody | FormData;

export type RequestMethod = (
  config: RequestOptions
) => (url: string, body?: RequestBody) => Promise<AxiosResponse['data']>;
export interface ApiWrapper {
  get: RequestMethod;
  post: RequestMethod;
  patch: RequestMethod;
  put: RequestMethod;
  delete: RequestMethod;
}


export const API: ApiWrapper = {
  get: (config: RequestOptions) => async (url: string) =>
    makeRequest(
      {
        method: 'get',
        url,
      },
      config
    ),

  post: (config: RequestOptions) => async (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'post',
        body,
        url,
      },
      config
    ),

  patch: (config: RequestOptions) => async (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'patch',
        body,
        url,
      },
      config
    ),

  put: (config: RequestOptions) => async (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'put',
        body,
        url,
      },
      config
    ),

  delete: (config: RequestOptions) => async (url: string, body?: JsonBody) =>
    makeRequest(
      {
        method: 'delete',
        body,
        url,
      },
      config
    ),
};