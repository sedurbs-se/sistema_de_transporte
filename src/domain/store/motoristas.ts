import { Motorista } from "@shared/types/Motorista";


export interface IMotoristasStore {
    motoristas: Motorista[] | [];
    motoristasSearch: Motorista[] | [];
    motoristaPages: number;
    selectedMotorista: Motorista | undefined;
    setSelectedMotoristaSearch: (selectedMotorista?: Motorista | string) => void;
    setSelectedMotorista: (selectedMotorista?: Motorista | string) => void;
    selectedMotoristaSearch: Motorista | undefined;
    setMotoristas: (motoristas: Motorista[]) => void;
    setMotoristaPages: (motoristaPages: number) => void;
    addMotorista: (motorista: Motorista) => void;
    updateMotorista: (motorista: Motorista) => void;
    removeMotorista: (id: string) => void;
}


export const initialMotoristasStoreState: IMotoristasStore = {
    motoristas: [],
    motoristasSearch: [],
    motoristaPages: 0,
    selectedMotorista: undefined,
    selectedMotoristaSearch: undefined,
    setSelectedMotorista: (selectedMotorista?: Motorista | string) => { },
    setSelectedMotoristaSearch: (selectedMotorista?: Motorista | string) => { },
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
    setSelectedMotoristaSearch: (selectedMotorista?: Motorista | string) => set({
        selectedMotoristaSearch: typeof selectedMotorista === 'string' ? get().motoristasSearch.find((m: Motorista) => m.id === selectedMotorista) : selectedMotorista
    }),
    updateMotorista: (motorista: Motorista) => {
        const motoristas = get().motoristas;

        const index = motoristas.findIndex((m: Motorista) => m.id === motorista.id);
        motoristas[index] = motorista;

        set({ motoristas });

    },
    setMotoristaPages: (motoristaPages: number) => set({ motoristaPages }),
    setMotoristas: (motoristas: Motorista[]) => { set({ motoristas }) },
    setMotoristasSearch: (motoristas: Motorista[]) => { 
        const stateMotoristas = get().motoristasSearch;

        const newMotoristas = motoristas.filter(
            (m: Motorista) => !stateMotoristas.find((sm: Motorista) => sm.id === m.id));

        set({ motoristasSearch: [...stateMotoristas, ...newMotoristas] })
    },
    addMotorista: (motorista: Motorista) => set((state: IMotoristasStore) => ({ motoristas: [...state.motoristas, motorista] })),
    removeMotorista: (id: string) => set((state: IMotoristasStore) => ({ motoristas: state.motoristas.filter((m: Motorista) => m.id !== id) }))
})
