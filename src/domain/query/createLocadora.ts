import { createLocadora } from "@domain/requests/post/createLocadora";
import { updateLocadora } from "@domain/requests/post/updateLocadora";
import { Locadora } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { onErrorResponse } from "./createUsuario";

interface ICreateLocadoraDTO {
    params: {
        nome: string;
        sigla: string;
        telefone: string;
        bairro: string;
        endereco: string;
    };
    onSuccess: (data: ICreateLocadoraResponse) => void;
    onError?: (data: onErrorResponse) => void;
    id?: string;

}

interface ICreateLocadoraResponse {
    locadora: Locadora;
}


function useCreateLocadora({ params, onSuccess, onError, id }: ICreateLocadoraDTO): UseQueryResult<ICreateLocadoraResponse> {
    return useQuery('createLocadora', async () => {
        const { data }: AxiosResponse = id ?
            await updateLocadora(params, id) :
            await createLocadora(params);
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
        retry: false,
    });
}

export { useCreateLocadora };
export type { ICreateLocadoraDTO, ICreateLocadoraResponse }