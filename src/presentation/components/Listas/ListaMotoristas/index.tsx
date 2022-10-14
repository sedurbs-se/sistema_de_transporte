import axios from "axios"
import Router from "next/router"
import { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { IMotoristasStore } from "../../../../domain/store/motoristas"
import { useStore } from "../../../../domain/store/store"
import { Motorista } from "../../../../shared/types/Motorista"
import TableComponent from "../../Table"

export interface ListaMotoristasProps {
}


const ListaMotoristas = (props: ListaMotoristasProps) => {

    const { motoristas, removeMotorista, selectedMotorista ,setSelectedMotorista } = useStore((state) => state, shallow);

    const tableColumns = [
        ["Nome", "nome"],
        ["Celular", "celular"],
        ["Vinculo", "vinculo"],
        ["", ""]
    ];

    const onDelete = async (id: string) => {

        const onDeleteSuccess = (id: string) => {
            removeMotorista(id)
        }

        const data = await axios.delete(`http://localhost:3000/api/motorista?id=${id}`);

        if (data.status === 200) {
            onDeleteSuccess(id)
        }

    }

    const onEdit = (id: string) => {
        setSelectedMotorista(id)
        Router.push(`/motorista/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/motorista/formulario`)
    }

    useEffect(() => {
        if (selectedMotorista) {
            setSelectedMotorista()
        }
    }, [selectedMotorista])

    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={motoristas}
                onDelete={onDelete}
                onEdit={onEdit}
            />

            <Button variant="primary" onClick={onAdd}>Adicionar Novo motorista</Button>
        </>

    )
}

export default ListaMotoristas;