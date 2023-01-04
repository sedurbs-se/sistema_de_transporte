import { Veiculo } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateVeiculoDTO {
    params: {
        placa: string,
        nome: string,
        componentes: string,
        quilometragemAtual: number
        quilometragemInicial: number,
        tipo_frota_id: string,
        locadora_id: string,
        setor_id: string,
        observacao: string
    };
    onSuccess: (data: ICreateVeiculoResponse) => void;
    id?: string;

}

interface ICreateVeiculoResponse {
    veiculo: Veiculo;
}

function useCreateVeiculo({ params, onSuccess, id }: ICreateVeiculoDTO): UseQueryResult<ICreateVeiculoResponse> {
    return useQuery('createVeiculo', async () => {
        const { data }: AxiosResponse = id?
        await axios.put(`http://localhost:3000/api/veiculo?id=${id}`, { ...params }) : 
        await axios.post(`http://localhost:3000/api/veiculo`, { ...params });
        return data;
    }, {
        onSuccess
    });
}

export { useCreateVeiculo };
export type { ICreateVeiculoDTO, ICreateVeiculoResponse }