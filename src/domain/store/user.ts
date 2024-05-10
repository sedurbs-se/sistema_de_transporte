
import { decode } from 'jsonwebtoken';
import { Usuario } from '../../shared/types/Usuario'
import nookies from "nookies"
import { GetServerSidePropsContext } from 'next';
import { TipoUsuario } from '@prisma/client';

export interface IUserStore {
    user: Usuario | null;
    tiposUsuario: TipoUsuario[]
    usuarios: Usuario[];
    setUser: (user: Usuario) => void;
    createSession: (token: string) => Promise<void>;
    deleteSession: () => void;
    verifySession: (context: GetServerSidePropsContext) => boolean;
    isAuthenticated: boolean;
    setUsuarios: (usuarios: Usuario[]) => void;
    setTiposUsuario: (tiposUsuario: TipoUsuario[]) => void;
}

export const initialUserStoreState: IUserStore = {
    user: null,
    usuarios: [],
    tiposUsuario: [],
    setUser: (user: Usuario) => { },
    createSession: async (token: string) => { },
    deleteSession: async () => { },
    verifySession: (context: GetServerSidePropsContext) => false,
    isAuthenticated: false,

    setUsuarios: (usuarios: Usuario[]) => { },
    setTiposUsuario: (tiposUsuario: TipoUsuario[]) => { },
}

export const createUserStore = (set: any, get: any, api: any) => ({
    setUser: (user: Usuario) => set({ user, isAuthenticated: true }),
    createSession: async (token: string) => {

        console.log('token', token)

        nookies.set(undefined, 'token', token, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60
        })

        const { user } = decode(token) as { user: Usuario };

        set({ user, isAuthenticated: true })
    },
    deleteSession: async () => {
        nookies.destroy(undefined, 'token', {
            path: "/",
        })

        set({ user: {}, isAuthenticated: false })
    },
    verifySession: async (context: GetServerSidePropsContext) => {
        const { token } = nookies.get(context, "token")

        if (token) {
            const { user } = decode(token) as { user: Usuario };

            set({ user, isAuthenticated: true })

            return user;
        }

        set({ user: {}, isAuthenticated: false })

        return null;
    },
    setUsuarios: (usuarios: Usuario[]) => set({ usuarios }),
    setTiposUsuario: (tiposUsuario: TipoUsuario[]) => set({ tiposUsuario }),
})





