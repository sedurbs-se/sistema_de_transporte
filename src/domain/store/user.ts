
import { decode } from 'jsonwebtoken';
import { Usuario } from '../../shared/types/Usuario'
import nookies from "nookies"
import { GetServerSidePropsContext } from 'next';

export interface IUserStore {
    user: Usuario | {};
    setUser: (user: Usuario) => void;
    createSession: (token: string) => Promise<void>;
    verifySession: (context: GetServerSidePropsContext) => boolean;
    isAuthenticated: boolean;
}

export const initialUserStoreState: IUserStore = {
    user: {},
    setUser: (user: Usuario) => { },
    createSession: async (token: string) => { },
    verifySession: (context: GetServerSidePropsContext) => false,
    isAuthenticated: false,
}

export const createUserStore = (set: any, get: any, api: any) => ({
    user: {},
    setUser: (user: Usuario) => set({ user, isAuthenticated: true }),
    createSession: async (token: string) => {

        nookies.set(undefined, 'token', token, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60
        })

        const { user } = decode(token) as { user: Usuario };

        set({ user, isAuthenticated: true })
    },
    verifySession: async (context: GetServerSidePropsContext) => {
        const { token } = nookies.get(context, "token")

        if (token) {
            const { user } = decode(token) as { user: Usuario };

            set({ user, isAuthenticated: true })

            return true;
        }

        set({ user: {}, isAuthenticated: false })

        return false;
    },
    isAuthenticated: false,
})





