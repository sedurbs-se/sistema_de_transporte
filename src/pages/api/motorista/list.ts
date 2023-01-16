import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { listMotoristaController } from "../../../http/modules/motoristas/controllers/listMotoristaController";

const handler = nc({ onError })

handler.get(listMotoristaController);


export default handler;