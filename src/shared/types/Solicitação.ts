import { Municipio, Solicitacao as SolicitacaoPrisma, StatusSolicitacao, TipoSolicitacao } from "@prisma/client"


export interface Solicitacao extends  SolicitacaoPrisma{
    municipiosolicitacao?: Municipio[]
    statussolicitacao?: StatusSolicitacao
    tiposolicitacao?: TipoSolicitacao
}