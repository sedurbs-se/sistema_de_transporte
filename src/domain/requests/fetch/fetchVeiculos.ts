import { api } from "@domain/config/api";


const fetchVeiculos = async (page: number, limit: number) => {
    const { data } = await api.get(`/veiculo/list?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchVeiculos;