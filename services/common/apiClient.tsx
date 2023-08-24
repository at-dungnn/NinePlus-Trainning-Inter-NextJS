import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { useSessionService } from "./sessionService";
import { useRouter } from "next/router";
import globalRouter from "@/shared/tools/globalRouter";

const apiClient: AxiosInstance = axios.create({
    baseURL: "http://119.82.130.211:6060/api/v1",
    transformRequest: [],
    headers: {
        Accept: "application/json;multipart/form-data",
        "Content-Type":
            "application/json;multipart/form-data;application/x-www-form-urlencoded; charset=UTF-8",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
    },
});
// TODO / change temp token to access token when successful testing api
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const sessionService = useSessionService();
        const accessToken = sessionService.loggedInUser?.token;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            globalRouter.navigate.push("/auth/login");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default apiClient;
