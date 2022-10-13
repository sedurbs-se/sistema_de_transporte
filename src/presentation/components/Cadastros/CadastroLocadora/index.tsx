import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Locadora } from "../../../../domain/types/Locadora";
import style from "./index.module.scss"

export interface CadastroLocadoraProps {
    locadora?: Locadora
}

const CadastroLocadoras = (props: CadastroLocadoraProps) => {
    return (
      <Container
      style={{border:'1px solid gray', borderRadius:'4px', padding:'15px', marginBottom:'15px'}}
      >
        <h3
        className={style["title"]}
        >Cadastro</h3>
        <Form >
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descrição</Form.Label>
        <Form.Control type="text" placeholder="" defaultValue={props.locadora?.descricao} />
      </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.locadora?.sigla}>
        <Form.Label>Sigla</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.locadora?.endereço}>
        <Form.Label>Endereço</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Row>
        <Col>
        <Form.Group className="mb-3"  controlId="formBasicPassword">
        <Form.Label>Bairro</Form.Label>
        <Form.Control type="text" placeholder="" defaultValue={props.locadora?.bairro} />
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.locadora?.telefone}>
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Salvar
      </Button>
        </Form>
        </Container>
    )
}


export default CadastroLocadoras;