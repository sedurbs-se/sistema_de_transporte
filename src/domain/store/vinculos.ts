

import { Vinculo } from '@prisma/client';

export interface IVinculoStore {
    vinculos: Vinculo[];
    setVinculos: (vinculos: Vinculo[]) => void;
}

export const initialVinculoState: IVinculoStore = {
    vinculos: [],
    setVinculos: (vinculos: Vinculo[]) => { }
}

export const createVinculoStore = (set: any, get: any, api: any) => ({
    setVinculos: (vinculos: Vinculo[]) => set({ vinculos })
})

