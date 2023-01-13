import { api } from "@domain/config/api";
import { AxiosError, AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface IResetUsuarioDTO {
    id: string;
    onSuccess: (data: IResetUsuarioResponse) => void;
    onError?: (data: AxiosError) => void;
}


interface IResetUsuarioResponse {

}


function useResetUsuario({ id, onSuccess, onError }: IResetUsuarioDTO): UseQueryResult<IResetUsuarioResponse> {
    return useQuery('resetUsuario', async () => {
        const { data }: AxiosResponse = await api.post(`/user/reset?id=${id}`)
        return data;
    }, {
        enabled: false,
        onSuccess,
        onError,
    });
}

export { useResetUsuario };
export type { IResetUsuarioDTO, IResetUsuarioResponse }