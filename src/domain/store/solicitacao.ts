import { Solicitacao, StatusSolicitacao, TipoSolicitacao } from "@prisma/client"

export interface ISolicitacaoStore {
    solicitacoes: Solicitacao[]
    setSolicitacoes: (solicitacoes: Solicitacao[]) => void

    tiposSolcitacao: TipoSolicitacao[]
    setTiposSolicitacao: (tiposSolicitacao: TipoSolicitacao[]) => void

    statusSolicitacao: StatusSolicitacao[]
    setStatusSolicitacao: (statusSolicitacao: StatusSolicitacao[]) => void
}

export const initialSolicitacaoState: ISolicitacaoStore = {
    solicitacoes: [],
    setSolicitacoes: () => {},
    tiposSolcitacao: [],
    setTiposSolicitacao: () => {},
    statusSolicitacao: [],
    setStatusSolicitacao: () => {},
}

export const createSolicitacaoStore = (set: any, get: any, api: any) => ({
    setSolicitacoes: (solicitacoes: Solicitacao[]) => set({ solicitacoes }),
    setTiposSolicitacao: (tiposSolicitacao: TipoSolicitacao[]) => set({ tiposSolicitacao }),
    setStatusSolicitacao: (statusSolicitacao: StatusSolicitacao[]) => set({ statusSolicitacao }),
})

