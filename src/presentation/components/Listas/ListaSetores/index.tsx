import { Button, Table } from "react-bootstrap"
import { Setor } from "../../../../shared/types/Setor"

export interface ListaSetoresProps {
    setores: Setor[]
}


const ListaSetores = (props: ListaSetoresProps) => {
    return(
    <Table striped bordered hover>
    <thead>
        <tr>
            <th>Editar</th>
            <th>Excluir</th>
            <th>Código</th>
            <th>Sigla</th>
            <th>Ramal</th>
        </tr>
    </thead>
    <tbody>
        {
            props.setores.map((setor) => (
                <tr>
                    <td><Button>Editar</Button></td>
                    <td><Button variant="danger">Excluir</Button></td>
                    <td>{setor.codigo}</td>
                    <td>{setor.sigla}</td>
                    <td>{setor.ramal}</td>
                </tr>
            ))
        }
    </tbody>
</Table>)
}

export default ListaSetores;