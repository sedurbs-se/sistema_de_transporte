import { Setor } from "@prisma/client"

export interface ISetoresStore {
    setores: Setor[] | [];
    setorPages: number;
    selectedSetor: Setor | null;
    setSelectedSetor: (selectedSetor?: Setor | string) => void;
    setSetorPages: (setorPages: number) => void;
    setSetores: (setores: Setor[]) => void;
    addSetor: (setor: Setor) => void;
    updateSetor: (setor: Setor) => void;
    removeSetor: (id: string) => void;
}


export const initialSetoresStoreState: ISetoresStore = {
    setores: [],
    setorPages: 0,
    selectedSetor: null,
    setSelectedSetor: (selectedSetor?: Setor | string) => { },
    setSetorPages: (setorPages: number) => { },
    setSetores: (setores: Setor[]) => { },
    addSetor: (setor: Setor) => { },
    updateSetor: (setor: Setor) => { },
    removeSetor: (id: string) => { },
}


export const createSetoresStore = (set: any, get: any, api: any) => ({
    setSelectedSetor: (selectedSetor?: Setor | string) => set({
        selectedSetor: typeof selectedSetor === 'string' ? get().setores.find((m: Setor) => m.id === selectedSetor) : selectedSetor
    }),
    setSetorPages: (setorPages: number) => set({ setorPages }),
    updateSetor: (setor: Setor) => {
        const setores = get().setores;
        const index = setores.findIndex((m: Setor) => m.id === setor.id);
        setores[index] = setor;
        set({ setores });
    },
    setSetores: (setores: Setor[]) => set({ setores }),
    addSetor: (setor: Setor) => set((state: ISetoresStore) => ({ setores: [...state.setores, setor] })),
    removeSetor: (id: string) => set((state: ISetoresStore) => ({ setores: state.setores.filter((m: Setor) => m.id !== id) }))
})