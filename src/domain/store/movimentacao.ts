import { Movimentacao, MovimentacaoStatus, Veiculo, Motorista } from "@prisma/client";

export interface IMovimentacaoStore {
    movimentacoes: Movimentacao[] | [];
    movimentacaoPages: number;
    selectedMovimentacao: Movimentacao & {
        veiculo?: Veiculo | null
        motorista?: Motorista | null      
    } | null;
    statusMovimentacao: MovimentacaoStatus[] | [];

    setSelectedMovimentacao: (selectedMovimentacao?: Movimentacao | string) => void;
    setMovimentacoes: (movimentacoes: Movimentacao[]) => void;
    addMovimentacao: (movimentacao: Movimentacao) => void;
    updateMovimentacao: (movimentacao: Movimentacao) => void;
    removeMovimentacao: (id: string) => void;

    setMovimentacaoStatus: (status: MovimentacaoStatus[]) => void;
}

export const initialMovimentacaoStoreState: IMovimentacaoStore = {
    movimentacoes: [],
    movimentacaoPages: 0,
    selectedMovimentacao: null,
    statusMovimentacao: [],
    setSelectedMovimentacao: (selectedMovimentacao?: Movimentacao | string) => { },
    setMovimentacoes: (movimentacoes: Movimentacao[]) => { },
    addMovimentacao: (movimentacao: Movimentacao) => { },
    updateMovimentacao: (movimentacao: Movimentacao) => { },
    removeMovimentacao: (id: string) => { },

    setMovimentacaoStatus: (status: MovimentacaoStatus[]) => { },

}

export const createMotoristasStore = (set: any, get: any, api: any) => ({
    setSelectedMovimentacao: (selectedMovimentacao?: Movimentacao | string) => set({
        selectedMovimentacao: typeof selectedMovimentacao === 'string' ? get().movimentacoes.find((m: Movimentacao) => m.id === selectedMovimentacao) : selectedMovimentacao
    }),
    updateMovimentacao: (movimentacao: Movimentacao) => {
        const movimentacoes = get().movimentacoes;
        const index = movimentacoes.findIndex((m: Movimentacao) => m.id === movimentacao.id);
        movimentacoes[index] = movimentacao;
        set({ movimentacoes });
    },

    setMovimentacoes: (movimentacoes: Movimentacao[]) => set({ movimentacoes }),

    addMovimentacao: (movimentacao: Movimentacao) => set((state: IMovimentacaoStore) => ({ movimentacoes: [...state.movimentacoes, movimentacao] })),

    removeMovimentacao: (id: string) => set((state: IMovimentacaoStore) => ({ movimentacoes: state.movimentacoes.filter((m: Movimentacao) => m.id !== id) })),

    setMovimentacaoStatus: (status: MovimentacaoStatus[]) => {
        set({ statusMovimentacao: status });
    }
})



