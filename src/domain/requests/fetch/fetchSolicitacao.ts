import { api } from "@domain/config/api";


const fetchSolicitacao = async (id: string) => {
    const { data } = await api.get(`/solicitacao?id=${id}`);
    return data;
}

export default fetchSolicitacao;