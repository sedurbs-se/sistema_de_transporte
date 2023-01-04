import { Solicitacao, StatusSolicitacao, TipoSolicitacao } from "@prisma/client"

export interface ISolicitacaoStore {
    solicitacoes: Solicitacao[]
    setSolicitacoes: (solicitacoes: Solicitacao[]) => void

    selectedSolicitacao: Solicitacao | null
    setSelectedSolicitacao: (solicitacao?: Solicitacao) => void

    addSolictacao: (solicitacao: Solicitacao) => void
    updateSolicitacao: (solicitacao: Solicitacao) => void

    tiposSolcitacao: TipoSolicitacao[]
    setTiposSolicitacao: (tiposSolicitacao: TipoSolicitacao[]) => void

    statusSolicitacao: StatusSolicitacao[]
    setStatusSolicitacao: (statusSolicitacao: StatusSolicitacao[]) => void
}

export const initialSolicitacaoState: ISolicitacaoStore = {
    solicitacoes: [],
    setSolicitacoes: () => { },
    selectedSolicitacao: null,
    setSelectedSolicitacao: () => { },
    addSolictacao: () => { },
    updateSolicitacao: () => { },
    tiposSolcitacao: [],
    setTiposSolicitacao: () => { },
    statusSolicitacao: [],
    setStatusSolicitacao: () => { },
}

export const createSolicitacaoStore = (set: any, get: any, api: any) => ({
    setSolicitacoes: (solicitacoes: Solicitacao[]) => set({ solicitacoes }),
    addSolictacao: (solicitacao: Solicitacao) => set((state: ISolicitacaoStore) => ({ solicitacoes: [...state.solicitacoes, solicitacao] })),
    updateSolicitacao: (solicitacao: Solicitacao) => {
        const solicitacoes = get().solicitacoes;
        const index = solicitacoes.findIndex((s: Solicitacao) => s.id === solicitacao.id);
        solicitacoes[index] = solicitacao;
        set({ solicitacoes });
    },
    setSelectedSolicitacao: (solicitacao?: Solicitacao) => set({ selectedSolicitacao: solicitacao }),
    setTiposSolicitacao: (tiposSolicitacao: TipoSolicitacao[]) => set({ tiposSolicitacao }),
    setStatusSolicitacao: (statusSolicitacao: StatusSolicitacao[]) => set({ statusSolicitacao }),
})

