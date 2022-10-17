import { Motorista } from "@prisma/client";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useCreateMotorista, ICreateMotoristaDTO, ICreateMotoristaResponse } from "@domain/query/createMotorista";
import { useStore } from "@domain/store/store";


const CadastroMotorista = () => {

    const { addMotorista, selectedMotorista, setSelectedMotorista, updateMotorista } = useStore(state => state, shallow);

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    const onSuccess = ({ motorista }: ICreateMotoristaResponse) => {
        if (selectedMotorista) {
            setSelectedMotorista()
            updateMotorista(motorista);
        } else {
            addMotorista(motorista)
        }
    };

    const form = watch() as ICreateMotoristaDTO['params'];

    const { refetch, isError } = useCreateMotorista({
        params: form,
        onSuccess,
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
        <fieldset>
            <legend>Cadastro de Motorista</legend>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control {...register("nome", { required: "Por favor escreva o nome do motorista!" })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDataNascimento">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control type="date"  {...register("data_nascimento", { required: "Por favor selecione uma data de nascimento!" })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBairro">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control  {...register("bairro", { required: "Por favor escreva o bairro do motorista!" })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEndereco">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control {...register("endereco", { required: "Por favor escreva o endereço do motorista!" })} />
                </Form.Group>

                <Row>
                    <Col md={6} xs={6} xl={6} xls={6}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Celular</Form.Label>
                            <Form.Control  {...register("celular", { required: "Por favor escreva o celular do motorista!" })} />
                        </Form.Group>


                    </Col>
                    <Col md={6} xs={6} xl={6} xls={6}>
                        <Form.Group className="mb-3" controlId="formBasicTelefone">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control  {...register("telefone",)} />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Vínculo</Form.Label>
                    <Form.Control type="text"  {...register("vinculo", { required: "Por favor escreva o endereço do motorista!" })} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Salvar
                </Button>
            </Form>
        </fieldset>
    )
}

export default CadastroMotorista;