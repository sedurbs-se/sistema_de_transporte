import create from 'zustand'



interface Store {
    bears: number
    increasePopulation: () => void
    removeAllBears: () => void
}


export const useBearStore = create<Store>((set) => ({
    bears: 0,
    increasePopulation: () => set((state: Store) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))


// SetLoading

// Set Things

// Set
