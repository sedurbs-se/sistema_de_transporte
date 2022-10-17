import axios from "axios"
import Router from "next/router"
import { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"

export interface ListaSetoresProps {
}


const ListaSetores = (props: ListaSetoresProps) => {

    const { setores , removeSetor, selectedSetor ,setSelectedSetor } = useStore((state) => state, shallow);

    const tableColumns = [
        ["Código","codigo"],
        ["Sigla", "sigla"],
        ['Ramal',"ramal"],
        ["", ""]
    ]

    const onDelete = async (id: string) => {

        const onDeleteSuccess = (id: string) => {
            removeSetor(id)
        }

        const data = await axios.delete(`http://localhost:3000/api/setor?id=${id}`);

        if (data.status === 200) {
            onDeleteSuccess(id)
        }

    }

    const onEdit = (id: string) => {
        setSelectedSetor(id)
        Router.push(`/setor/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/setor/formulario`)
    }

    useEffect(() => {
        if (selectedSetor) {
            setSelectedSetor()
        }
    }, [selectedSetor])

    return(
        <>
        <TableComponent
        tableHeaderData={tableColumns}
        tableBodyData={setores}
        onDelete={onDelete}
        onEdit={onEdit}
        ></TableComponent>

        <Button onClick={onAdd}>Adicionar</Button>
        </>

            )
}

export default ListaSetores;