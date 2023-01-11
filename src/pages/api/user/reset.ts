
import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })


// handler.post(resetUsuarioController);
// handler.put()
export default handler;

