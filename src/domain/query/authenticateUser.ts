import authenticateUser from "@domain/requests/post/authenticateUser";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { onErrorResponse } from "./createUsuario";

interface IAuthenticateUserDTO {
    params: IAuthenticateUser
    onSuccess: (data: IAuthenticateUserResponse) => void;
    onError?: (data: onErrorResponse) => void;
    id?: string;

}

interface IAuthenticateUser {
    login: string;
    password: string;
}

interface IAuthenticateUserResponse {
    token: string;
}

function useAuthenticateUser({
    params,
    onSuccess,
    onError }: IAuthenticateUserDTO): UseQueryResult<IAuthenticateUserResponse> {
    return useQuery('authenticateUser', async () => {
        return await authenticateUser(params)
    }, {
        enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
        onSuccess,
        onError
    });
}

export { useAuthenticateUser };
export type { IAuthenticateUser, IAuthenticateUserResponse };
