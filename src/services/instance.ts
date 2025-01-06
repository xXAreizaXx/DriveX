// Axios
import axios from "axios";

// Instance
export const axiosInstance = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});