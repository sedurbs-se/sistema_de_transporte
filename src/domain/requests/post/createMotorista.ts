import { api } from "@domain/config/api";
import { ICreateMotoristaDTO } from "@domain/query/createMotorista";

const createMotorista = ({ params}: ICreateMotoristaDTO) => {
    return api.put(`/motorista`, { data: { ...params } });
};

export { createMotorista };