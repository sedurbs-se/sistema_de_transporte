import { api } from "@domain/config/api";


const fetchMotoristas = async (page=1, limit=10) => {
    const { data } = await api.get(`/motorista/list?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchMotoristas;