// Axios
import { axiosInstance } from "./instance";

export async function getUsers() {
    return await axiosInstance.get("/users");
}

export async function getOneUser(id: number) {
    return await axiosInstance.get(`/users/${id}`);
}

export async function createUser(data: DtoUser) {
    return await axiosInstance.post("/users", data);
}

export async function updateUser(id: number, data: DtoUser) {
    return await axiosInstance.put(`/users/${id}`, data);
}

export async function deleteUser(id: number) {
    return await axiosInstance.delete(`/users/${id}`);
}