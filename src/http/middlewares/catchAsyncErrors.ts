import { Request, Response } from "src/http/type";

export default (func: any) => (req: Request, res: Response, next: () => void) =>
  Promise.resolve(func(req, res, next)).catch(next);