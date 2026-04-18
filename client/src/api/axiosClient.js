import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    withCredentials: false,
});

axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || "Something went wrong";
        return Promise.reject(new Error(message));
    }
);

export default axiosClient;
