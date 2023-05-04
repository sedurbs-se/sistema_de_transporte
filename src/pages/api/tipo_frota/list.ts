import nc from "next-connect";
import { listTipoFrotaController } from "src/http/modules/tipo_frota/controller/listTipoFrotaController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError })


handler.get(listTipoFrotaController);

export default handler;