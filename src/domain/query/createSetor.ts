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
        const { data }: AxiosResponse = id?
        await axios.put(`http://localhost:3000/api/setor?id=${id}`, { ...params }) : 
        await axios.post(`http://localhost:3000/api/setor`, { ...params });
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
    });
}

export { useCreateSetor};
export type { ICreateSetorDTO, ICreateSetorResponse }