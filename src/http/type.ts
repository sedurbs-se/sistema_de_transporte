import { TipoUsuario, Usuario } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


interface Request extends NextApiRequest {
    user?: Usuario & {
        tipo: TipoUsuario | null;
    }
};

interface Response extends NextApiResponse {
}

export type { Request, Response };