import { api } from "@domain/config/api";
import { ICreateSolicitacaoDTO } from "@domain/query/createSolicitacao";

interface IUpdateSolicitacaoRequest {
    params: ICreateSolicitacaoDTO["params"];
    id?: string;
}

const updateSolicitacao = ({ params, id }: IUpdateSolicitacaoRequest) => {
    return api.post(`/solicitacao?id=${id}`, params);
};

export { updateSolicitacao };