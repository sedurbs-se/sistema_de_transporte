import axios from "axios"
import Router from "next/router"
import { useEffect, useState } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import Swal from "sweetalert2"
import { api } from "@domain/config/api"
import PaginationComponent from "@components/Pagination"
import { deleteMotorista } from "@domain/requests/delete/deleteMotorista"
import { WarningPopUp } from "@shared/swal"
import usePagination from "@domain/hooks/usePagination"
import fetchMotoristas from "@domain/requests/fetch/fetchMotoristas"

export interface ListaMotoristasProps {
}


const ListaMotoristas = (props: ListaMotoristasProps) => {

    const {
        motoristas,
        motoristaPages,
        removeMotorista,
        selectedMotorista,
        setSelectedMotorista,
        setMotoristas,
        setMotoristaPages

    } = useStore((state) => state, shallow);

    const [motorista, setMotorista] = useState([{ nome: "", celular: "", data_nascimento: "", vinculo: "", bairro: "", endereco: "", createdAt: "", updatedAt: "" }]);
    const [show, setShow] = useState(false);

    const tableColumns = [
        ["Nome", "nome"],
        ["Celular", "celular"],
        ["Vinculo", "vinculo"],
        ["", ""]
    ];

    const onDelete = async (id: string) => {

        const onDeleteSuccess = () => {
            removeMotorista(id)
        }


        WarningPopUp({
            message: "Tem certeza que deseja excluir o motorista do sistema?",
            errorMessage: "Não foi possível excluir o motorista",
            action: async () => await deleteMotorista({ id }),
            onActionSuccess: onDeleteSuccess
        })
    }

    const onEdit = (id: string) => {
        setSelectedMotorista(id)
        Router.push(`/motorista/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/motorista/formulario`)
    }

    const onDetail = async (id: string) => {
        const motorista = await api.get(`/motorista?id=${id}`)
        setMotorista([motorista.data.motorista])
        setShow(true)
    }



    const action = (data: any) => {
        const { motoristas, total } = data;

        setMotoristas(motoristas)
        setMotoristaPages(total)
    }

    const [page, setPage] = usePagination({
        total: motoristaPages,
        limit: 10,
        onFetch: fetchMotoristas,
        action
    })


    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={motoristas}
                onDelete={onDelete}
                onEdit={onEdit}
                onDetail={onDetail}
            />

            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{motorista[0].nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent
                        tableHeaderData={[
                            ["Nome", "nome"],
                            ["Celular", "celular"],
                            ["Data de nascimento", "data_nascimento"],
                            ["Vínculo", "vinculo"],
                            ["Bairro", "bairro"],
                            ["Endereço", "endereco"],
                            ["Criado em", "createdAt"],
                            ["Editado em", "updatedAt"]
                        ]}
                        tableBodyData={motorista}
                    />
                </Modal.Body>
            </Modal>

            <PaginationComponent
                page={page}
                totalPages={motoristaPages}
                onPageChange={setPage}
            />
            <Button variant="primary" onClick={onAdd}>Adicionar</Button>
        </>

    )
}

export default ListaMotoristas;