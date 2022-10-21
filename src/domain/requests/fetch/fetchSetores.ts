import { api } from "@domain/config/api";


const fetchSetores = async (page: number, limit?: number) => {
    const { data } = await api.get(`/setor/list?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchSetores;