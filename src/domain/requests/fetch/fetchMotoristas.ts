import { api } from "@domain/config/api";


const fetchMotoristas = async (page: number, limit: number) => {
    const { data } = await api.get(`/motorista/list?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchMotoristas;