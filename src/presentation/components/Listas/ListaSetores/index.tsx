import axios from "axios"
import Router from "next/router"
import { useEffect, useState } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import { api } from "@domain/config/api"
import PaginationComponent from "@components/Pagination"
import { WarningPopUp } from "@shared/swal"
import { deleteSetor } from "@domain/requests/delete/deleteSetor"

export interface ListaSetoresProps {
}


const ListaSetores = (props: ListaSetoresProps) => {

    const { setores , removeSetor, selectedSetor ,setSelectedSetor, setorPages } = useStore((state) => state, shallow);

    const [setor, setSetor] = useState([{ nome: "", codigo: "", sigla: "", responsavel: "", ramal: "", createdAt: "", updatedAt: "" }]);
    const [show, setShow] = useState(false);

    const tableColumns = [
        ["Código","codigo"],
        ["Sigla", "sigla"],
        ['Ramal',"ramal"],
        ["", ""]
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


    const [page, setPage] = useState(1);

    return(
        <>
        <TableComponent
        tableHeaderData={tableColumns}
        tableBodyData={setores}
        onDelete={onDelete}
        onEdit={onEdit}
        onDetail={onDetail}
        ></TableComponent>

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
        <Button onClick={onAdd}>Adicionar</Button>
        </>

            )
}

export default ListaSetores;