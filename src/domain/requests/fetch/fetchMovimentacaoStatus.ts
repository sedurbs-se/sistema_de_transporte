
import { api } from "@domain/config/api";

const fetchMovimentacaoStatus = async (page=1, limit=10) => {
    const { data } = await api.get(`/movimentacao/status`); 
    return data;
}

export default fetchMovimentacaoStatus;