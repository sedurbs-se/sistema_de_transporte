import { Setor } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateSetorDTO {
    params: {
        descricao: string;
        sigla: string;
        codigo: string;
        responsavel: string;
        ramal: string;
    };
    onSuccess: (data: ICreateSetorResponse) => void;
    id?: string;

}

interface ICreateSetorResponse {
    setor: Setor;
}


function useCreateSetor({ params, onSuccess, id }: ICreateSetorDTO): UseQueryResult<ICreateSetorResponse> {
    return useQuery('createSetor', async () => {
        const { data }: AxiosResponse =  await axios.post(`http://localhost:3000/api/setor/${id || ''}`,
            { ...params });
        return data;
    }, {
        enabled: false,
        onSuccess
    });
}

export { useCreateSetor};
export type { ICreateSetorDTO, ICreateSetorResponse }