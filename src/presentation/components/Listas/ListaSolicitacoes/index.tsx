import { Badge, Button} from "react-bootstrap"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"
import { useStore } from "@domain/store/store"
import shallow from "zustand/shallow"
import Router from "next/router"
import { deleteSolicitacao } from "@domain/requests/delete/deleteSolicitacao"
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
    console.log(solicitacoes)
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

    if(!solicitacoes || solicitacoes === undefined) return (<div>Carregando...</div>);

    const tableBody = solicitacoes.map((solicitacao) => ({
        data: getData(solicitacao?.data_hora_saida || new Date()),
        hora: getTime(solicitacao?.data_hora_saida || new Date()),
        municipios: solicitacao?.municipiosolicitacao ?
            solicitacao?.municipiosolicitacao.map((municipio:any) => municipio.nome).join(', ') : '',
        ...solicitacao,
        status_solicitacao_id:
            <Badge pill bg={getBadgeTypeByStatus(solicitacao?.statussolicitacao!.nome)}>{solicitacao?.statussolicitacao!.nome}
            </Badge>
    }))

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

// Todo List

// validação de campos no end-point

// fazer Tipagem de front-end

// Fazer tabela de Ramal

// Fazer telas de movimentacao

// Thiago fará Saida e eu Retorno