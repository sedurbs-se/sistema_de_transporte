import { useStore } from "@domain/store/store";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";


const CadastroSolicitacao = () => {

    const {
        // selectedSolicitacao,
        // setSelectedLocadora

        // addSolictacao,
        // updateSolicitacao,


        tiposSolcitacao,
        statusSolicitacao,

        setores,

        municipios
    } = useStore(state => state, shallow);

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    const onSubmit = () => {

    }

    return (
        <fieldset>
            <legend>Cadastro de Solicitação</legend>
            <Form onSubmit={handleSubmit(onSubmit)}>


                <Row>
                    <Col md={6} xs={6} xl={6} xls={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" placeholder="Usuario" {...register("usuario", { required: true })} />
                        </Form.Group>
                    </Col>
                    <Col md={3} xs={1} xl={1} xls={1}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Ramal</Form.Label>
                            <Form.Control type="text" placeholder="Ramal" {...register("ramal", { required: true })} />
                        </Form.Group>
                    </Col>

                    <Col md={3} xs={3} xl={3} xls={3}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Setor</Form.Label>
                            <Form.Select {...register("setor", { required: true })}>
                                <option value="">Selecione um setor</option>
                                {setores.map(setor => (
                                    <option key={setor.id} value={setor.id}>{setor.descricao}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>

                </Row>

                <Row>

                    <Col md={2} xs={2} xl={2} xls={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>N. Ocupates</Form.Label>
                            <Form.Control type="text" placeholder="N. Ocupates" {...register("num_ocupantes", { required: true })} />
                        </Form.Group>
                    </Col>
                    <Col md={4} xs={4} xl={4} xls={4}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Atividade</Form.Label>
                            <Form.Control type="text" placeholder="Atividade" {...register("atividade", { required: true })} />
                        </Form.Group>
                    </Col>
                    <Col md={2} xs={2} xl={2} xls={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Data de saída</Form.Label>
                            <Form.Control type="text" placeholder="Data de saída" {...register("data_saida", { required: true })} />
                        </Form.Group>
                    </Col>
                    <Col md={2} xs={2} xl={2} xls={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Hora de saída</Form.Label>
                            <Form.Control type="text" placeholder="Hora de saída" {...register("hora_saida", { required: true })} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={2} xs={2} xl={2} xls={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select {...register("tipo")}>
                                {tiposSolcitacao.map(tipo => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={2} xs={2} xl={2} xls={2}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Status</Form.Label>
                            <Form.Select {...register("status")}>
                                {statusSolicitacao.map(status => (
                                    <option key={status.id} value={status.id}>{status.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Card
                    style={{ overflowY: "auto", maxWidth: "350px", maxHeight: "200px" }}>
                    <Card.Header>Municipios</Card.Header>

                    <Card.Body>

                        {

                            municipios.map(municipio => (
                                // Municipio
                                <Form.Check
                                    key={municipio}
                                    type="checkbox"
                                    label={municipio}
                                />
                            ))
                        }
                    </Card.Body>
                </Card>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Observação</Form.Label>
                    <Form.Control type="textarea" {...register("observacao")} />
                </Form.Group>

            </Form>
        </fieldset>)

};

export default CadastroSolicitacao;