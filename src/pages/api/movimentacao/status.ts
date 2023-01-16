import nc from "next-connect";
import { listStatusMovimentacaoController } from "src/http/modules/status_movimentacao/controller/listStatusMovimentacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.get(listStatusMovimentacaoController)

export default handler;