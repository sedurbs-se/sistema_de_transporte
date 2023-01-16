import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { listSetorController } from "../../../http/modules/setores/controllers/listSetorController";

const handler = nc({ onError })

handler.get(listSetorController);


export default handler;