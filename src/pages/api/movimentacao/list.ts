import nc from "next-connect";
import { listMovimentacaoController } from "src/http/modules/movimentacao/controller/listMovimentacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.get(listMovimentacaoController)

export default handler;