import Router from "next/router"
import { Button, Modal } from "react-bootstrap"
import shallow from "zustand/shallow"
import {  useState } from "react"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import { api } from "@domain/config/api"
import { WarningPopUp } from "@shared/swal"
import { deleteLocadora } from "@domain/requests/delete/deleteLocadora"


export interface ListaLocadorasProps {
}

const ListaLocadoras = (props: ListaLocadorasProps) => {

    const [locadora, setLocadora] = useState([{ nome: "", sigla: "", bairro: "", endereco: "", telefone: "" }])
    const [show, setShow] = useState(false);

    const { locadoras, removeLocadora, selectedLocadora, setSelectedLocadora } = useStore((state) => state, shallow);


    const tableColumns = [
        ["Nome", "nome"],
        ["Bairro", "bairro"],
    ]

    const onDelete = async (id: string) => {

        const onDeleteSuccess = () => {
            removeLocadora(id)
        }


        WarningPopUp({
            message: "Tem certeza que deseja excluir a locadora do sistema?",
            errorMessage: "Não foi possível excluir a locadora",
            action: async () => await deleteLocadora({ id }),
            onActionSuccess: onDeleteSuccess
        })
    };

    const onEdit = (id: string) => {
        setSelectedLocadora(id)
        Router.push(`/locadora/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/locadora/formulario`)
    }

    const onDetail = async (id: string) => {
        const locadora = await api.get(`/locadora?id=${id}`)
        setLocadora([locadora.data.locadora])
        setShow(true)
    }

    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={locadoras}
                onEdit={onEdit}
                onDelete={onDelete}
                onDetail={onDetail}></TableComponent>

            <Button variant="primary" onClick={onAdd}>Adicionar</Button>

            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{locadora[0].nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent
                        tableHeaderData={[
                            ["Nome", "nome"],
                            ["Sigla", "sigla"],
                            ["Telefone", "telefone"],
                            ["Bairro", "bairro"],
                            ["Endereço", "endereco"],
                            ["Criado em", "createdAt"],
                            ["Editado em", "updatedAt"]
                        ]}
                        tableBodyData={locadora}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ListaLocadoras;