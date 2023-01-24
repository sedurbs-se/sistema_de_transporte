import { saidaMovimentacao } from "@domain/requests/post/saidaMovimentacao";
import { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { onErrorResponse } from "./createUsuario";

interface ISaidaMovimentacaoDTO {
    params: {
        solicitacao_id: string;
        motorista_id: string,
        veiculos_id: string,
        dtsaida: string,
        dtretorno: string,
        status_id: string,
        observacao: string,
    };
    onSuccess: (data: ISaidaMovimentacaoResponse) => void;
    onError?: (data: onErrorResponse) => void;
    id?: string;

}

interface ISaidaMovimentacaoResponse {

}

function useSaidaMovimentacao({ params, onSuccess, onError }: ISaidaMovimentacaoDTO): UseQueryResult<ISaidaMovimentacaoResponse> {
    return useQuery('createVeiculo', async () => {
        const { data }: AxiosResponse = await saidaMovimentacao(params);
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
        refetchOnMount: false,
        retry: false,
    });
}

export { useSaidaMovimentacao };
export type { ISaidaMovimentacaoDTO, ISaidaMovimentacaoResponse }