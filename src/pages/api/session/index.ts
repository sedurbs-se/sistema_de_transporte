import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { createSessionController } from "../../../http/modules/session/controllers/createSessionController";


const handler = nc({ onError })



handler.post(createSessionController);

export default handler;