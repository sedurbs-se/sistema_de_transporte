import { api } from "@domain/config/api";

interface IDeleteMovimentacaoRequest {
    id?: string;
}

const deleteMovimentacao = ({  id }: IDeleteMovimentacaoRequest) => {
    return api.delete(`/movimentacao?id=${id}`);
};

export { deleteMovimentacao };