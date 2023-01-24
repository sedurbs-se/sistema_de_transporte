import { createVeiculo } from "@domain/requests/post/createVeiculo";
import { updateVeiculo } from "@domain/requests/post/updateVeiculo";
import { Veiculo } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { onErrorResponse } from "./createUsuario";

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
    onError?: (error: onErrorResponse) => void;
    id?: string;

}

interface ICreateVeiculoResponse {
    veiculo: Veiculo;
}

function useCreateVeiculo({ params, onSuccess, onError, id }: ICreateVeiculoDTO): UseQueryResult<ICreateVeiculoResponse> {
    return useQuery('createVeiculo', async () => {
        const { data }: AxiosResponse = id ?
            await updateVeiculo(params, id) :
            await createVeiculo(params)
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
        refetchOnMount: false,
        retry: false,
    });
}

export { useCreateVeiculo };
export type { ICreateVeiculoDTO, ICreateVeiculoResponse }