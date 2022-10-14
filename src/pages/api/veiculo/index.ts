import nc from "next-connect";
import onError from "../../../http/middlewares/onErrors";
import { createVeiculoController } from "../../../http/modules/veiculos/controllers/createVeiculoController";
import { deleteVeiculoController } from "../../../http/modules/veiculos/controllers/deleteVeiculoController";
import { getVeiculoController } from "../../../http/modules/veiculos/controllers/getVeiculoController";

const handler = nc({ onError })

handler.get(getVeiculoController);

handler.post(createVeiculoController);

handler.delete(deleteVeiculoController);

// handler.put(createMotoristaController);

export default handler;