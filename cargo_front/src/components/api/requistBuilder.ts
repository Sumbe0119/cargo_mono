import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import {  coreUrl, imageUrl,  } from './config';

export type HTTPMethod = 'get' | 'post' | 'delete' | 'put' | 'patch';

export interface JsonBody {
	// tslint:disable-next-line no-any
	[key: string]: any;
}

export interface RequestOptions {
	apiVersion: 'core' | 'imageUrl';
	withHeaders?: boolean;
	headers?: object;
	responseType?: ResponseType;
	withCredentials?: boolean;
}

export interface Request {
	method: HTTPMethod;
	url: string;
	body?: JsonBody;
}

const getAPI = () => {
	return {
		core: coreUrl(),
		imageUrl: imageUrl()
	}
};

const buildRequest = (request: Request, configData: RequestOptions, withCredentials = true) => {
	const { body, method, url } = request;
	const { apiVersion, headers, responseType } = configData;
	const api = getAPI();

	const contentType = body instanceof FormData ? 'multipart/form-data' : 'application/json';

	const defaultHeaders = {
		'content-type': contentType,
	};

	const apiUrl = api[apiVersion];

	const requestConfig: AxiosRequestConfig = {
		baseURL: apiUrl,
		data: body,
		headers: { ...headers, ...defaultHeaders },
		method,
		url,
		withCredentials: withCredentials || false,
		responseType,
	};

	return requestConfig;
};

export const defaultResponse: Partial<AxiosError['response']> = {
	status: 500,
	data: {
		message: 'Server error',
	},
};

export const formatError = (responseError: AxiosError) => {
	const response = responseError.response || defaultResponse;
	//@ts-ignore
	const errors = response.data && (response.data.message || "Server error");
	return {
		code: response.status,
		message: typeof errors == 'object' ? errors?.[0] : errors
	};
};

export const makeRequest = async (request: Request, configData: RequestOptions) => {
	const requestConfig = buildRequest(request, configData);

	return new Promise((resolve, reject) => {
		const axiosRequest: AxiosPromise = axios(requestConfig);
		axiosRequest
			.then((response: AxiosResponse) => {
				if (configData.withHeaders) {
					resolve(response);
				} else {
					resolve(response.data);
				}
			})
			.catch((error: AxiosError) => {
				reject(formatError(error));
			});
	});
};