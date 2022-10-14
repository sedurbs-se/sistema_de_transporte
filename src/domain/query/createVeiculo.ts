import { Veiculo } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateVeiculoDTO {
    params: {

    };
    onSuccess: (data: ICreateVeiculoResponse) => void;
    id?: string;

}

interface ICreateVeiculoResponse {
    veiculo: Veiculo;
}

function createVeiculo({ params, onSuccess, id }: ICreateVeiculoDTO): UseQueryResult<ICreateVeiculoResponse> {
    return useQuery('createVeiculo', async () => {
        const { data }: AxiosResponse = await axios.post(`http://localhost:3000/api/veiculo/${id}`,
            { ...params });
        return data;
    }, {
        enabled: false,
        onSuccess
    });
}

export { createVeiculo };
export type { ICreateVeiculoDTO, ICreateVeiculoResponse }