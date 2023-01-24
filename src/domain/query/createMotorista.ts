import { createMotorista } from "@domain/requests/post/createMotorista";
import { updateMotorista } from "@domain/requests/post/updateMotorista";
import { Motorista } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { onErrorResponse } from "./createUsuario";

interface ICreateMotoristaParams {
        nome: string;
        celular: string;
        telefone: string;
        data_nascimento: string;
        bairro: string;
        endereco: string;
        vinculo_id: string;
}

interface IUpdateMotoristaParams {
    params: {
        nome: string;
        celular: string;
        telefone: string;
        data_nascimento: string;
        bairro: string;
        endereco: string;
        vinculo_id: string;
    };
    id?: string;
}

interface ICreateMotoristaDTO {
    params: {
        nome: string;
        celular: string;
        telefone: string;
        data_nascimento: string;
        bairro: string;
        endereco: string;
        vinculo_id: string;
    };
    onSuccess: (data: ICreateMotoristaResponse) => void;
    onError?: (data: onErrorResponse) => void;
    id?: string;
}

interface ICreateMotoristaResponse {
    motorista: Motorista;
}


function useCreateMotorista({ params, onSuccess,onError, id }: ICreateMotoristaDTO): UseQueryResult<ICreateMotoristaResponse> {
    return useQuery('createMotorista', async () => {
        const { data }: AxiosResponse =
            id ? await updateMotorista({params, id }) : await createMotorista({...params});
        return data;
    }, {
        enabled: false,
        retry: false,
        onSuccess,
        onError
    });
}

export { useCreateMotorista };
export type { ICreateMotoristaDTO, ICreateMotoristaResponse, ICreateMotoristaParams, IUpdateMotoristaParams}