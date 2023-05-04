import nc from "next-connect";
import { updateSetorController } from "src/http/modules/setores/controllers/updateSetorController";
import onError from "../../../http/middlewares/onErrors";
import { createSetorController } from "../../../http/modules/setores/controllers/createSetorController";
import { deleteSetorController } from "../../../http/modules/setores/controllers/deleteSetorController";
import { getSetorController } from "../../../http/modules/setores/controllers/getSetorController";


const handler = nc({ onError })



handler.get(getSetorController);

handler.post(createSetorController);

handler.put(updateSetorController);

handler.delete(deleteSetorController);



export default handler;