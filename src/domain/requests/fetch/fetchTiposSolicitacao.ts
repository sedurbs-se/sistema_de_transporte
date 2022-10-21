import { api } from "@domain/config/api";


const fetchTiposSolicitacao = async () => {
    const { data } = await api.get(`/solicitacao/tipos`);
    return data;
}

export default fetchTiposSolicitacao;