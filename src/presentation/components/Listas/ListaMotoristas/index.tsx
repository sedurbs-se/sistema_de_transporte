import { Button, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "../../../../domain/store/store"
import { Motorista } from "../../../../shared/types/Motorista"
import TableComponent from "../../Table"

export interface ListaMotoristasProps {
}


const ListaMotoristas = (props: ListaMotoristasProps) => {

    const { motoristas }: { motoristas: Motorista[] } = useStore((state) => state, shallow);

    const tableColumns = [
        ["Nome", "nome"],
        ["Celular", "celular"],
        ["Vinculo", "vinculo"],
        ["", ""]
    ];


    return (<TableComponent
        tableHeaderData={tableColumns}
        tableBodyData={motoristas}
        onDelete={(id) => console.log(id)}
        onEdit={(id) => console.log(id)}
    />)
}

export default ListaMotoristas;