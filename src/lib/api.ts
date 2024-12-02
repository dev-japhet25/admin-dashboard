
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';
import { decrypt } from './helpers/encrypt';

interface ApiInterface {
  get: <T = any>(url: string, params?: any, config?: InternalAxiosRequestConfig) => Promise<AxiosResponse<T>>;
  post: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig) => Promise<AxiosResponse<T>>;
  put: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig) => Promise<AxiosResponse<T>>;
  patch: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig) => Promise<AxiosResponse<T>>;
  delete: <T = any>(url: string, config?: InternalAxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

const baseURL = process.env.NEXT_PUBLIC_ASORIBA_API;

const api: ApiInterface = (() => {
  const instance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    },
  );

  return {
    get: <T = any>(url: string, params?: any, config?: InternalAxiosRequestConfig) =>
      instance.get<T>(url, { ...config, params }),
    post: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig) =>
      instance.post<T>(url, data, config),
    put: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig) =>
      instance.put<T>(url, data, config),
    patch: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig) =>
      instance.patch<T>(url, data, config),
    delete: <T = any>(url: string, config?: InternalAxiosRequestConfig) =>
      instance.delete<T>(url, config),
  };
})();

export default api;

interface SlackCommandResponse {
  text: string;
}

export const sendSlackCommand = async (
  command: string,
  text: string
): Promise<string> => {
  try {
    const { data } = await axios.post<SlackCommandResponse>(
      `${process.env.NEXT_PUBLIC_ASORIBA_API}admin/slack_slash/`,
      {
        command: command,
        text: text,
        main_thread: true,
        user_name: decrypt(localStorage.getItem('username') || ""),
      }
    );

    return data.text;
  } catch (error) {
    console.error('Error fetching member types:', error);
    throw new Error('Failed to fetch member types. Please try again.');
  }
};
