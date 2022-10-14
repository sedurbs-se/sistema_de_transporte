import Router from "next/router";
import { Button, Table } from "react-bootstrap";
import shallow from "zustand/shallow";
import { useStore } from "../../../../domain/store/store";
import TableComponent from "../../Table";


const ListaVeiculos = () => {

    const { veiculos } = useStore(state => state, shallow);

    const tableColumns = [
        ["Placa", "placa"],
        ["Descrição", "descricao"],
        ["Km Atual", "quilometragemAtual"],
        ["Tipo", "tipo_frota_id"],
        ["", ""]
    ];

    const onDelete = async (id: string) => {
        const onDeleteSuccess = (id: string) => {
        }
    }

    const onEdit = (id: string) => {
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