import { retornoMovimentacao } from "@domain/requests/post/retornoMovimentacao";
import { saidaMovimentacao } from "@domain/requests/post/saidaMovimentacao";
import { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { onErrorResponse } from "./createUsuario";

interface IRetornoMovimentacaoDTO {
    params: {
        id: string;
        motorista_id: string,
        veiculos_id: string,
        dtsaida: string,
        dtretorno: string,
        status_id: string,
        observacao: string,
        placa: string;
        quilometragemAtual: number;
        motorista: string
    };
    onSuccess: (data: IRetornoMovimentacaoResponse) => void;
    onError?: (data: onErrorResponse) => void;
    id?: string;

}

interface IRetornoMovimentacaoResponse {

}

function useRetornoMovimentacao({ params, onSuccess, onError }: IRetornoMovimentacaoDTO): UseQueryResult<IRetornoMovimentacaoResponse> {
    return useQuery('createRetorno', async () => {
        const { data }: AxiosResponse = await retornoMovimentacao(params);
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
        refetchOnMount: false,
        retry: false,
    });
}

export { useRetornoMovimentacao };
export type { IRetornoMovimentacaoDTO, IRetornoMovimentacaoResponse }