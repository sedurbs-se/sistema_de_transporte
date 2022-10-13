import { Button, Table } from "react-bootstrap";
import { Veiculos } from "../../../../shared/types/Veiculos";

export interface ListaVeiculosProps {
    veiculos: Veiculos[]
}

const ListaVeiculos = (props: ListaVeiculosProps) => {
    return (
        <Table striped bordered hover>
    <thead>
        <tr>
            <th>Editar</th>
            <th>Excluir</th>
            <th>Placa</th>
            <th>Descrição</th>
            <th>Km Atual</th>
            <th>Tipo</th>
        </tr>
    </thead>
    <tbody>
        {
            props.veiculos.map((veiculo) => (
                <tr>
                    <td><Button>Editar</Button></td>
                    <td><Button variant="danger">Excluir</Button></td>
                    <td>{veiculo.placa}</td>
                    <td>{veiculo.descricao}</td>
                    <td>{veiculo.quilometragem}</td>
                    <td>{veiculo.tipo_frota_id}</td>
                </tr>
            ))
        }
    </tbody>
</Table>
    )
}

export default ListaVeiculos;