import nc from "next-connect";
import { updateMotoristaController } from "src/http/modules/motoristas/controllers/updateMotoristaController";
import { createSolicitacaoController } from "src/http/modules/solicitacao/controller/createSolicitacaoController";
import { deleteSolicitacaoController } from "src/http/modules/solicitacao/controller/deleteSolicitacaoController";
import { getSolicitacaoController } from "src/http/modules/solicitacao/controller/getSolicitacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.post(createSolicitacaoController)
handler.get(getSolicitacaoController)
handler.delete(deleteSolicitacaoController)
handler.put(updateMotoristaController);

export default handler;