import { api } from "@domain/config/api";
import { ICreateLocadoraDTO } from "@domain/query/createLocadora";

const createLocadora = (params:  ICreateLocadoraDTO["params"]) => {
    return api.post(`/locadora`, params);
};

export { createLocadora };