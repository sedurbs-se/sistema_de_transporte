
import { Locadora } from '@prisma/client';

export interface ILocadorasStore {
    locadoras: Locadora[] | [];
    selectedLocadora: Locadora | null;
    locadoraPages: number;
    setSelectedLocadora: (selectedLocadora?: Locadora | string) => void;
    setLocadoras: (locadoras: Locadora[]) => void;
    setLocadoraPages: (locadoraPages: number) => void;
    addLocadora: (locadora: Locadora) => void;
    updateLocadora: (locadora: Locadora) => void;
    removeLocadora: (id: string) => void;
}


export const initialLocadorasStoreState: ILocadorasStore = {
    locadoras: [],
    selectedLocadora: null,
    locadoraPages: 0,
    setSelectedLocadora: (selectedLocadora?: Locadora | string) => { },
    setLocadoras: (locadoras: Locadora[]) => { },
    setLocadoraPages: (locadoraPages: number) => { },
    addLocadora: (locadora: Locadora) => { },
    updateLocadora: (locadora: Locadora) => { },
    removeLocadora: (id: string) => { },
}


export const createLocadorasStore = (set: any, get: any, api: any) => ({
    setSelectedLocadora: (selectedLocadora?: Locadora | string) => set({
        selectedLocadora: typeof selectedLocadora === 'string' ? get().locadoras.find((m: Locadora) => m.id === selectedLocadora) : selectedLocadora
    }),
    updateLocadora: (locadora: Locadora) => {
        const locadoras = get().locadoras;
        const index = locadoras.findIndex((m: Locadora) => m.id === locadora.id);
        locadoras[index] = locadora;
        set({ locadoras });
    },
    setLocadoraPages: (locadoraPages: number) => set({ locadoraPages }),
    setLocadoras: (locadoras: Locadora[]) => set({ locadoras }),
    addLocadora: (locadora: Locadora) => set((state: ILocadorasStore) => ({ locadoras: [...state.locadoras, locadora] })),
    removeLocadora: (id: string) => set((state: ILocadorasStore) => ({ locadoras: state.locadoras.filter((m: Locadora) => m.id !== id) }))
})
