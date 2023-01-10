import { api } from "@domain/config/api";

const fetchSolicitacoesAutorizadas = async (page=1, limit=10) => {
    const { data } = await api.get(`/movimentacao/solicitacoes?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchSolicitacoesAutorizadas;