import { getAccessToken, removeToken, setToken } from "@/utils/secureStore";
import axios from "axios";

const API = axios.create({
    baseURL: "http://192.168.31.191:5005/api/v1",
    withCredentials: true,
})

API.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken()
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

API.interceptors.response.use(
    async (response) => {
        const accessToken = response.data?.data?.accessToken || response.data?.accessToken;
        const refreshToken = response.data?.data?.refreshToken || response.data?.refreshToken;

        if (accessToken) {
            await setToken(accessToken, refreshToken);
            console.log("Token set successfully");
            console.log("AccessToken:", accessToken);
        }
        
        return response
    },
    async (error) => {
        if (error.response?.status === 401) {
            await removeToken()
            console.log("Session expired. Logging out...");
        }

        return Promise.reject(error);
    }
)

export default API;