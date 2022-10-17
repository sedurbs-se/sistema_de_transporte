import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { createLocadoraController } from "../../../http/modules/locadoras/controllers/createLocadoraController";
import { deleteLocadoraController } from "../../../http/modules/locadoras/controllers/deleteLocadoraController";
import { getLocadoraController } from "../../../http/modules/locadoras/controllers/getLocadoraController";

const handler = nc({ onError })

handler.get(getLocadoraController);

handler.post(createLocadoraController);

handler.delete(deleteLocadoraController);



export default handler;