import { api } from "@domain/config/api";
import { IRetornoMovimentacaoDTO } from "@domain/query/retornoMovimentacao";

const retornoMovimentacao = (params: IRetornoMovimentacaoDTO["params"]) => {
    return api.put(`/movimentacao/${params.id}`, params);
};

export { retornoMovimentacao };