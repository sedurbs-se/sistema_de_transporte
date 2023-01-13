import { TipoUsuario, Usuario as UsuarioPrisma } from "@prisma/client"


export interface Usuario extends UsuarioPrisma {
    tipo: TipoUsuario;
}