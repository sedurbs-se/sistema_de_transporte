

import nc from "next-connect";
import { listSolicitacaoAutorizadasController } from "src/http/modules/solicitacao/controller/listSolicitacoesAutorizadas";
import onError from "../../../http/middlewares/onErrors";


const handler = nc({ onError })


handler.get(listSolicitacaoAutorizadasController)

export default handler;