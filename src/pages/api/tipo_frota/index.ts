import nc from "next-connect";
import { createTipoFrotaController } from "src/http/modules/tipo_frota/controller/createTipoFrotaController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError })

handler.post(createTipoFrotaController);

export default handler;