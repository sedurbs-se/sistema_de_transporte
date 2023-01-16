
import { Motorista } from '@prisma/client';

export interface IMotoristasStore {
    motoristas: Motorista[] | [];
    motoristaPages: number;
    selectedMotorista: Motorista | null;
    setSelectedMotorista: (selectedMotorista?: Motorista | string) => void;
    setMotoristas: (motoristas: Motorista[]) => void;
    setMotoristaPages: (motoristaPages: number) => void;
    addMotorista: (motorista: Motorista) => void;
    updateMotorista: (motorista: Motorista) => void;
    removeMotorista: (id: string) => void;
}


export const initialMotoristasStoreState: IMotoristasStore = {
    motoristas: [],
    motoristaPages: 0,
    selectedMotorista: null,
    setSelectedMotorista: (selectedMotorista?: Motorista | string) => { },
    setMotoristas: (motoristas: Motorista[]) => { },
    addMotorista: (motorista: Motorista) => { },
    setMotoristaPages: (motoristaPages: number) => { },
    updateMotorista: (motorista: Motorista) => { },
    removeMotorista: (id: string) => { },
}


export const createMotoristasStore = (set: any, get: any, api: any) => ({
    setSelectedMotorista: (selectedMotorista?: Motorista | string) => set({
        selectedMotorista: typeof selectedMotorista === 'string' ? get().motoristas.find((m: Motorista) => m.id === selectedMotorista) : selectedMotorista
    }),
    updateMotorista: (motorista: Motorista) => {
        const motoristas = get().motoristas;
        const index = motoristas.findIndex((m: Motorista) => m.id === motorista.id);
        motoristas[index] = motorista;
        set({ motoristas });
    },
    setMotoristaPages: (motoristaPages: number) => set({ motoristaPages }),
    setMotoristas: (motoristas: Motorista[]) => set({ motoristas }),
    addMotorista: (motorista: Motorista) => set((state: IMotoristasStore) => ({ motoristas: [...state.motoristas, motorista] })),
    removeMotorista: (id: string) => set((state: IMotoristasStore) => ({ motoristas: state.motoristas.filter((m: Motorista) => m.id !== id) }))
})
