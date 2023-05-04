
import nc from "next-connect";
import { tiposUsuarioController } from "src/http/modules/usuario/controller/tiposUsuariosController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError });


handler.get(tiposUsuarioController)

// handler.put(updateMotoristaController);
// handler.put()
export default handler;

