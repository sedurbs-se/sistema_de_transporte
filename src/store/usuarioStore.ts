import { atom } from "jotai";
import { Usuario } from "../domain/types/Usuario";

const usuarioAtom = atom<Usuario | undefined>(undefined);

export { usuarioAtom }