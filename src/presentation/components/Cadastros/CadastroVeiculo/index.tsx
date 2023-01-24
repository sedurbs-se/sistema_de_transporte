import { Veiculo } from "@prisma/client";
import { useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useCreateVeiculo, ICreateVeiculoDTO, ICreateVeiculoResponse } from "@domain/query/createVeiculo";
import { useStore } from "@domain/store/store";
import style from "../CadastroLocadora/index.module.scss"
import { setModalError, setModalSuccess } from "@shared/utils/modalUtils";
import * as yup from 'yup';
import { normalizePlaca, placaVeiculoRegex } from "@shared/utils/formUtils";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "@components/InputError";
import CadastroContainer from "../../../containers/CadastroContainer";
import { onErrorResponse } from "@domain/query/createUsuario";


const CadastroVeiculo = () => {

    const {
        addVeiculo,
        selectedVeiculo,
        setSelectedVeiculo,
        updateVeiculo,

        /// Setor
        setores,
        // Locadoras
        locadoras,
        // Frotas,
        tipoFrotas,

    } = useStore(state => state, shallow);

    const validationSchema = yup.object().shape({
        placa: yup.string().required().matches(placaVeiculoRegex),
        nome: yup.string().required(),
        componentes: yup.string().required(),
        quilometragemAtual: yup.number().transform(value => (isNaN(value) ? undefined : value)).min(yup.ref("quilometragemInicial")).required(),
        quilometragemInicial: yup.number().transform(value => (isNaN(value) ? undefined : value)).required(),
        tipo_frota_id: yup.string().required(),
        locadora_id: yup.string().required(),
        setor_id: yup.string().required(),
        observacao: yup.string().required()
    })


    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(validationSchema) });



    const onSuccess = ({ veiculo }: ICreateVeiculoResponse) => {
        if (selectedVeiculo) {
            setSelectedVeiculo()
            updateVeiculo(veiculo);
            setModalSuccess(true);
        } else {
            addVeiculo(veiculo)
            setModalSuccess();
        };

        reset()
    };
    const onError = (data: onErrorResponse) => {
        setModalError(data?.response?.data?.message);
    };
    const form = watch() as ICreateVeiculoDTO['params'];

    const placaValue = form.placa

    useEffect(() => {
        setValue('placa', normalizePlaca(placaValue))
    }, [placaValue])

    const { refetch, isError, isFetching } = useCreateVeiculo({
        params: form,
        onSuccess,
        onError,
        id: selectedVeiculo?.id
    });

    const onSubmit = async () => {
        refetch();
    };

    useEffect(() => {
        if (selectedVeiculo) {
            Object.keys(form).forEach(key => {
                setValue(key, selectedVeiculo[key as keyof Veiculo])
            })
        }
    }, [selectedVeiculo])


    return (
        <CadastroContainer size="md"
        >
            <h4 >Cadastro de Veiculo</h4>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPlaca">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control
                                isValid={!errors.placa && form.placa !== ""}
                                isInvalid={errors.placa != undefined}
                                {...register("placa")} />
                            {errors?.placa?.type && <InputError type={errors.placa.type} form="veiculo" field='placa' />}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDesc">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                isValid={!errors.nome && form.nome !== ""}
                                isInvalid={errors.nome != undefined}
                                {...register("nome")} />
                            {errors?.nome?.type && <InputError type={errors.nome.type} form="veiculo" field='nome' />}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicComponentes">
                            <Form.Label>Componentes</Form.Label>
                            <Form.Control
                                isValid={!errors.componentes && form.componentes !== ""}
                                isInvalid={errors.componentes != undefined}
                                {...register("componentes")} />
                            {errors?.componentes?.type && <InputError type={errors.componentes.type} form="veiculo" field='componentes' />}
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicQuilometragemInicial">
                            <Form.Label>Quilometragem Inicial</Form.Label>
                            <Form.Control
                                isValid={!errors.quilometragemInicial && !!form.quilometragemInicial}
                                isInvalid={errors.quilometragemInicial != undefined}
                                {...register("quilometragemInicial")} />
                            {errors?.quilometragemInicial?.type && <InputError type={errors.quilometragemInicial.type} form="veiculo" field='quilometragemInicial' />}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicQuilometragemAtual">
                            <Form.Label>Quilometragem Atual</Form.Label>
                            <Form.Control
                                isValid={!errors.quilometragemAtual && !!form.quilometragemAtual}
                                isInvalid={errors.quilometragemAtual != undefined}
                                {...register("quilometragemAtual")} />
                            {errors?.quilometragemAtual?.type && <InputError type={errors.quilometragemAtual.type} form="veiculo" field='quilometragemAtual' />}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicTipoDeFotra">
                            <Form.Label>Tipo de Frotas</Form.Label>
                            <Form.Select
                                isValid={!errors.tipo_frota_id && form.tipo_frota_id !== ""}
                                isInvalid={errors.tipo_frota_id != undefined}
                                {...register("tipo_frota_id")} >
                                <option value="">Selecione</option>
                                {tipoFrotas.map((tipoFrota) => (
                                    <option key={tipoFrota.id} value={tipoFrota.id}>{tipoFrota.nome}</option>
                                ))}
                            </Form.Select>
                            {errors?.tipo_frota_id?.type && <InputError type={errors.tipo_frota_id.type} form="veiculo" field='tipo_frota_id' />}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLocadora">
                            <Form.Label>Locadora</Form.Label>
                            <Form.Select
                                isValid={!errors.locadora_id && form.locadora_id !== ""}
                                isInvalid={errors.locadora_id != undefined}
                                {...register("locadora_id")} >
                                <option value="">Selecione</option>
                                {locadoras.map((locadora) => (
                                    <option key={locadora.id} value={locadora.id}>{locadora.nome}</option>
                                ))}
                            </Form.Select>
                            {errors?.locadora_id?.type && <InputError type={errors.locadora_id.type} form="veiculo" field='locadora_id' />}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicSetor">
                            <Form.Label>Setor</Form.Label>
                            <Form.Select
                                isValid={!errors.setor_id && form.setor_id !== ""}
                                isInvalid={errors.setor_id != undefined}
                                {...register("setor_id")} >
                                <option value="">Selecione</option>
                                {setores.map((setor) => (
                                    <option key={setor.id} value={setor.id}>{setor.nome}</option>
                                ))}
                            </Form.Select>
                            {errors?.setor_id?.type && <InputError type={errors.setor_id.type} form="veiculo" field='setor_id' />}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicObersvacao">
                            <Form.Label>Observação</Form.Label>
                            <Form.Control
                                isValid={!errors.observacao && form.observacao !== ""}
                                isInvalid={errors.observacao != undefined}
                                {...register("observacao")} />
                            {errors?.observacao?.type && <InputError type={errors.observacao.type} form="veiculo" field='observacao' />}
                        </Form.Group>
                    </Col>
                </Row>

                <Button className="mt-2" variant="primary" type="submit" disabled={isFetching}>
                    {isFetching ? 'Aguarde...' : 'Confirmar'}
                </Button>

            </Form>

        </CadastroContainer>
    )
}


export default CadastroVeiculo;