

import { TipoFrota } from '@prisma/client';

export interface ITipoFrotaStore {
    tipoFrotas: TipoFrota[];
    setTipoFrotas: (tipoFrotas: TipoFrota[]) => void;
}

export const initialTipoFrotaState: ITipoFrotaStore = {
    tipoFrotas: [],
    setTipoFrotas: (tipoFrotas: TipoFrota[]) => { }
}

export const createTipoFrotaStore = (set: any, get: any, api: any) => ({
    setTipoFrotas: (tipoFrotas: TipoFrota[]) => set({ tipoFrotas })
})

