import { api } from "@domain/config/api";
import { IAuthenticateUser, IAuthenticateUserResponse } from "@domain/query/authenticateUser";
import { AxiosResponse } from "axios";


const authenticateUser = async (params: IAuthenticateUser): Promise<IAuthenticateUserResponse> => {
    const { data }: AxiosResponse = await api.post("/session", params);
    return data;
}

export default authenticateUser;