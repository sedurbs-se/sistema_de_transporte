import nc from "next-connect";
import { listVeiculoSemMovimentacaoController } from "src/http/modules/veiculos/controllers/listVeiculoSemMovimentacaoController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError })


handler.get(listVeiculoSemMovimentacaoController)

export default handler;