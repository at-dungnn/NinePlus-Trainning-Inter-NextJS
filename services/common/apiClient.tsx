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
        const tempToken =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InN1cGVyYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJsZWhpZXUucXJ0QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJOZ3V5ZW4gUGh1b2MgTGUgSGlldSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJhZG1pbiIsImV4cCI6MTY5MTY3MDQ0MH0.Yb2DdaWfRHNp_ytFAivsbGG-8MG3OPezSip0TWeB2Z8";
        if (tempToken) {
            config.headers.Authorization = `Bearer ${tempToken}`;
        } else {
            globalRouter.navigate.push("/auth/login");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
