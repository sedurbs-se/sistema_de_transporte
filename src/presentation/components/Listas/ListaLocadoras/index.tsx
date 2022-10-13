import { Button, Table } from "react-bootstrap"
import { Locadora } from "../../../../domain/types/Locadora"

export interface ListaLocadorasProps {
    locadoras: Locadora[]
}

const ListaLocadoras = (props: ListaLocadorasProps) => {
    return (
        <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>Editar</th>
                <th>Excluir</th>
                <th>Descrição</th>
                <th>Bairro</th>
            </tr>
        </thead>
        <tbody>
            {
                props.locadoras.map((locadora) => (
                    <tr>
                        <td><Button>Editar</Button></td>
                        <td><Button variant="danger">Excluir</Button></td>
                        <td>{locadora.descricao}</td>
                        <td>{locadora.bairro}</td>
                    </tr>
                ))
            }
        </tbody>
    </Table>
    )
}

export default ListaLocadoras;