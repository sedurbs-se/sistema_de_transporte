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
import { IMunicipiosStore, municipiosState } from './municipios';
import { IMovimentacaoStore, createMovimentacaoStore, initialMovimentacaoStoreState } from './movimentacao';

export interface IInitialState extends
    IUserStore,
    IVeiculosStore,
    IMotoristasStore,
    ILocadorasStore,
    ISetoresStore,
    ITipoFrotaStore,
    IVinculoStore,
    ISolicitacaoStore,
    IMunicipiosStore,
    IMovimentacaoStore {
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
    ...initialSolicitacaoState,
    ...municipiosState,
    ...initialMovimentacaoStoreState
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
                ...createMotoristasStore(set, get, api),
                ...createMovimentacaoStore(set, get, api),
            }))
    )
};

export function useCreateStore(serverInitialState: IInitialState) {
    return () => initializeStore(serverInitialState)
};

