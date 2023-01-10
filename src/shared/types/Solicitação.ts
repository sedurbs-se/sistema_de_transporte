import { Municipio, Solicitacao as SolicitacaoPrisma, StatusSolicitacao, TipoSolicitacao } from "@prisma/client"


export interface Solicitacao extends SolicitacaoPrisma {
    municipiosolicitacao?: { municipio: Municipio }[]
    statussolicitacao?: StatusSolicitacao
    tiposolicitacao?: TipoSolicitacao
}