import nc from "next-connect";
import { createSolicitacaoController } from "src/http/modules/solicitacao/controller/createSolicitacaoController";
import { deleteSolicitacaoController } from "src/http/modules/solicitacao/controller/deleteSolicitacaoController";
import { getSolicitacaoController } from "src/http/modules/solicitacao/controller/getSolicitacaoController";
import { updateSolicitacaoController } from "src/http/modules/solicitacao/controller/updateSolicitacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.post(createSolicitacaoController)
handler.get(getSolicitacaoController)
handler.delete(deleteSolicitacaoController)
handler.put(updateSolicitacaoController);

export default handler;