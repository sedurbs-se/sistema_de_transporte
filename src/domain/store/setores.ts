import { Setor } from "@prisma/client"

export interface ISetoresStore {
    setores: Setor[] | [];
    setoresSearch: Setor[] | [];
    setorPages: number;
    selectedSetor: Setor | null;
    selectedSetorSearch: Setor | null;
    setSelectedSetor: (selectedSetor?: Setor | string) => void;
    setSelectedSetorSearch: (selectedSetor?: Setor | string) => void;
    setSetorPages: (setorPages: number) => void;
    setSetores: (setores: Setor[]) => void;
    addSetor: (setor: Setor) => void;
    updateSetor: (setor: Setor) => void;
    removeSetor: (id: string) => void;
}


export const initialSetoresStoreState: ISetoresStore = {
    setores: [],
    setoresSearch: [],
    setorPages: 0,
    selectedSetor: null,
    selectedSetorSearch: null,
    setSelectedSetor: (selectedSetor?: Setor | string) => { },
    setSelectedSetorSearch: (selectedSetor?: Setor | string) => { },
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
    setSelectedSetorSearch: (selectedSetor?: Setor | string) => set({
        selectedSetorSearch: typeof selectedSetor === 'string' ? get().setoresSearch.find((m: Setor) => m.id === selectedSetor) : selectedSetor
    }),
    setSetorPages: (setorPages: number) => set({ setorPages }),
    updateSetor: (setor: Setor) => {
        const setores = get().setores;
        const index = setores.findIndex((m: Setor) => m.id === setor.id);
        setores[index] = setor;
        set({ setores });
    },
    setSetores: (setores: Setor[]) => {set({ setores })},
    setSetoresSearch: (setores: Setor[]) => {
        const stateSetores = get().setoresSearch;

        const newSetores = setores.filter(
            (s: Setor) => !stateSetores.find((ss: Setor) => ss.id === s.id));

        set({ setoresSearch: [...stateSetores, ...newSetores] })
    },
    addSetor: (setor: Setor) => set((state: ISetoresStore) => ({ setores: [...state.setores, setor] })),
    removeSetor: (id: string) => set((state: ISetoresStore) => ({ setores: state.setores.filter((m: Setor) => m.id !== id) }))
})
