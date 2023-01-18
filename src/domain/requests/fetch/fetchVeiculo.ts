import { api } from "@domain/config/api";


const fetchVeiculo = async (id:string) => {
    const { data } = await api.get(`/veiculo?id=${id}`);
    return data;
}

export default fetchVeiculo;