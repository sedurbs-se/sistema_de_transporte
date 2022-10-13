import create from 'zustand'
import { Veiculos } from '../types/Veiculos';

export interface IVeiculosStore {
    veiculos: Veiculos[];
    setVeiculos: (veiculos: Veiculos[]) => void;
}

export const initialVeiculosStoreState: IVeiculosStore = {
    veiculos: [],
    setVeiculos: (veiculos: Veiculos[]) => {},
}

export const createVeiculoStore = (set: any, get: any, api: any) => ({
    veiculos: [],
    setVeiculos: (veiculos: Veiculos[]) => set({ veiculos }),
})

