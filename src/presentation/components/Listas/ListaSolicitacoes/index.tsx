import { Badge, Button, Container, Table } from "react-bootstrap"
import { Solicitacao } from "@shared/types/Solicitação"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"
import { useStore } from "@domain/store/store"
import shallow from "zustand/shallow"
import Router from "next/router"
import { deleteSolicitacao } from "@domain/requests/delete/deleteSolicitacao"
import { useDeleteSolicitacao } from "@domain/query/deleteSolicitacao"
import { useState } from "react"




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

    const { solicitacoes, removeSolicitacao } = useStore(state => state, shallow)

    const tableBody = solicitacoes.map((solicitacao) => ({ ...solicitacao, status_solicitacao_id: <Badge pill bg={getBadgeTypeByStatus(solicitacao.status_solicitacao_id)}>{solicitacao.status_solicitacao_id}</Badge> }))

    const onEdit = (id: string) => {
        Router.push(`/solicitacao/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/solicitacao/formulario`)
    };

    const [deletedId, setDeletedId] = useState<string>('')

    const onDeleteSuccess = () => {
        removeSolicitacao(deletedId);
        setDeletedId("");
    };

    const onDeleteError = () => {

    };

    const onDelete = (id: string) => {
        setDeletedId(id);
    };

    const { isFetching } = useDeleteSolicitacao({ onSuccess: onDeleteSuccess, onError: onDeleteError, id: deletedId });

    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={tableBody}
                onDelete={(id) => onDelete(id)}
                onEdit={(id) => onEdit(id)}
            ></TableComponent>

            <Button variant="primary" onClick={onAdd}>Adicionar</Button>
        </>

    )
}

export default ListaSolicitacoes;