import { api } from "@domain/config/api";


const fetchVeiculos = async () => {
    const { data } = await api.get(`/veiculo/list`);
    return data;
}

export default fetchVeiculos;