import { api } from "@domain/config/api";
import { ICreateSetorDTO } from "@domain/query/createSetor";

const createSetor = (params: ICreateSetorDTO["params"]) => {
    return api.post(`/setor`, params);
};

export { createSetor };