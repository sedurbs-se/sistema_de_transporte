import { Badge, Button, Container, Table } from "react-bootstrap"
import { Solicitacao } from "@shared/types/Solicitação"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"


export interface ListaSolicitacoesProps {
    Solicitacoes: Solicitacao[]
}

const ListaSolicitacoes = (props: ListaSolicitacoesProps) => {

    const tableColumns = [
        ["Usuário", "usuario_id"],
        ["Ramal", "ramal_id"],
        ["Atividade", "atividade"],
        ["Município", "municipio_id"],
        ["Ocupantes", "num_ocupantes"],
        ["Data", "data"],
        ["Hora", "hora"],
        ["Status", "status_id"],
        ["", ""],
    ]

    const tableBody = props.Solicitacoes.map((solicitacao) => ({...solicitacao, status_id: <Badge pill bg={getBadgeTypeByStatus(solicitacao.status_id)}>{solicitacao.status_id}</Badge>}))
    
    return (
        <TableComponent 
        tableHeaderData={tableColumns}
        tableBodyData={tableBody}
        onDelete={(id) => console.log(id)}
        onEdit={(id) => console.log(id)}
        ></TableComponent>
    )
}

export default ListaSolicitacoes;