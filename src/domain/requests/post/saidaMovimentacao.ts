import { api } from "@domain/config/api";
import { ISaidaMovimentacaoDTO } from "@domain/query/saidaMovimentacao";

const saidaMovimentacao = (params: ISaidaMovimentacaoDTO["params"]) => {
    return  api.post(`/movimentacao/`, params);
};

export { saidaMovimentacao };