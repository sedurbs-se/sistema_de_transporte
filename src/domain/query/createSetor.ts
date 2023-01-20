import { createSetor } from "@domain/requests/post/createSetor";
import { updateSetor } from "@domain/requests/post/updateSetor";
import { Setor } from "@prisma/client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";


interface ICreateSetorDTO {
    params: {
        nome: string;
        sigla: string;
        codigo: string;
        responsavel: string;
        ramal: string;
    };
    onSuccess: (data: ICreateSetorResponse) => void;
    onError?: (data: AxiosError) => void;
    id?: string;

}

interface ICreateSetorResponse {
    setor: Setor;
}


function useCreateSetor({ params, onSuccess, onError, id }: ICreateSetorDTO): UseQueryResult<ICreateSetorResponse> {
    return useQuery('createSetor', async () => {
        const { data }: AxiosResponse = id ?
            await updateSetor(params, id) :
            await createSetor(params);
        return data;
    }, {
        enabled: false,
        onSuccess,
        refetchOnMount: false,
        onError,
    });
}

export { useCreateSetor };
export type { ICreateSetorDTO, ICreateSetorResponse }