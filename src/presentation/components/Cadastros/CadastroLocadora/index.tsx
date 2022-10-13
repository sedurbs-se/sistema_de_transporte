import { Form, Button } from "react-bootstrap";
import { Locadora } from "../../../../domain/types/Locadora";

export interface CadastroLocadoraProps {
    locadora?: Locadora
}

const CadastroLocadoras = (props: CadastroLocadoraProps) => {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descrição</Form.Label>
        <Form.Control type="text" as="textarea" placeholder="" defaultValue={props.locadora?.descricao} />
      </Form.Group>
      <Form.Group className="mb-3"  controlId="formBasicPassword">
        <Form.Label>Bairro</Form.Label>
        <Form.Control type="text" placeholder="" defaultValue={props.locadora?.bairro} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.locadora?.endereço}>
        <Form.Label>Endereço</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.locadora?.telefone}>
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.locadora?.sigla}>
        <Form.Label>Sigla</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
        </Form>
    )
}


export default CadastroLocadoras;