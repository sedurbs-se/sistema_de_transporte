import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { listVeiculoController } from "../../../http/modules/veiculos/controllers/listMotoristaController";

const handler = nc({ onError })

handler.get(listVeiculoController);

export default handler;