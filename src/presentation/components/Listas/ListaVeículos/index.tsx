import Router from "next/router";
import { Button, Table } from "react-bootstrap";
import shallow from "zustand/shallow";
import { useStore } from "@domain/store/store";
import TableComponent from "@components/Table";


const ListaVeiculos = () => {

    const { veiculos } = useStore((state) => state, shallow);

    const tableColumns = [
        ["Placa", "placa"],
        ["Descrição", "descricao"],
        ["Km Atual", "quilometragemAtual"],
        ["Tipo", "tipoFrota"],
        ["", ""]
    ];

    const onDelete = async (id: string) => {
        const onDeleteSuccess = (id: string) => {
        }
    }

    const onEdit = (id: string) => {
        Router.push(`/veiculo/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push("/veiculo/formulario");
    }

    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={veiculos}
                onDelete={onDelete}
                onEdit={onEdit}
            />

            <Button onClick={onAdd}>Adicionar</Button>
        </>

    )
}

export default ListaVeiculos;