// Axios
import { axiosInstance } from "./instance";

export async function getMetrics() {
    return await axiosInstance.get("/metrics");
}