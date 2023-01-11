import { api } from "@domain/config/api";


const fetchMovimentacao = async (id: string) => {
    const { data } = await api.get(`/movimentacao?id=${id}`);
    return data;
}

export default fetchMovimentacao;