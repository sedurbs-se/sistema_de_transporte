import { Form, Button, Container } from "react-bootstrap";
import { Setor } from "../../../../shared/types/Setor"
import style from "../CadastroLocadora/index.module.scss"

export interface CadastroSetorProps {
  setor?: Setor
}

const CadastroSetor = (props: CadastroSetorProps) => {
  return (
    <Container
      style={{ border: '1px solid gray', borderRadius: '4px', padding: '15px', marginBottom: '15px' }}
    >
      <h3
        className={style["title"]}
      >Cadastro</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Código</Form.Label>
          <Form.Control type="text" placeholder="Insira o código do setor" defaultValue={props.setor?.codigo} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" as="textarea" placeholder="" defaultValue={props.setor?.descricao} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.setor?.sigla}>
          <Form.Label>Sigla</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.setor?.responsavel}>
          <Form.Label>Responsável</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.setor?.ramal}>
          <Form.Label>Ramal</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  )
}


export default CadastroSetor;