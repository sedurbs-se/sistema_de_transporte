import { api } from "@domain/config/api";
import { ICreateSolicitacaoDTO } from "@domain/query/createSolicitacao";

const createSolicitacao = (params:  ICreateSolicitacaoDTO["params"]) => {
    return api.post(`/solicitacao`, params);
};

export { createSolicitacao };