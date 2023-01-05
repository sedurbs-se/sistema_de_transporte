import { Badge, Button, Container, Table } from "react-bootstrap"
import { Solicitacao } from "@shared/types/Solicitação"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"
import { useStore } from "@domain/store/store"
import shallow from "zustand/shallow"
import Router from "next/router"
import { deleteSolicitacao } from "@domain/requests/delete/deleteSolicitacao"
import { useState } from "react"
import Swal from "sweetalert2"
import { WarningPopUp } from "@shared/swal"

const ListaSolicitacoes = () => {

    const tableColumns = [
        ["Usuário", "usuario"],
        ["Ramal", "ramal"],
        ["Atividade", "atividade"],
        ["Município", "municipios"],
        ["Ocupantes", "num_ocupantes"],
        ["Data", "data"],
        ["Hora", "hora"],
        ["Status", "status_solicitacao_id"],
        ["", ""],
    ]

    const { solicitacoes, removeSolicitacao } = useStore(state => state, shallow)

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

    console.log(solicitacoes[0])
    const onEdit = (id: string) => {
        Router.push(`/solicitacao/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/solicitacao/formulario`)
    };

    const onDelete = async (id: string) => {

        const onDeletedSuccess = () => {
            removeSolicitacao(id)
        }

        WarningPopUp({
            message: "Tem certeza que deseja excluir essa solicitação?",
            errorMessage: "Não foi possível excluir a solicitação",
            action: async () => await deleteSolicitacao({ id }),
            onActionSuccess: onDeletedSuccess,
        })
    };


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