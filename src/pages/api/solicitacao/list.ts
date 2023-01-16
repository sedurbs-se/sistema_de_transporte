import nc from "next-connect";
import verifyAuthentication from "src/http/middlewares/verifyAuthentication";
import { listSolicitacaoController } from "src/http/modules/solicitacao/controller/listSolicitacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.get(listSolicitacaoController);

export default handler;