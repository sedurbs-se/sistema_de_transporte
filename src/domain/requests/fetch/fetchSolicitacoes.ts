import { api } from "@domain/config/api";


const fetchSolicitacoes = async (page = 1, limit = 10) => {
    const { data } = await api.get(`/solicitacao/list?page=${page}&limit=${limit}`);
    return data;
}

export default fetchSolicitacoes;