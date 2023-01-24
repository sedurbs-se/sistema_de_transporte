import { deleteSolicitacao } from "@domain/requests/delete/deleteSolicitacao";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { onErrorResponse } from "./createUsuario";

interface IDeleteSolicitacaoDTO {
    id: string;
    onSuccess: () => void;
    onError?: (data: onErrorResponse) => void;


};

function useDeleteSolicitacao({ onSuccess, onError, id }: IDeleteSolicitacaoDTO) {
    return useQuery('deleteSolicitacao', async () => {
        await deleteSolicitacao({ id })
    }, {
        enabled: false,
        onSuccess,
        onError,
        retry: false,
    });
}

export { useDeleteSolicitacao };
export type { IDeleteSolicitacaoDTO }