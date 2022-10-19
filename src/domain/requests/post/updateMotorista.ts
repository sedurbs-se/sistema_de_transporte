import { api } from "@domain/config/api";
import { ICreateMotoristaDTO, IUpdateMotoristaParams } from "@domain/query/createMotorista";

const updateMotorista = ({ params, id }: IUpdateMotoristaParams) => {
    return api.put(`/motorista?id=${id}`, { data: { ...params } });
};

export { updateMotorista };