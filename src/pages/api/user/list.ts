
import nc from "next-connect";
import verifyAuthentication from "src/http/middlewares/verifyAuthentication";
import { listUsuarioController } from "src/http/modules/usuario/controller/listUsuarioController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError });

handler.get(listUsuarioController);


// handler.put(updateMotoristaController);
// handler.put()
export default handler;

