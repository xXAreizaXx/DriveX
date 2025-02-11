// Axios
import { axiosInstance } from "./instance";

export async function getTransfers(filter: TFilterTransfer | null) {
    return await axiosInstance.get("/transfers", { params: { plate: filter?.plate, type: filter?.transferType } });
}

export async function getOneTransfer(id: number) {
    return await axiosInstance.get(`/transfers/${id}`);
}

export async function createTransfer(data: DtoTransfer) {
    return await axiosInstance.post("/transfers", data);
}

export async function updateTransfer(id: number, data: DtoTransfer) {
    return await axiosInstance.put(`/transfers/${id}`, data);
}

export async function deleteTransfer(id: number) {
    return await axiosInstance.delete(`/transfers/${id}`);
}