import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { createMotoristaController } from "../../../http/modules/motoristas/controllers/createMotoristaController";
import { deleteMotoristaController } from "../../../http/modules/motoristas/controllers/deleteMotoristaController";
import { getMotoristaController } from "../../../http/modules/motoristas/controllers/getMotoristaController";

const handler = nc({ onError })

handler.get(getMotoristaController);

handler.post(createMotoristaController);

handler.delete(deleteMotoristaController);

// handler.put(createMotoristaController);

export default handler;