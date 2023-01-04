import { createSolicitacao } from "@domain/requests/post/createSolicitacao";
import { updateSolicitacao } from "@domain/requests/post/updateSolicitacao";
import { Solicitacao } from "@prisma/client";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";


interface ICreateSolicitacaoDTO {
    params: {
        usuario: string;
        ramal: string;
        num_ocupantes: number;
        atividade: string;
        data_hora_saida: string;
        tipo_solicitacao: string;
        status_solicitacao: string;
        setor: string;
        municipios: string[];
        observacao: string;
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
        const { data }: AxiosResponse = !id ?
            await createSolicitacao(params) :
            await updateSolicitacao({ params, id })
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
    });
}

export { useCreateSolicitacao };
export type { ICreateSolicitacaoDTO, ICreateSolicitacaoResponse }