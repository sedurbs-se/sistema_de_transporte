import { api } from "@domain/config/api";


const fetchMotoristas = async ({ page = 1, limit = 10, nome = '' }) => {
    const { data } = await api.get(`/motorista/list?page=${page}&limit=${limit}&nome=${nome}`);
    return data;
}

export default fetchMotoristas;