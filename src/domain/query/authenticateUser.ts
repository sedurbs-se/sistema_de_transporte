import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface IAuthenticateUser {
    login: string;
    password: string;
}

interface IAuthenticateUserResponse {
    token: string;
}

function authenticateUser(params: IAuthenticateUser, onSuccess: (data: IAuthenticateUserResponse) => void): UseQueryResult<IAuthenticateUserResponse> {
    return useQuery('authenticateUser', async () => {
        const { data }: AxiosResponse = await axios.post("http://localhost:3000/api/session",
            { ...params });
        return data;
    }, {
        enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
        onSuccess
    });
}

export { authenticateUser };
export type { IAuthenticateUser, IAuthenticateUserResponse };
