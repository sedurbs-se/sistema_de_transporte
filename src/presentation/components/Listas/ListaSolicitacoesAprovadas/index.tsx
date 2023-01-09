import { Badge} from "react-bootstrap"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"
import { useStore } from "@domain/store/store"
import shallow from "zustand/shallow"



const ListaSolicitacoesAprovada = () => {

    const tableColumns = [
        ["Usuário", "usuario"],
        // ["Ramal", "ramal"],
        // ["Atividade", "atividade"],
        ["Município", "municipios"],
        ["Ocupantes", "num_ocupantes"],
        ["Data", "data"],
        ["Hora", "hora"],
        ["Status", "status_solicitacao_id"],
    ]

    const { solicitacoes } = useStore(state => state, shallow)

    const getData = (data: Date) => {
        const date = new Date(data);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const getTime = (data: Date) => {
        const date = new Date(data);

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    }

    const tableBody = solicitacoes.map((solicitacao) => ({
        data: getData(solicitacao.data_hora_saida),
        hora: getTime(solicitacao.data_hora_saida),
        municipios: solicitacao.municipiosolicitacao ?
            solicitacao.municipiosolicitacao.map(municipio => municipio.nome).join(', ') : '',
        ...solicitacao,
        status_solicitacao_id:
            <Badge pill bg={getBadgeTypeByStatus(solicitacao.statussolicitacao.nome)}>{solicitacao.statussolicitacao.nome}
            </Badge>
    }))


    return (
        <>
            <h6>Solicitacoes Ativas</h6>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={tableBody}
            ></TableComponent>
        </>

    )
}

export default ListaSolicitacoesAprovada;

// Todo List

// validação de campos no end-point

// fazer Tipagem de front-end

// Fazer tabela de Ramal

// Fazer telas de movimentacao

// Thiago fará Saida e eu Retorno