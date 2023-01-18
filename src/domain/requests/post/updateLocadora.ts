import { api } from "@domain/config/api";
import { ICreateLocadoraDTO } from "@domain/query/createLocadora";

const updateLocadora = (params: ICreateLocadoraDTO["params"], id: string) => {
    return api.put(`/locadora?id=${id}`, params);
};

export { updateLocadora };