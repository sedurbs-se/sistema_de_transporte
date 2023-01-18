import { api } from "@domain/config/api";
import { ICreateSetorDTO } from "@domain/query/createSetor";

const updateSetor = (params: ICreateSetorDTO["params"], id: string) => {
    return api.put(`/setor?id=${id}`, params);
};

export { updateSetor };