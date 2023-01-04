import { deleteSolicitacao } from "@domain/requests/delete/deleteSolicitacao";
import { AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface IDeleteSolicitacaoDTO {
    id: string;
    onSuccess: () => void;
    onError?: (data: AxiosError) => void;


};

function useDeleteSolicitacao({ onSuccess, onError, id }: IDeleteSolicitacaoDTO) {
    return useQuery('deleteSolicitacao', async () => {
        await deleteSolicitacao({ id })
    }, {
        enabled: true,
        onSuccess,
        onError,
    });
}

export { useDeleteSolicitacao };
export type { IDeleteSolicitacaoDTO }