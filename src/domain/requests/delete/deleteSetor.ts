import { api } from "@domain/config/api";

interface IDeleteSetorRequest {
    id?: string;
}

const deleteSetor = ({  id }: IDeleteSetorRequest) => {
    return api.delete(`/setor?id=${id}`);
};

export { deleteSetor };