import { api } from "@domain/config/api";



const fetchSetores = async ({ page = 1, limit = 10, nome = '' }) => {
    const { data } = await api.get(`/setor/list?page=${page}&limit=${limit}&nome=${nome}`); 
    return data;
}

export default fetchSetores;