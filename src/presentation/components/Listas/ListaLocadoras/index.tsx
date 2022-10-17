import axios from "axios"
import Router from "next/router"
import { Button, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import {useEffect} from "react"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"

export interface ListaLocadorasProps {
}

const ListaLocadoras = (props: ListaLocadorasProps) => {

    const { locadoras, removeLocadora, selectedLocadora ,setSelectedLocadora } = useStore((state) => state, shallow);


    const tableColumns = [
        ["Descrição", "descricao"],
        ["Bairro", "bairro"],
    ]

    const onDelete = async (id: string) => {

        const onDeleteSuccess = (id: string) => {
            removeLocadora(id)
        }

        const data = await axios.delete(`http://localhost:3000/api/locadora?id=${id}`);

        if (data.status === 200) {
            onDeleteSuccess(id)
        }

    }

    const onEdit = (id: string) => {
        setSelectedLocadora(id)
        Router.push(`/locadora/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/locadora/formulario`)
    }

    useEffect(() => {
        if (selectedLocadora) {
            setSelectedLocadora()
        }
    }, [selectedLocadora])

    return (
        <>
        <TableComponent
        tableHeaderData={tableColumns}
        tableBodyData={locadoras}
        onEdit={onEdit}
        onDelete={onDelete}></TableComponent>

        <Button variant="primary" onClick={onAdd}>Adicionar</Button>
        </>
    )
}

export default ListaLocadoras;