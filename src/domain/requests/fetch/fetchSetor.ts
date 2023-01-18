import { api } from "@domain/config/api";


const fetchSetor = async (id:string) => {
    const { data } = await api.get(`/setor?id=${id}`);
    return data;
}

export default fetchSetor;