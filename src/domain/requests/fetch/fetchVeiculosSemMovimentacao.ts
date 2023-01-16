import { api } from "@domain/config/api";


const fetchVeiculosSemMovimentacao = async (page=1, limit=25) => {
    const { data } = await api.get(`/movimentacao/veiculos?page=${page}&limit=${limit}`); 
    return data;
}

export default fetchVeiculosSemMovimentacao;