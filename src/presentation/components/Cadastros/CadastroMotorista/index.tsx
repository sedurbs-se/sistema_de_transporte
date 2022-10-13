import { Form, Button, Container } from "react-bootstrap";
import { Motorista } from "../../../../domain/types/Motorista";
import style from "../CadastroLocadora/index.module.scss"

export interface CadastroMotoristaProps {
    motorista?: Motorista
}

const CadastroMotorista = (props: CadastroMotoristaProps) => {
    return (
        <Container
        style={{border:'1px solid gray', borderRadius:'4px', padding:'15px', marginBottom:'15px'}}
        >
          <h3
          className={style["title"]}
          >Cadastro</h3>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nome do motorista</Form.Label>
        <Form.Control type="text" placeholder="Insira o nome do motorista" defaultValue={props.motorista?.nome} />
      </Form.Group>
      <Form.Group className="mb-3"  controlId="formBasicPassword">
        <Form.Label>Celular</Form.Label>
        <Form.Control type="text" placeholder="Ex: (79) 9 9999-9999" defaultValue={props.motorista?.celular} />
      </Form.Group>
      <Form.Label>Vínculo</Form.Label>
      <Form.Select className="mb-3" defaultValue={props.motorista?.vinculo_id}>
        <option>Selecione o vínculo do motorista</option>
      </Form.Select>
      <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.motorista?.bairro}>
        <Form.Label>Bairro</Form.Label>
        <Form.Control type="text" placeholder="Ex: AMERICA" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.motorista?.endereco}>
        <Form.Label>Endereço</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.motorista?.telefone}>
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" placeholder="Ex: (79) 9 9999-9999" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
        </Form>
        </Container>
    )
}


export default CadastroMotorista;