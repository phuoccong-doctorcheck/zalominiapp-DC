import axios, { AxiosError, AxiosInstance } from "axios";

class HttpClient {
  private static _instance: HttpClient;
  INSTANCE!: AxiosInstance;
  TOKEN!: string | undefined;
  API_ID!: string | undefined;
  API_KEY!: string | undefined;

  constructor() {
    this._init();
  }

  static getInstance(): HttpClient {
    if (!HttpClient._instance) {
      return new HttpClient();
    }
    return HttpClient._instance;
  }

  _init() {
    if (!this.INSTANCE) {
      this.INSTANCE = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
      });
      this.setInterceptorRequest();
    }
  }

  // Set Bearer Token here!!!
  setInterceptorRequest() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const apiId = import.meta.env.VITE_API_ID;

    return this.INSTANCE.interceptors.request.use(
      async (config) => {
        config.headers["App-Id"] = apiId;
        config.headers["App-Key"] = apiKey;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async getMethod(path: string, params?: Record<string, any>): Promise<any> {
    try {
      const response = await this.INSTANCE.get(path, { params });
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response;
    }
  }

  async postMethod(path: string, body?: Record<string, any>) {
    try {
      const response = await this.INSTANCE.post(path, body);
      return response;
    } catch (error) {
      const e = error as AxiosError;
      return e.response;
    }
  }
}

export default HttpClient.getInstance();
