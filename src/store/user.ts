
import { Usuario } from '../domain/types/Usuario'

export interface IUserStore {
    user: Usuario | {};
    setUser: (user: Usuario) => void;
    isAuthenticated: boolean;
}

export const initialUserStoreState: IUserStore = {
    user: {},
    setUser: (user: Usuario) => { },
    isAuthenticated: false,
}


export const createUserStore = (set: any, get: any, api: any) => ({
    user: {},
    setUser: (user: Usuario) => set({ user }),
    isAuthenticated: false,
})





