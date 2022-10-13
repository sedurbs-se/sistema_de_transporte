import { Motorista } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useQuery, UseQueryResult } from "react-query";

interface ICreateMotorista {
    nome: string;
    celular: string;
    telefone: string;
    data_nascimento: string;
    bairro: string;
    endereco: string;
    vinculo: string;
}

function createMotorista(params: ICreateMotorista): UseQueryResult<Motorista> {
    return useQuery('createMotorista', async () => {
        const response: AxiosResponse = await axios.post("http://localhost:3000/api/motoristas/create", 
        { ...params });
        return response;
    }, { enabled: false });
}

export { createMotorista };