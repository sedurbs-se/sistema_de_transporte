import { api } from "@domain/config/api";
import { Usuario } from "@shared/types/Usuario";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateUsuarioDTO {
    params: {
        tipo_id: string;
        nome: string;
        login: string;
        password: string;
    },
    id?: string;
    onSuccess: (data: ICreateUsuarioResponse) => void;
    onError?: (data: AxiosError) => void;
}


interface ICreateUsuarioResponse {
    user?: Usuario
}


function useCreateUsuario({ params, id, onSuccess, onError }: ICreateUsuarioDTO): UseQueryResult<ICreateUsuarioResponse> {
    return useQuery('createSetor', async () => {
        const { data }: AxiosResponse = id ?
            await api.put(`/user/create?id=${id}`, params) :
            await api.post("/user/create", params)
        return data as ICreateUsuarioResponse;
    }, {
        enabled: false,
        onSuccess,
        onError,
    });
}

export { useCreateUsuario };
export type { ICreateUsuarioDTO, ICreateUsuarioResponse }