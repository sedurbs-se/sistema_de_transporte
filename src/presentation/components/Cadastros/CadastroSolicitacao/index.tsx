import { useStore } from "@domain/store/store";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { setModalError, setModalSuccess } from "@shared/utils/modalUtils";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "@components/InputError";
import { ICreateSolicitacaoDTO, ICreateSolicitacaoResponse, useCreateSolicitacao } from "@domain/query/createSolicitacao";
import { useEffect } from "react";
import { Solicitacao } from "@shared/types/Solicitação"
import CadastroContainer from "../../../containers/CadastroContainer"
import { onErrorResponse } from "@domain/query/createUsuario";
import dayjs from "dayjs";
import Router from "next/router";

const CadastroSolicitacao = () => {
    const {
        selectedSolicitacao,
        setSelectedSolicitacao,

        addSolictacao,
        updateSolicitacao,

        tiposSolicitacao ,
        statusSolicitacao,

        setores,

        municipios
    } = useStore(state => state, shallow);

    const validationSchema = yup.object().shape({
        usuario: yup.string().required(),
        ramal: yup.string().required(),
        num_ocupantes: yup.number().min(1).required(),
        atividade: yup.string().required(),
        data_hora_saida: yup.date().required(),
        tipo_solicitacao_id: yup.string().required(),
        status_solicitacao_id: yup.string().required(),
        setor_id: yup.string().required(),
        municipios: yup.array().of(yup.string()).min(1).required(),
        observacao: yup.string().required()
    })

    const isFetching = false;
    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(validationSchema) });

    const onSuccess = ({ solicitacao }: ICreateSolicitacaoResponse) => {

        if (selectedSolicitacao) {
           
            console.log('solicitacao', solicitacao)
            updateSolicitacao(selectedSolicitacao);
            setModalSuccess(true);
            setSelectedSolicitacao()
        } else {
            addSolictacao(solicitacao)
            setModalSuccess();
        };

        reset()
    };
    const onError = (data: onErrorResponse) => {
        setModalError(data?.response?.data?.message);
    };
    const form = watch() as ICreateSolicitacaoDTO["params"]

    const { refetch, isError } = useCreateSolicitacao({
        params: form,
        onSuccess,
        onError,
        id: selectedSolicitacao?.id
    });

    const onSubmit = async () => {
        refetch();
    };

    useEffect(() => {

        if (selectedSolicitacao) {
            Object.keys(form).forEach(key => {
                if (key == "municipios") {
                    setValue("municipios", selectedSolicitacao.municipiosolicitacao?.map(m => m.municipio.nome))
                } else if(key == "data_hora_saida") {
                    setValue("data_hora_saida", dayjs(selectedSolicitacao.data_hora_saida).locale("pt-br").format())
                }else {
                    setValue(key, selectedSolicitacao[key as keyof Solicitacao])
                }
            })
        }
    }, [selectedSolicitacao])


    return (
        <CadastroContainer
        >
            <fieldset>
                <legend>Cadastro de Solicitação</legend>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                        <Col md={6} xs={12} xl={12} xls={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Usuário</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex: João"
                                    isValid={!errors.usuario && form.usuario != ""}
                                    isInvalid={errors.usuario != undefined}
                                    {...register("usuario")}
                                />
                                {errors?.usuario?.type &&
                                    <InputError type={errors.usuario.type} form="solicitacao" field='usuario' />}
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ramal</Form.Label>
                                <Form.Control type="text" placeholder="Ex: 5667"
                                    {...register("ramal")}
                                    isValid={!errors.ramal && form.ramal !== ""}
                                    isInvalid={errors.ramal != undefined}

                                />
                                {errors?.ramal?.type &&
                                    <InputError type={errors.ramal.type} form="solicitacao" field='ramal' />}
                            </Form.Group>
                        </Col>

                        <Col md={6} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Setor</Form.Label>
                                <Form.Select
                                    {...register("setor_id", { required: true })}
                                    isValid={!errors.setor && form.setor_id !== ""}
                                    isInvalid={errors.setor != undefined}
                                >
                                    <option value="">Selecione um setor</option>
                                    {setores.map((setor: any) => (
                                        <option key={setor.id} value={setor.id}>{setor.codigo} - {setor.sigla}</option>
                                    ))}
                                </Form.Select>
                                {errors?.setor?.type && <InputError type={errors.setor.type} form="solicitacao" field='setor' />}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>

                        <Col md={6} xs={3} xl={3} xls={3}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>N. Ocupantes</Form.Label>
                                <Form.Control
                                    min="1"
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
                        <Col md={6} xs={4} xl={4} xls={4}>
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
                        <Col md={6} xs={5} xl={5} xls={5}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data e Hora de saída</Form.Label>
                                <Form.Control type="datetime-local" placeholder="Data de saída"
                                    {...register("data_hora_saida")}
                                    value={
                                        form.data_hora_saida?.slice(0, 16)
                                    }
                                    defaultValue={dayjs().locale('pt-br').format().slice(0,16)}
                                    isValid={!errors.data_hora_saida && form.data_hora_saida !== ""}
                                    isInvalid={errors.data_hora_saida != undefined}
                                />
                                {errors?.data_hora_saida?.type && <InputError type={errors.data_hora_saida.type} form="solicitacao" field='data_saida' />}
                            </Form.Group>
                        </Col>

                    </Row>

                    <Row>
                        <Col md={6} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select {...register("tipo_solicitacao_id")}
                                    isValid={!errors.tipo_solicitacao && form.tipo_solicitacao_id !== ""}
                                    isInvalid={errors.tipo_solicitacao != undefined}
                                >
                                    <option value="">Selecione um Tipo</option>
                                    {tiposSolicitacao.map(tipo => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                                    ))}

                                </Form.Select>
                                {errors?.tipo_solicitacao?.type &&
                                    <InputError type={errors.tipo_solicitacao.type} form="solicitacao" field='tipo_solicitacao' />}
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Select {...register("status_solicitacao_id")}
                                    isValid={!errors.status_solicitacao && form.status_solicitacao_id !== ""}
                                    isInvalid={errors.status_solicitacao != undefined}
                                >
                                    <option value="">Selecione um Status</option>
                                    {statusSolicitacao.map(status => (
                                        <option 
                                        selected={status.nome.includes("ESPERA")}
                                        key={status.id} value={status.id}>{status.nome}</option>
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
                    <Col md={12} xs={12} xl={12} xls={12}>
                        <Button variant="primary" type="submit" disabled={isFetching}>
                            {isFetching ? 'Aguarde...' : 'Confirmar'}
                        </Button>
                    </Col>
                </Form>
            </fieldset>
        </CadastroContainer>
    )

};

export default CadastroSolicitacao;