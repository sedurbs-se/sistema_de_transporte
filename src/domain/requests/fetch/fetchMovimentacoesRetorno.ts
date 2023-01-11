
import { api } from "@domain/config/api";

const fetchMovimentacaoRetorno = async (page=1, limit=10) => {
    const { data } = await api.get(`/movimentacao/list`); 
    return data;
}

export default fetchMovimentacaoRetorno;