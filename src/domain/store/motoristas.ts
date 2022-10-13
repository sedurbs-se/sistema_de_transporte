
import { Motorista } from '@prisma/client';

export interface IMotoristasStore {
    motoristas: Motorista[] | [];
    setMotoristas: (motoristas: Motorista[]) => void;
    addMotorista: (motorista: Motorista) => void;
}


export const initialMotoristasStoreState: IMotoristasStore = {
    motoristas: [],
    setMotoristas: (motoristas: Motorista[]) => { },
    addMotorista: (motorista: Motorista) => {}
}


export const createMotoristasStore = (set: any, get: any, api: any) => ({
    motoristas: [],
    setMotoristas: (motoristas: Motorista[]) => set({ motoristas }),
    addMotorista: (motorista: Motorista) => set((state: IMotoristasStore) => ({ motoristas: [...state.motoristas, motorista] }))
})
