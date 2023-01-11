import { Usuario } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


interface Request extends NextApiRequest {
    user?: Usuario;
};

interface Response extends NextApiResponse {
}

export type { Request, Response };