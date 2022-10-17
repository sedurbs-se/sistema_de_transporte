import { api } from "@domain/config/api";


const fetchSetores = async () => {
    const { data } = await api.get(`/setor/list`);
    return data;
}

export default fetchSetores;