export interface ILoadingStore {
    isFetching: boolean;
    setIsFetching: (isFetching: boolean) => void;
    progress: number;
    setProgress: (progress: number) => void;
}

export const loadingState: ILoadingStore = {
    isFetching: false,
    setIsFetching: (isFetching: boolean) => { },
    progress: 0,
    setProgress: (progress: number) => { },
}

