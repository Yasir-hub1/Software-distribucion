
import axios from "axios";



import * as SecureStore from "expo-secure-store";
import { config } from "../Config";



const axiosInstance = axios.create({
    baseURL: `${config.BASE_URL}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data',
        accept: "application/json",
    },
});

/* intersectando las respuestas de la API */

axiosInstance.interceptors.request.use(async (req) => {
    const access_token = await SecureStore.getItemAsync(config.USER_TOKEN_KEY);
    req.headers["Authorization"] = `Bearer ${access_token}`;
    return req;
});

export default axiosInstance;
