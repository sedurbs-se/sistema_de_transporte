import nc from "next-connect";
import { updateMotoristaController } from "src/http/modules/motoristas/controllers/updateMotoristaController";
import onError from "../../../http/middlewares/onErrors";
import { createMotoristaController } from "../../../http/modules/motoristas/controllers/createMotoristaController";
import { deleteMotoristaController } from "../../../http/modules/motoristas/controllers/deleteMotoristaController";
import { getMotoristaController } from "../../../http/modules/motoristas/controllers/getMotoristaController";

const handler = nc({ onError })

handler.get(getMotoristaController);

handler.post(createMotoristaController);

handler.put(updateMotoristaController);

handler.delete(deleteMotoristaController);

// handler.put(createMotoristaController);

export default handler;