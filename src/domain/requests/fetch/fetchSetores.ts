import { api } from "@domain/config/api";


const fetchSetores = async (page=1, limit=10) => {
    const { data } = await api.get(`/setor/list?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchSetores;