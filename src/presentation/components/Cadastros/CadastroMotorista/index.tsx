import { Motorista } from "@prisma/client";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useCreateMotorista, ICreateMotoristaDTO, ICreateMotoristaResponse } from "@domain/query/createMotorista";
import { useStore } from "@domain/store/store";
import { setModalError, setModalSuccess } from "@shared/utils/modalUtils";
import CadastroContainer from "../../../containers/CadastroContainer"
import { onErrorResponse } from "@domain/query/createUsuario";


const CadastroMotorista = () => {

    const {
        addMotorista,
        selectedMotorista,
        setSelectedMotorista,
        updateMotorista,

        // Vinculo
        vinculos

    } = useStore(state => state, shallow);

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm();

    const onSuccess = ({ motorista }: ICreateMotoristaResponse) => {
        if (selectedMotorista) {
            setSelectedMotorista()
            updateMotorista(motorista);
            setModalSuccess(true);
        } else {
            addMotorista(motorista)
            setModalSuccess();
        }

        reset()
    };

    const form = watch() as ICreateMotoristaDTO['params'];

    const onError = (data: onErrorResponse) => {
        setModalError(data?.response?.data?.message);
    };


    const { refetch, isError } = useCreateMotorista({
        params: form,
        onSuccess,
        onError,
        id: selectedMotorista?.id
    });

    const onSubmit = async () => {
        refetch();
    };


    useEffect(() => {
        if (selectedMotorista) {
            Object.keys(form).forEach(key => {
                setValue(key, selectedMotorista[key as keyof Motorista])
            })
        }
    }, [selectedMotorista])


    return (
        <CadastroContainer>
            <fieldset>
                <h4>Cadastro de Motorista</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            {...register("nome")} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDataNascimento">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control type="date"
                            {...register("data_nascimento")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                            {...register("bairro")} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEndereco">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            {...register("endereco")} />
                    </Form.Group>

                    <Row>
                        <Col md={6} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Celular</Form.Label>
                                <Form.Control
                                    {...register("celular")} />
                            </Form.Group>


                        </Col>
                        <Col md={6} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicTelefone">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control
                                    {...register("telefone")} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Vínculo</Form.Label>
                        <Form.Select
                            {...register("vinculo_id")} >
                            <option value="">Selecione um vínculo</option>
                            {vinculos.map(vinculo => (
                                <option key={vinculo.id} value={vinculo.id}>{vinculo.nome}</option>
                            ))}

                        </Form.Select>


                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>
            </fieldset>
        </CadastroContainer>
    )
}

export default CadastroMotorista;