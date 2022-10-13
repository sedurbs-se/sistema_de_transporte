import { NextApiRequest, NextApiResponse } from "next";
import AppError from "../errors/AppError";

export default async function onError(
    error: AppError,
    req: NextApiRequest,
    res: NextApiResponse,
    next: () => void,
) {

    if (error instanceof AppError) {
        res.status(error.statusCode).end(error.message);
    } else {
        res.status(500).end('Internal server error');
    }


    next();
}