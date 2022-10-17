import { api } from "@domain/config/api";
import { ICreateMotoristaDTO } from "@domain/query/createMotorista";

const updateMotorista = ({ params, id }: ICreateMotoristaDTO) => {
    return api.put(`/motorista?id=${id}`, { data: { ...params } });
};

export { updateMotorista };