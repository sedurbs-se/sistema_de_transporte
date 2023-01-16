import { Veiculo } from '@prisma/client';

export interface IVeiculosStore {
    veiculos: Veiculo[];
    selectedVeiculo: Veiculo | null;
    veiculoPages: number;
    setVeiculos: (veiculos: Veiculo[]) => void;
    setVeiculoPage: (page: number) => void;
    addVeiculo: (veiculo: Veiculo) => void;
    removeVeiculo: (id: string) => void;
    updateVeiculo: (veiculo: Veiculo) => void;
    setSelectedVeiculo: (selectedVeiculo?: Veiculo | string) => void;
}

export const initialVeiculosStoreState: IVeiculosStore = {
    veiculos: [],
    veiculoPages: 1,
    setVeiculos: (veiculos: Veiculo[]) => { },
    setVeiculoPage: (page: number) => { },
    addVeiculo: (veiculo: Veiculo) => { },
    removeVeiculo: (id: string) => { },
    updateVeiculo: (veiculo: Veiculo) => { },
    selectedVeiculo: null,
    setSelectedVeiculo: (selectedVeiculo?: Veiculo | string) => { }
}

export const createVeiculoStore = (set: any, get: any, api: any) => ({
    setVeiculos: (veiculos: Veiculo[]) => set({ veiculos }),
    addVeiculo: (veiculo: Veiculo) => set((state: IVeiculosStore) => ({ veiculos: [...state.veiculos, veiculo] })),
    removeVeiculo: (id: string) => set((state: IVeiculosStore) => ({ veiculos: state.veiculos.filter((v: Veiculo) => v.id !== id) })),
    updateVeiculo: (veiculo: Veiculo) => {
        const veiculos = get().veiculos;
        const index = veiculos.findIndex((v: Veiculo) => v.id === veiculo.id);
        veiculos[index] = veiculo;
        set({ veiculos });
    },
    setVeiculoPage: (page: number) => set({ veiculoPages: page }),
    setSelectedVeiculo: (selectedVeiculo?: Veiculo | string) => set({
        selectedVeiculo: typeof selectedVeiculo === 'string' ? get().veiculos.find((v: Veiculo) => v.id === selectedVeiculo) : selectedVeiculo
    })
})

