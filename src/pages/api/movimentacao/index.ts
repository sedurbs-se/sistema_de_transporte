import nc from "next-connect";
import { getMovimentacaoController } from "src/http/modules/movimentacao/controller/getMovimentacaoController";
import retornoMovimentacaoController from "src/http/modules/movimentacao/controller/retornoMovimentacaoController";
import saidaMovimentacaoController from "src/http/modules/movimentacao/controller/saidaMovimentacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.post(saidaMovimentacaoController);
handler.put(retornoMovimentacaoController);
handler.get(getMovimentacaoController);

export default handler;