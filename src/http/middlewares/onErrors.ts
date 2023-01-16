import { Request, Response } from "src/http/type";
import AppError from "../errors/AppError";

export default async function onError(
    error: AppError,
    req: Request,
    res: Response,
    next: () => void,
) {

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        });
    } else {
        res.status(500).end('Internal server error', error);
    }
    
    next();
}