import { api } from "@domain/config/api";
import { ICreateMotoristaDTO, ICreateMotoristaParams } from "@domain/query/createMotorista";

const createMotorista = (params: ICreateMotoristaParams) => {
    return api.post(`/motorista`, { data: { ...params } });
};

export { createMotorista };