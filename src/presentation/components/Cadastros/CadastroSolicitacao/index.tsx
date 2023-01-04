import { useStore } from "@domain/store/store";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { setModalSuccess } from "@shared/utils/modalUtils";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "@components/InputError";
import { ICreateSolicitacaoDTO, ICreateSolicitacaoResponse, useCreateSolicitacao } from "@domain/query/createSolicitacao";

const CadastroSolicitacao = () => {

    const {
        selectedSolicitacao,
        setSelectedSolicitacao,

        addSolictacao,
        updateSolicitacao,

        tiposSolcitacao,
        statusSolicitacao,

        setores,

        municipios
    } = useStore(state => state, shallow);

    console.log(selectedSolicitacao)
    const validationSchema = yup.object().shape({
        usuario: yup.string().required(),
        ramal: yup.string().required(),
        num_ocupantes: yup.number().min(1).required(),
        atividade: yup.string().required(),
        data_hora_saida: yup.date().required(),
        tipo_solicitacao: yup.string().required(),
        status_solicitacao: yup.string().required(),
        setor: yup.string().required(),
        municipios: yup.array().of(yup.string()).min(1).required(),
        observacao: yup.string().required()
    })

    const isFetching = false;

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({ resolver: yupResolver(validationSchema) });

    const onSuccess = ({ solicitacao }: ICreateSolicitacaoResponse) => {
        if (selectedSolicitacao) {
            setSelectedSolicitacao()
            updateSolicitacao(solicitacao);
            setModalSuccess(true);
        } else {
            addSolictacao(solicitacao)
            setModalSuccess();
        }
    };

    const form = watch() as ICreateSolicitacaoDTO["params"]

    const { refetch, isError } = useCreateSolicitacao({
        params: form,
        onSuccess,
        id: selectedSolicitacao?.id
    });

    const onSubmit = async () => {
        refetch();
    };
    console.log(form)
    return (
        <Container
            style={{ border: '1px solid gray', borderRadius: '4px', padding: '15px', marginBottom: '15px' }}
        >
            <fieldset>
                <legend>Cadastro de Solicitação</legend>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                        <Col md={6} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Usuario"
                                    isValid={!errors.usuario && form.usuario != ""}
                                    isInvalid={errors.usuario != undefined}
                                    {...register("usuario")}
                                />
                                {errors?.usuario?.type &&
                                    <InputError type={errors.usuario.type} form="solicitacao" field='usuario' />}
                            </Form.Group>
                        </Col>
                        <Col md={3} xs={1} xl={1} xls={1}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ramal</Form.Label>
                                <Form.Control type="text" placeholder="Ramal"
                                    {...register("ramal")}
                                    isValid={!errors.ramal && form.ramal !== ""}
                                    isInvalid={errors.ramal != undefined}

                                />
                                {errors?.ramal?.type &&
                                    <InputError type={errors.ramal.type} form="solicitacao" field='ramal' />}
                            </Form.Group>
                        </Col>

                        <Col md={3} xs={3} xl={3} xls={3}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Setor</Form.Label>
                                <Form.Select
                                    {...register("setor", { required: true })}
                                    isValid={!errors.setor && form.setor !== ""}
                                    isInvalid={errors.setor != undefined}
                                >
                                    <option value="">Selecione um setor</option>
                                    {setores.map(setor => (
                                        <option key={setor.id} value={setor.id}>{setor.codigo} - {setor.sigla}</option>
                                    ))}
                                </Form.Select>
                                {errors?.setor?.type && <InputError type={errors.setor.type} form="solicitacao" field='setor' />}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>

                        <Col md={2} xs={2} xl={2} xls={2}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>N. Ocupates</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="N. Ocupates"
                                    {...register("num_ocupantes",
                                        {
                                            valueAsNumber: true,
                                        })}
                                    isValid={!errors.num_ocupantes && form.num_ocupantes <= 0}
                                    isInvalid={errors.num_ocupantes != undefined}
                                />
                                {errors?.num_ocupantes?.type &&
                                    <InputError type={errors.num_ocupantes.type} form="solicitacao" field='num_ocupantes' />}
                            </Form.Group>
                        </Col>
                        <Col md={4} xs={4} xl={4} xls={4}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Atividade</Form.Label>
                                <Form.Control type="text" placeholder="Atividade"
                                    {...register("atividade")}
                                    isValid={!errors.atividade && form.atividade !== ""}
                                    isInvalid={errors.atividade != undefined}
                                />
                                {errors?.atividade?.type &&
                                    <InputError type={errors.atividade.type} form="solicitacao" field='atividade' />}
                            </Form.Group>
                        </Col>
                        <Col md={3} xs={3} xl={3} xls={3}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data e Hora de saída</Form.Label>
                                <Form.Control type="datetime-local" placeholder="Data de saída"
                                    {...register("data_hora_saida")}
                                    isValid={!errors.data_hora_saida && form.data_hora_saida !== ""}
                                    isInvalid={errors.data_hora_saida != undefined}
                                />
                                {errors?.data_hora_saida?.type && <InputError type={errors.data_hora_saida.type} form="solicitacao" field='data_saida' />}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>
                        <Col md={3} xs={3} xl={3} xls={3}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select {...register("tipo_solicitacao")}
                                    isValid={!errors.tipo_solicitacao && form.tipo_solicitacao !== ""}
                                    isInvalid={errors.tipo_solicitacao != undefined}
                                >
                                    <option value="">Selecione um Tipo</option>
                                    {tiposSolcitacao.map(tipo => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                                    ))}

                                </Form.Select>
                                {errors?.tipo_solicitacao?.type &&
                                    <InputError type={errors.tipo_solicitacao.type} form="solicitacao" field='tipo_solicitacao' />}
                            </Form.Group>
                        </Col>
                        <Col md={3} xs={3} xl={3} xls={3}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Select {...register("status_solicitacao")}
                                    isValid={!errors.status_solicitacao && form.status_solicitacao !== ""}
                                    isInvalid={errors.status_solicitacao != undefined}
                                >
                                    <option value="">Selecione um Status</option>
                                    {statusSolicitacao.map(status => (
                                        <option key={status.id} value={status.id}>{status.nome}</option>
                                    ))}
                                </Form.Select>
                                {errors?.status_solicitacao?.type &&
                                    <InputError type={errors.status_solicitacao.type} form="solicitacao" field='status_solicitacao' />}
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
                                        value={municipio}
                                        isValid={!errors.municipios && form.municipios?.length > 0}
                                        isInvalid={errors.municipios != undefined}
                                        {...register("municipios")}
                                    />
                                ))
                            }

                        </Card.Body>
                    </Card>
                    {errors.municipios?.type && <InputError type={errors.municipios.type} form="solicitacao" field='municipios' />}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Observação</Form.Label>
                        <Form.Control type="textarea" {...register("observacao")}
                            isValid={!errors.observacao && form.observacao?.length > 0}
                            isInvalid={errors.observacao != undefined}
                        />
                        {errors?.observacao?.type &&
                            <InputError type={errors.observacao.type} form="solicitacao" field='observacao' />}
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={isFetching}>
                        {isFetching ? 'Aguarde...' : 'Confirmar'}
                    </Button>

                </Form>
            </fieldset>
        </Container>
    )

};

export default CadastroSolicitacao;