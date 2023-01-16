import { api } from "@domain/config/api";
import { ICreateMotoristaDTO, ICreateMotoristaParams } from "@domain/query/createMotorista";

const createMotorista = (params: ICreateMotoristaParams) => {
    return api.post(`/motorista`, params);
};

export { createMotorista };