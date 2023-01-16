import { api } from "@domain/config/api";


const fetchLocadoras = async (page: number, limit?: number) => {
    const { data } = await api.get(`/locadora/list?page=${page}&limit=${limit}`);
    return data;
}

export default fetchLocadoras;