import { Badge } from "react-bootstrap"
import getBadgeTypeByStatus from "@shared/utils/getBadgeTypeByStatus"
import TableComponent from "@components/Table"
import { useStore } from "@domain/store/store"
import shallow from "zustand/shallow"
import Router from "next/router"
import { deleteSolicitacao } from "@domain/requests/delete/deleteSolicitacao"
import { WarningPopUp } from "@shared/swal"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@components/DataTable"
import { Solicitacao } from "@shared/types/Solicitação"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


const ListaSolicitacoes = () => {



    const tableColumns: ColumnDef<Solicitacao>[] = [
        {
            header: ({ column }) => {
                return (
                    <Button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} variant="ghost">
                        Usuário

                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            accessorKey: "usuario", id: "usuario",
            enableSorting: true, enableResizing: true
        },
        { header: "Ramal", accessorKey: "ramal" },
        { header: "Atividade", accessorKey: "atividade" },
        { header: "Município", accessorKey: "municipios" },
        { header: "Ocupantes", accessorKey: "num_ocupantes" },
        { header: "Data", accessorKey: "data" },
        { header: "Hora", accessorKey: "hora" },
        {
            header: "Status",
            cell: ({ row }) => {
                const status_solicitacao = row.original.statussolicitacao || { nome: "Não definido" }
                return (
                    <Badge pill bg={getBadgeTypeByStatus(status_solicitacao.nome)}>{status_solicitacao.nome}
                    </Badge>
                )
            }
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
              const solicitacao = row.original
         
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => onEdit(solicitacao.id)}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={() => onDelete(solicitacao.id)}
                    >Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        

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

    if (!solicitacoes || solicitacoes === undefined) return (<div>Carregando...</div>);

    const tableBody = solicitacoes.map((solicitacao) => ({
        data: getData(solicitacao?.data_hora_saida || new Date()),
        hora: getTime(solicitacao?.data_hora_saida || new Date()),
        municipios: solicitacao?.municipiosolicitacao ?
            solicitacao?.municipiosolicitacao.map((municipio: any) => municipio.nome).join(', ') : '',
        ...solicitacao
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

            <DataTable
                columns={tableColumns}
                data={tableBody}
            />

            <Button
                variant="outline" onClick={onAdd}>Adicionar</Button>

            {/* <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={tableBody}
                onDelete={(id) => onDelete(id)}
                onEdit={(id) => onEdit(id)}
            ></TableComponent> */}



        </>

    )
}

export default ListaSolicitacoes;

