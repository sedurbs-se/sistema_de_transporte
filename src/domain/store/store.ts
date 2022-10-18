import { useLayoutEffect } from 'react'
import create, { StoreApi, UseBoundStore } from 'zustand'
import createContext from 'zustand/context'
import { createUserStore, initialUserStoreState, IUserStore } from './user';
import { createVeiculoStore, initialVeiculosStoreState, IVeiculosStore } from './veiculos';
import { combine } from "zustand/middleware";
import { createMotoristasStore, IMotoristasStore, initialMotoristasStoreState } from './motoristas';
import { createLocadorasStore, ILocadorasStore, initialLocadorasStoreState } from './locadora';
import { createSetoresStore, ISetoresStore, initialSetoresStoreState } from './setores';
import { createTipoFrotaStore, initialTipoFrotaState, ITipoFrotaStore } from './tipoFrotas';
import { createVinculoStore, initialVinculoState, IVinculoStore } from './vinculos';
import { createSolicitacaoStore, initialSolicitacaoState, ISolicitacaoStore } from './solicitacao';



export interface IInitialState extends
    IUserStore, IVeiculosStore, IMotoristasStore, ILocadorasStore, ISetoresStore, ITipoFrotaStore, IVinculoStore, ISolicitacaoStore {
};

type useStoreState = typeof initializeStore extends (
    ...args: never
) => UseBoundStore<infer T>
    ? T
    : never

let store: any;

const getDefaultInitialState = (): IInitialState => ({
    ...initialVeiculosStoreState,
    ...initialUserStoreState,
    ...initialMotoristasStoreState,
    ...initialLocadorasStoreState,
    ...initialSetoresStoreState,
    ...initialTipoFrotaState,
    ...initialVinculoState,
    ...initialSolicitacaoState
})

const zustandContext = createContext<useStoreState>()
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
    return create(
        combine({
            ...getDefaultInitialState(),
            ...preloadedState,
        },
            (set, get, api) => ({
                ...createVeiculoStore(set, get, api),
                ...createUserStore(set, get, api),
                ...createMotoristasStore(set, get, api),
                ...createLocadorasStore(set, get, api),
                ...createSetoresStore(set, get, api),
                ...createTipoFrotaStore(set, get, api),
                ...createVinculoStore(set, get, api),
                ...createSolicitacaoStore(set, get, api),
            }))
    )
};

export function useCreateStore(serverInitialState: IInitialState) {
    // Server side code: For SSR & SSG, always use a new store.
    if (typeof window === 'undefined') {
        return () => initializeStore(serverInitialState)
    }
    // End of server side code

    // Client side code:
    // Next.js always re-uses same store regardless of whether page is a SSR or SSG or CSR type.
    const isReusingStore = Boolean(store)
    store = store ?? initializeStore(serverInitialState)
    // When next.js re-renders _app while re-using an older store, then replace current state with
    // the new state (in the next render cycle).
    // (Why next render cycle? Because react cannot re-render while a render is already in progress.
    // i.e. we cannot do a setState() as that will initiate a re-render)
    //
    // eslint complaining "React Hooks must be called in the exact same order in every component render"
    // is ignorable as this code runs in same order in a given environment (i.e. client or server)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
        // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
        // states on CSR page navigation or not. I have chosen not to, but if you choose to,
        // then add `serverInitialState = getDefaultInitialState()` here.
        if (serverInitialState && isReusingStore) {
            store.setState(
                {
                    // re-use functions from existing store
                    ...store.getState(),
                    // but reset all other properties.
                    ...serverInitialState,
                },
                true // replace states, rather than shallow merging
            );
        }
    });
    return () => store
};

