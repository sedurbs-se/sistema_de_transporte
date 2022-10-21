import { Badge, Button, Container, Table } from "react-bootstrap"
import { Solicitacao } from "@shared/types/Solicitação"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"
import { useStore } from "@domain/store/store"
import shallow from "zustand/shallow"
import Router from "next/router"




const ListaSolicitacoes = () => {

    const tableColumns = [
        ["Usuário", "usuario_id"],
        ["Ramal", "ramal_id"],
        ["Atividade", "atividade"],
        ["Município", "municipio_id"],
        ["Ocupantes", "num_ocupantes"],
        ["Data", "data"],
        ["Hora", "hora"],
        ["Status", "status_solicitacao_id"],
        ["", ""],
    ]

    const { solicitacoes } = useStore(state => state, shallow)


    // const tableBody = props.Solicitacoes.map((solicitacao) => ({ ...solicitacao, status_id: <Badge pill bg={getBadgeTypeByStatus(solicitacao.status_id)}>{solicitacao.status_id}</Badge> }))

    const tableBody = solicitacoes.map((solicitacao) => ({ ...solicitacao, status_solicitacao_id: <Badge pill bg={getBadgeTypeByStatus(solicitacao.status_solicitacao_id)}>{solicitacao.status_solicitacao_id}</Badge> }))
    
    const onEdit = (id: string) => {
        Router.push(`/solicitacao/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/solicitacao/formulario`)
    }

    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={tableBody}
                onDelete={(id) => console.log(id)}
                onEdit={(id) => console.log(id)}
            ></TableComponent>

            <Button variant="primary" onClick={onAdd}>Adicionar</Button>
        </>

    )
}

export default ListaSolicitacoes;