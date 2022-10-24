import nc from "next-connect";
import { updateLocadoraController } from "src/http/modules/locadoras/controllers/updateLocadoraController";
import onError from "../../../http/middlewares/onErrors";
import { createLocadoraController } from "../../../http/modules/locadoras/controllers/createLocadoraController";
import { deleteLocadoraController } from "../../../http/modules/locadoras/controllers/deleteLocadoraController";
import { getLocadoraController } from "../../../http/modules/locadoras/controllers/getLocadoraController";

const handler = nc({ onError })

handler.get(getLocadoraController);

handler.post(createLocadoraController);

handler.put(updateLocadoraController);

handler.delete(deleteLocadoraController);



export default handler;