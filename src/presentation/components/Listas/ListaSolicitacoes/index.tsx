import { Badge, Button, Container, Table } from "react-bootstrap"
import { Solicitacao } from "../../../../shared/types/Solicitação"
import getBadgeTypeByStatus from "../../../../shared/utils/getBadgeTypeByStatus"


export interface ListaSolicitacoesProps {
    Solicitacoes: Solicitacao[]
}

const ListaSolicitacoes = (props: ListaSolicitacoesProps) => {
    return (
  <Table striped bordered hover>
      <thead>
          <tr>
              <th>Editar</th>
              <th>Usuário</th>
              <th>Ramal</th>
              <th>Atividade</th>
              <th>Município</th>
              <th>Ocup.</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Status</th>
          </tr>
      </thead>
      <tbody>
          {
              props.Solicitacoes.map((solicitacao) => (
                  <tr>
                      <td><Button>Editar</Button></td>
                      <td>{solicitacao.usuario_id}</td>
                      <td>{solicitacao.ramal_id}</td>
                      <td>{solicitacao.atividade}</td>
                      <td>{solicitacao.municipio_id}</td>
                      <td>{solicitacao.num_ocupantes}</td>
                      <td>{solicitacao.data}</td>
                      <td>{solicitacao.hora}</td>
                      <td><Badge pill bg={getBadgeTypeByStatus(solicitacao.status_id)}>{solicitacao.status_id}</Badge></td>
                  </tr>
              ))
          }
      </tbody>
  </Table>
    )
}

export default ListaSolicitacoes;