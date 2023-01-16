import { saidaMovimentacao } from "@domain/requests/post/saidaMovimentacao";
import { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

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
    id?: string;

}

interface ISaidaMovimentacaoResponse {

}

function useSaidaMovimentacao({ params, onSuccess }: ISaidaMovimentacaoDTO): UseQueryResult<ISaidaMovimentacaoResponse> {
    return useQuery('createVeiculo', async () => {
        const { data }: AxiosResponse = await saidaMovimentacao(params);
        return data;
    }, {
        enabled: false,
        onSuccess,
        refetchOnMount: false,
    });
}

export { useSaidaMovimentacao };
export type { ISaidaMovimentacaoDTO, ISaidaMovimentacaoResponse }