import axios from "axios"
import Router from "next/router"
import { useEffect, useState } from "react"
import { Modal, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import { api } from "@domain/config/api"
import PaginationComponent from "@components/Pagination"
import { WarningPopUp } from "@shared/swal"
import { deleteSetor } from "@domain/requests/delete/deleteSetor"
import fetchSetores from "@domain/requests/fetch/fetchSetores"
import usePagination from "@domain/hooks/usePagination"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataTable } from "@components/DataTable"
import { Button } from "@/components/ui/button"

export interface ListaSetoresProps {
}


const ListaSetores = (props: ListaSetoresProps) => {

    const { setores, removeSetor, setSetores, setSelectedSetor, setorPages, setSetorPages } = useStore((state) => state, shallow);

    const [setor, setSetor] = useState([{ nome: "", codigo: "", sigla: "", responsavel: "", ramal: "", createdAt: "", updatedAt: "" }]);
    const [show, setShow] = useState(false);


    type Setor = {
        id: string;
        codigo: string;
        sigla: string;
        ramal : string;
    }




        const tableColumns: ColumnDef<Setor>[] = [
                    { header: "Código", accessorKey: "codigo" },
        {
            header: ({ column }) => {
                return (
                    <Button onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} variant="ghost">
                        Sigla

                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            accessorKey: "sigla", id: "sigla",
            enableSorting: true, enableResizing: true,
            enableGlobalFilter: true
        },
        { header: "Ramal", accessorKey: "ramal" },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
              const setor = row.original
         
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
                      onClick={() => onEdit(setor.id)}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={() => onDelete(setor.id)}
                    >Excluir</DropdownMenuItem>
                                        <DropdownMenuItem
                    onClick={() => onDetail(setor.id)}
                    >Ver detalhes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            },
          },
        

    ]



    const onDelete = async (id: string) => {

        const onDeleteSuccess = () => {
            removeSetor(id)
        }

        WarningPopUp({
            message: "Tem certeza que deseja excluir o setor do sistema?",
            errorMessage: "Não foi possível excluir o setor",
            action: async () => await deleteSetor({ id }),
            onActionSuccess: onDeleteSuccess
        })

    }

    const onEdit = (id: string) => {
        setSelectedSetor(id)
        Router.push(`/setor/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/setor/formulario`)
    }

    const onDetail = async (id: string) => {
        const setor = await api.get(`/setor?id=${id}`)
        setSetor([setor.data.setor])
        setShow(true)
    }

    const action = (data: any) => {
        const { setores, total } = data;

        setSetores(setores)
        setSetorPages(total)
    }

    const [page, setPage] = usePagination({
        total: setorPages,
        limit: 10,
        onFetch: (page: number, limit: number) => fetchSetores({
            page,
            limit,
        }),
        action
    })

    return (
        <>
            {/* <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={setores}
                onDelete={onDelete}
                onEdit={onEdit}
                onDetail={onDetail}
            ></TableComponent> */}

<DataTable
                columns={tableColumns}
                data={setores}
            />

            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{setor[0].nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent
                        tableHeaderData={[
                            ["Código", "codigo"],
                            ["Nome", "nome"],
                            ["Sigla", "sigla"],
                            ["Responsável", "responsavel"],
                            ["Ramal", "ramal"],
                            ["Criado em", "createdAt"],
                            ["Editado em", "updatedAt"]
                        ]}
                        tableBodyData={setor}
                    />
                </Modal.Body>
            </Modal>
           

            <PaginationComponent
                totalPages={setorPages}
                page={page}
                onPageChange={setPage}
            />

            <div className="w-1/2">
            <Button variant="outline" onClick={onAdd}>Adicionar</Button>
            </div>


           
        </>

    )
}

export default ListaSetores;