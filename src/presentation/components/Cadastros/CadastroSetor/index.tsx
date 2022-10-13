import { Form, Button } from "react-bootstrap";
import { Setor } from "../../../../shared/types/Setor";

export interface CadastroSetorProps {
    setor?: Setor
}

const CadastroSetor = (props: CadastroSetorProps) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Código</Form.Label>
        <Form.Control type="text" placeholder="Insira o código do setor" defaultValue={props.setor?.codigo} />
      </Form.Group>
      <Form.Group className="mb-3"  controlId="formBasicPassword">
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
    )
}


export default CadastroSetor;