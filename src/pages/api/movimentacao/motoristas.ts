import nc from "next-connect";
import { listMotoristaSemMovimentacaoController } from "src/http/modules/motoristas/controllers/listMotoristaSemMovimentacaoController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError })


handler.get(listMotoristaSemMovimentacaoController)

export default handler;