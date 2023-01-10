import { api } from "@domain/config/api";


const fetchMotoristasSemMovimentacao = async (page=1, limit=10) => {
    const { data } = await api.get(`/movimentacao/motoristas/`); 
    return data;
}

export default fetchMotoristasSemMovimentacao;