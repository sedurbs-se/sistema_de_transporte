import { api } from "@domain/config/api";


const fetchStatusSolicitacao = async () => {
    const { data } = await api.get(`/solicitacao/status`);
    return data;
}

export default fetchStatusSolicitacao;