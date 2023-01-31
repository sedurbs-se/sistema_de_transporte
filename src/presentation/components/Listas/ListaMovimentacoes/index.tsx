import { Badge, Button} from "react-bootstrap"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"
import { useStore } from "@domain/store/store"
import shallow from "zustand/shallow"
import Router from "next/router"
import { WarningPopUp } from "@shared/swal"
import { deleteMovimentacao } from "@domain/requests/delete/deleteMovimentacao"

const ListaMovimentacoes = () => {

    const tableColumns = [
        ["Placa", "placa"],
        ["Motorista", "motorista"],
        ["Data Saída", "data"],
        ["Hora Saída", "hora"],
        ["Status", "status_id"],
        ["", ""],
    ]

    const { movimentacoes, removeMovimentacao } = useStore(state => state, shallow)

    const getData = (data: Date) => {
        const date = new Date(data);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    const getTime = (data: Date) => {
        const date = new Date(data);

        const hours = date.getHours() +  3;
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    }


    const tableBody = movimentacoes.map((movimentacao:any) => ({
        id: movimentacao.id,
        data: getData(movimentacao.dtsaida),
        hora: getTime(movimentacao.dtsaida),
        placa: movimentacao.veiculo!.placa,
        motorista: movimentacao.motorista!.nome,
        status_id: <Badge pill bg={getBadgeTypeByStatus(movimentacao.status!.nome)}>{movimentacao.status!.nome}</Badge>
    }))

    const onEdit = (id: string) => {
        Router.push(`/movimentacao/retorno/${id}`)
    }

    const onAdd = () => {
        Router.push(`/movimentacao/formulario`)
    };

    const onDelete = async (id: string) => {

        const onDeletedSuccess = () => {
            removeMovimentacao(id)
        }

        WarningPopUp({
            message: "Tem certeza que deseja excluir essa movimentação?",
            errorMessage: "Não foi possível excluir a movimentação",
            action: async () => await deleteMovimentacao({ id }),
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

                   </>

    )
}

export default ListaMovimentacoes;

// Todo List

// validação de campos no end-point

// fazer Tipagem de front-end

// Fazer tabela de Ramal

// Fazer telas de movimentacao

// Thiago fará Saida e eu Retorno
