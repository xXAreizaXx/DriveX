// Axios
import { axiosInstance } from "./instance";

export async function getVehicles() {
    return await axiosInstance.get("/vehicles");
}

export async function getOneVehicle(id: number) {
    return await axiosInstance.get(`/vehicles/${id}`);
}

export async function createVehicle(data: DtoVehicle) {
    return await axiosInstance.post("/vehicles", data);
}

export async function updateVehicle(id: number, data: DtoVehicle) {
    return await axiosInstance.put(`/vehicles/${id}`, data);
}

export async function deleteVehicle(id: number) {
    return await axiosInstance.delete(`/vehicles/${id}`);
}