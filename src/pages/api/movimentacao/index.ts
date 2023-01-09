import nc from "next-connect";
import retornoMovimentacaoController from "src/http/modules/movimentacao/controller/retornoMovimentacaoController";
import saidaMovimentacaoController from "src/http/modules/movimentacao/controller/saidaMovimentacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.post(saidaMovimentacaoController);
handler.put(retornoMovimentacaoController);

export default handler;