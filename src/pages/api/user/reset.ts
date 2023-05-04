
import nc from "next-connect";
import verifyAuthentication from "src/http/middlewares/verifyAuthentication";
import resetUsuarioController from "src/http/modules/usuario/controller/resetUsuarioController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError }).use(verifyAuthentication)



handler.post(resetUsuarioController);

// handler.put()
export default handler;

