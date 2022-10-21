import { api } from "@domain/config/api";


const fetchSolicitacao = async (page: number, limit: number) => {
    const { data } = await api.get(`/solicitacao/list?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchSolicitacao;