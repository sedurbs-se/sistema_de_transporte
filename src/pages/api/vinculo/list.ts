
import nc from "next-connect";
import { listVinculoController } from "src/http/modules/vinculo/controller/listVinculoController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError })


handler.get(listVinculoController);

export default handler;