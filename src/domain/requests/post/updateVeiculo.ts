import { api } from "@domain/config/api";
import { ICreateVeiculoDTO } from "@domain/query/createVeiculo";

const updateVeiculo = (params: ICreateVeiculoDTO["params"], id: string) => {
    return api.put(`/veiculo?id=${id}`, params);
};

export { updateVeiculo };