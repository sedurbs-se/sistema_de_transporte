import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { listLocadoraController } from "../../../http/modules/locadoras/controllers/listLocadoraController";

const handler = nc({ onError })

handler.get(listLocadoraController);


export default handler;