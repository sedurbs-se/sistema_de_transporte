import { Locadora } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateLocadoraDTO {
    params: {
        descricao: string;
        sigla: string;
        telefone: string;
        bairro: string;
        endereco: string;
    };
    onSuccess: (data: ICreateLocadoraResponse) => void;
    id?: string;

}

interface ICreateLocadoraResponse {
    locadora: Locadora;
}


function useCreateLocadora({ params, onSuccess, id }: ICreateLocadoraDTO): UseQueryResult<ICreateLocadoraResponse> {
    return useQuery('createLocadora', async () => {
        const { data }: AxiosResponse =  await axios.post(`http://localhost:3000/api/locadora/${id || ''}`,
            { ...params });
        return data;
    }, {
        enabled: false,
        onSuccess
    });
}

export { useCreateLocadora};
export type { ICreateLocadoraDTO, ICreateLocadoraResponse }