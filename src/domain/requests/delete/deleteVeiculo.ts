import { api } from "@domain/config/api";

interface IDeleteVeiculoRequest {
    id?: string;
}

const deleteVeiculo = ({ id }: IDeleteVeiculoRequest) => {
    return api.delete(`/veiculo?id=${id}`);
};

export { deleteVeiculo };