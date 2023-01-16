import { api } from "@domain/config/api";


const fetchVeiculos = async (page=1, limit=10) => {
    const { data } = await api.get(`/veiculo/list?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchVeiculos;