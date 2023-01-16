import { api } from "@domain/config/api";

interface IDeleteSolicitacaoRequest {
    id?: string;
}

const deleteSolicitacao = ({  id }: IDeleteSolicitacaoRequest) => {
    return api.delete(`/solicitacao?id=${id}`);
};

export { deleteSolicitacao };