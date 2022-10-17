import { api } from "@domain/config/api";


const fetchVinculos = async () => {
    const { data } = await api.get(`/vinculo/list`);
    return data;
}

export default fetchVinculos;