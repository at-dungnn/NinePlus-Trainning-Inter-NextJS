import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useSessionService } from "./sessionService";
import { useRouter } from "next/router";

const apiClient: AxiosInstance = axios.create({
    // baseURL: "http://your-api-url.com",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Origin": "*",
    },
});
const sessionService = useSessionService();
const router = useRouter();

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = sessionService.loggedInUser?.token;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            router.push("/login");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default apiClient;
