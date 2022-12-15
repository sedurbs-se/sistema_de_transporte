import { Solicitacao } from "@prisma/client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";


interface ICreateSolicitacaoDTO {
    params: {
        usuario: string;
        ramal: string;
        setor: string;
        n_ocupantes: number;
        atividade: string;
        data_saida: Date;
        hora_saida: Date;
        tipo: string;
        status: string; 
        municipios: string[];
        observacao: string
    };
    onSuccess: (data: ICreateSolicitacaoResponse) => void;
    onError?: (data: AxiosError) => void;
    id?: string;

}

interface ICreateSolicitacaoResponse {
    solicitacao: Solicitacao;
}


function useCreateSolicitacao({ params, onSuccess, onError, id }: ICreateSolicitacaoDTO): UseQueryResult<ICreateSolicitacaoResponse> {
    return useQuery('createSolicitacao', async () => {
        const { data }: AxiosResponse = id?
        await axios.put(`http://localhost:3000/api/solicitacao?id=${id}`, { ...params }) : 
        await axios.post(`http://localhost:3000/api/solicitacao`, { ...params });
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
    });
}

export { useCreateSolicitacao};
export type { ICreateSolicitacaoDTO, ICreateSolicitacaoResponse }