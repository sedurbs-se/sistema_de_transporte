import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { Veiculos } from "../../../../domain/types/Veiculos";
import style from "../CadastroLocadora/index.module.scss"

export interface CadastroVeiculoProps {
    veiculo?: Veiculos
}

const CadastroVeiculo = (props: CadastroVeiculoProps) => {
    return (
        <Container
            style={{ border: '1px solid gray', borderRadius: '4px', padding: '15px', marginBottom: '15px' }}
        >
            <h3
                className={style["title"]}
            >Cadastro</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Placa</Form.Label>
                    <Form.Control type="text" placeholder="___-___" defaultValue={props.veiculo?.placa} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" placeholder="" defaultValue={props.veiculo?.descricao} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.veiculo?.componentes}>
                    <Form.Label>Componentes</Form.Label>
                    <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.veiculo?.quilometragem}>
                            <Form.Label>Km Inicial</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPassword" defaultValue={props.veiculo?.quilometragem}>
                            <Form.Label>Km Atual</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Label>Tipo de frota</Form.Label>
                <Form.Select className="mb-3" defaultValue={props.veiculo?.tipo_frota_id}>
                    <option>Selecione o tipo de frota</option>
                </Form.Select>
                <Row>
                    <Col>
                        <Form.Label>Locadora</Form.Label>
                        <Form.Select className="mb-3" defaultValue={props.veiculo?.tipo_frota_id}>
                            <option>Selecione a locadora</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Setor</Form.Label>
                        <Form.Select className="mb-3" defaultValue={props.veiculo?.tipo_frota_id}>
                            <option>Selecione o setor</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Observação</Form.Label>
                    <Form.Control type="text" as="textarea" placeholder="" defaultValue={props.veiculo?.descricao} />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Salvar
                </Button>
            </Form>
        </Container>
    )
}


export default CadastroVeiculo;