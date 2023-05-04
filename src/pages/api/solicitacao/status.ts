import nc from "next-connect";
import { listStatusSolicitacaoController } from "src/http/modules/status_solicitacao/controller/listStatusSolicitacaoController";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError })


handler.get(listStatusSolicitacaoController);

export default handler;