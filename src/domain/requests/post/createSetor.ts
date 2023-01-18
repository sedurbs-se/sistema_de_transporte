import { api } from "@domain/config/api";
import { ICreateSetorDTO } from "@domain/query/createSetor";

const createSetor = (params: ICreateSetorDTO["params"]) => {
    return api.put(`/setor`, params);
};

export { createSetor };