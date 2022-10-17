import { Veiculo } from "@prisma/client";
import { useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useCreateVeiculo, ICreateVeiculoDTO, ICreateVeiculoResponse } from "@domain/query/createVeiculo";
import { useStore } from "@domain/store/store";
import style from "../CadastroLocadora/index.module.scss"


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

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    const onSuccess = ({ veiculo }: ICreateVeiculoResponse) => {
        if (selectedVeiculo) {
            setSelectedVeiculo()
            updateVeiculo(veiculo);
        } else {
            addVeiculo(veiculo)
        }
    };

    const form = watch() as ICreateVeiculoDTO['params'];

    const { refetch, isError } = useCreateVeiculo({
        params: form,
        onSuccess,
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
        <Container
            style={{ border: '1px solid gray', borderRadius: '4px', padding: '15px', marginBottom: '15px' }}
        >
            <h3 className={style["title"]}>Cadastro</h3>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicPlaca">
                            <Form.Label>Placa</Form.Label>
                            <Form.Control {...register("placa", { required: "Por favor escreva o nome do motorista!" })} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicDesc">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control {...register("descricao", { required: "Por favor escreva o nome do motorista!" })} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicComponentes">
                            <Form.Label>Componentes</Form.Label>
                            <Form.Control {...register("componentes", { required: "Por favor escreva o nome do motorista!" })} />
                        </Form.Group>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicQuilometragemInicial">
                            <Form.Label>Quilometragem Inicial</Form.Label>
                            <Form.Control {...register("quilometragemInicial", { required: "Por favor escreva o nome do motorista!" })} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicQuilometragemAtual">
                            <Form.Label>Quilometragem Atual</Form.Label>
                            <Form.Control {...register("quilometragemAtual", { required: "Por favor escreva o nome do motorista!" })} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicTipoDeFotra">
                            <Form.Label>Tipo de Frotas</Form.Label>
                            <Form.Select {...register("tipo_frota_id", { required: "Por favor escreva o nome do motorista!" })} >
                                <option value="">Selecione</option>
                                {tipoFrotas.map((tipoFrota) => (
                                    <option key={tipoFrota.id} value={tipoFrota.id}>{tipoFrota.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLocadora">
                            <Form.Label>Locadora</Form.Label>
                            <Form.Select {...register("locadora_id", { required: "Por favor escreva o nome do motorista!" })} >
                                <option value="">Selecione</option>
                                {locadoras.map((locadora) => (
                                    <option key={locadora.id} value={locadora.id}>{locadora.descricao}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicSetor">
                            <Form.Label>Setor</Form.Label>
                            <Form.Select {...register("setor_id", { required: "Por favor escreva o nome do motorista!" })} >
                                <option value="">Selecione</option>
                                {setores.map((setor) => (
                                    <option key={setor.id} value={setor.id}>{setor.descricao}</option>
                                ))}
                                

                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicObersvacao">
                            <Form.Label>Observação</Form.Label>
                            <Form.Control {...register("observacao", { required: "Por favor escreva o nome do motorista!" })} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Confirmar
                </Button>

            </Form>

        </Container>
    )
}


export default CadastroVeiculo;