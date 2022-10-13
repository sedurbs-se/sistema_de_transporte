
import { Motorista } from '@prisma/client';

export interface IMotoristasStore {
    motoristas: Motorista[] | [];
    setMotoristas: (motoristas: Motorista[]) => void;
}


export const initialMotoristasStoreState: IMotoristasStore = {
    motoristas: [],
    setMotoristas: (motoristas: Motorista[]) => { },
}


export const createMotoristasStore = (set: any, get: any, api: any) => ({
    motoristas: [],
    setMotoristas: (motoristas: Motorista[]) => set({ motoristas }),
})
