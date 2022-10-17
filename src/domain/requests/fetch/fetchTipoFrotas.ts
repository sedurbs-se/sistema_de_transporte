import { api } from "@domain/config/api";


const fetchTipoFrotas = async () => {
    const { data } = await api.get(`/tipo_frota/list`);
    return data;
}

export default fetchTipoFrotas;