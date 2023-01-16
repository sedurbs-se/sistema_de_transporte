import { api } from "@domain/config/api";

interface IDeleteMotoristaRequest {
    id?: string;
}

const deleteMotorista = ({  id }: IDeleteMotoristaRequest) => {
    return api.delete(`/motorista?id=${id}`);
};

export { deleteMotorista };