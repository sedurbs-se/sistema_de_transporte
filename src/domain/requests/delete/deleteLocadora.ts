import { api } from "@domain/config/api";

interface IDeleteLocadoraRequest {
    id?: string;
}

const deleteLocadora = ({  id }: IDeleteLocadoraRequest) => {
    return api.delete(`/locadora?id=${id}`);
};

export { deleteLocadora };