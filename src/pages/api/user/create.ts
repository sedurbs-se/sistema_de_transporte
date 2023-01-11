
import nc from "next-connect";
import { createUsuarioController } from "src/http/modules/usuario/controller/createUsuarioController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })


handler.post(createUsuarioController);

// handler.put(updateMotoristaController);
// handler.put()
export default handler;

