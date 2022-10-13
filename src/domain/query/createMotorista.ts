import { Motorista } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateMotoristaDTO {
    nome: string;
    celular: string;
    telefone: string;
    data_nascimento: string;
    bairro: string;
    endereco: string;
    vinculo: string;
}

interface ICreateMotoristaResponse {
    motorista: Motorista;
}

function createMotorista(params: ICreateMotoristaDTO, onSuccess: (data: ICreateMotoristaResponse) => void): UseQueryResult<ICreateMotoristaResponse> {
    return useQuery('createMotorista', async () => {
        const { data }: AxiosResponse = await axios.post("http://localhost:3000/api/motoristas/create",
            { ...params });
        return data;
    }, {
        enabled: false,
        onSuccess
    });
}

export { createMotorista };
export type { ICreateMotoristaDTO, ICreateMotoristaResponse }