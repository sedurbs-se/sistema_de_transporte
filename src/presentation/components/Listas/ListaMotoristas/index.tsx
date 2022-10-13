import { Button, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "../../../../domain/store/store"
import { Motorista } from "../../../../shared/types/Motorista"

export interface ListaMotoristasProps {
}


const ListaMotoristas = (props: ListaMotoristasProps) => {

    const { motoristas }: { motoristas: Motorista[] } = useStore((state) => state, shallow);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Editar</th>
                    <th>Excluir</th>
                    <th>Descrição</th>
                    <th>Celular</th>
                    <th>Vínculo</th>
                </tr>
            </thead>
            <tbody>
                {
                    motoristas.map((motorista) => (
                        <tr>
                            <td><Button>Editar</Button></td>
                            <td><Button variant="danger">Excluir</Button></td>
                            <td>{motorista.nome}</td>
                            <td>{motorista.celular}</td>
                            <td>{motorista.vinculo_id}</td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>)
}

export default ListaMotoristas;