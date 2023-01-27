import { Veiculo as VeiculoPrisma } from "@prisma/client"


export interface Veiculo extends VeiculoPrisma {
    id: string;
    placa: string;
    descricao: string;
    componentes: string;
    tipo_frota_id: string;
    locadora_id: string;
    setor_id: string;
    observacao:string;
}