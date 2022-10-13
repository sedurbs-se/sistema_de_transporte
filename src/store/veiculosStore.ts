import { atom } from "jotai";
import { Veiculos } from "../domain/types/Veiculos";


const veiculosAtom = atom<Veiculos | undefined>(undefined)