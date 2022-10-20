
import nc from "next-connect";
import { listTipoSolicitacaoController } from "src/http/modules/tipo_solicitacao/controller/listTipoSolicitacaoController";
import onError from "../../../http/middlewares/onErrors";

const handler = nc({ onError })

handler.get(listTipoSolicitacaoController);

export default handler;