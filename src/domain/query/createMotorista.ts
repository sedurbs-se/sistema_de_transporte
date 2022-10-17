import { createMotorista } from "@domain/requests/post/createMotorista";
import { updateMotorista } from "@domain/requests/post/updateMotorista";
import { Motorista } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateMotoristaDTO {
    params: {
        nome: string;
        celular: string;
        telefone: string;
        data_nascimento: string;
        bairro: string;
        endereco: string;
        vinculo: string;
    };
    onSuccess: (data: ICreateMotoristaResponse) => void;
    id?: string;
}

interface ICreateMotoristaResponse {
    motorista: Motorista;
}


function useCreateMotorista({ params, onSuccess, id }: ICreateMotoristaDTO): UseQueryResult<ICreateMotoristaResponse> {
    return useQuery('createMotorista', async () => {
        const { data }: AxiosResponse =
            id ? await updateMotorista({ params, id }) : await createMotorista({ params });
        return data;
    }, {
        enabled: false,
        onSuccess
    });
}

export { useCreateMotorista };
export type { ICreateMotoristaDTO, ICreateMotoristaResponse }