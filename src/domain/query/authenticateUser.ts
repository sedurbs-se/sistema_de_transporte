import authenticateUser from "@domain/requests/post/authenticateUser";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface IAuthenticateUser {
    login: string;
    password: string;
}

interface IAuthenticateUserResponse {
    token: string;
}

function useAuthenticateUser(params: IAuthenticateUser, onSuccess: (data: IAuthenticateUserResponse) => void): UseQueryResult<IAuthenticateUserResponse> {
    return useQuery('authenticateUser', async () => {
        return await authenticateUser(params)
    }, {
        enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
        onSuccess
    });
}

export { useAuthenticateUser };
export type { IAuthenticateUser, IAuthenticateUserResponse };
