import { api } from "@domain/config/api";
import { ICreateVeiculoDTO } from "@domain/query/createVeiculo";

const createVeiculo = (params: ICreateVeiculoDTO["params"]) => {
    return api.post(`/veiculo`, params);
};

export { createVeiculo };