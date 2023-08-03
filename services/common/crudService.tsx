import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export abstract class CRUDService {
    protected httpClient = apiClient;

    protected abstract basePath: string;

    protected get<T>(url: string, data?: any) {
        return this.httpClient
            .get<T>(`${this.basePath}/${url}`, data)
            .then((response: AxiosResponse<T>) => {
                return response.data;
            })
            .catch((e) => {
                console.log(e);
                return e.response.data;
            });
    }

    protected list<T>(url: string, data?: any): Promise<T[]> {
        return this.httpClient
            .get<T[]>(`${this.basePath}/${url}`, data)
            .then((response: AxiosResponse<T[]>) => {
                return response.data;
            });
    }

    protected create<T>(url: string, data: any): Promise<T | void> {
        return this.httpClient
            .post<T>(`${this.basePath}/${url}`, JSON.stringify(data))
            .then((response: AxiosResponse<T>) => {
                return response.data;
            })
            .catch((e) => {
                console.log(e);
                return e.response.data;
            });
    }

    protected filter<T>(url: string, filterParams: any): Promise<T[]> {
        return this.httpClient
            .get<T[]>(`${this.basePath}/${url}`, { params: filterParams })
            .then((response: AxiosResponse<T[]>) => {
                return response.data;
            });
    }

    protected update<T>(url: string, data: any) {
        console.log(data);
        return this.httpClient
            .put<T>(`${this.basePath}/${url}`, JSON.stringify(data))
            .then((response: AxiosResponse<T>) => {
                return response.data;
            })
            .catch((e) => {
                console.log(e);
                return e.response.data;
            });
    }

    protected delete<T>(url: string): Promise<T> {
        return this.httpClient
            .delete<T>(`${this.basePath}/${url}`)
            .then((response: AxiosResponse<T>) => {
                return response.data;
            });
    }
}
