import { api } from "@domain/config/api";


const fetchSolicitacao = async () => {
    const { data } = await api.get(`/solicitacao/list`);
    return data;
}

export default fetchSolicitacao;