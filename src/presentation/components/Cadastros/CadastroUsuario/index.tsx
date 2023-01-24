import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import style from "../CadastroLocadora/index.module.scss"
import { setModalError, setModalSuccess } from "@shared/utils/modalUtils";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { InputError } from "@components/InputError";
import { ICreateUsuarioDTO, ICreateUsuarioResponse, onErrorResponse, useCreateUsuario } from "@domain/query/createUsuario";
import { useStore } from "@domain/store/store";
import shallow from "zustand/shallow";
import { useEffect } from "react";
import { Usuario } from "@shared/types/Usuario";
import CadastroContainer from "src/presentation/containers/CadastroContainer";
import { AxiosError } from "axios";


interface ICadastroUsuario {
    atualizando: boolean;
};


const CadastroUsuario = ({ atualizando }: ICadastroUsuario) => {

    const { user, setUser, tiposUsuario } = useStore(state => state, shallow);

    const validationSchema = yup.object().shape({
        nome: yup.string().required(),
        login: yup.string().required(),
        password: yup.string().min(5).required(),
        tipo_id: !atualizando ? yup.string().required() : yup.string(),
    })

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(validationSchema) });

    const onSuccess = ({ user }: ICreateUsuarioResponse) => {
        setModalSuccess(false, "Usuario criado com sucesso");
        reset()

        if (atualizando && user) {
            setUser(user)
        }
    };
    
    const onError = (data: onErrorResponse) => {
        setModalError(data?.response?.data?.message);
    };

    const form = watch() as ICreateUsuarioDTO["params"]

    const { refetch, isError, isFetching } = useCreateUsuario({
        id: atualizando ? user?.id : undefined,
        params: form,
        onSuccess,
        onError
    });

    const onSubmit = async () => {
        console.log(form)
        refetch();
    };



    useEffect(() => {
        if (atualizando && user) {
            setValue("nome", user.nome);
            setValue("login", user.login);
        }
    }, [user])

    return (
        <CadastroContainer size="sm">
            <h4>Cadastro de Usuários</h4>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row >
                    <Form.Group className="mb-3" controlId="formBasicNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            isValid={!errors.nome && form.nome !== ""}
                            isInvalid={errors.nome != undefined}
                            {...register("nome")} />
                        {errors?.nome?.type && <InputError type={errors.nome.type} form="veiculo" field='nome' />}
                    </Form.Group>
                    {!atualizando ? <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Cargo</Form.Label>
                        <Form.Select

                            isValid={!errors.tipo_id && form.tipo_id !== ""}
                            isInvalid={errors.tipo_id != undefined}

                            {...register("tipo_id")}>
                            <option value="">Selecione um cargo</option>
                            {
                                tiposUsuario.map(tipo => (
                                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                                ))
                            }
                            {errors?.tipo_id?.type && <InputError type={errors.tipo_id.type} form="tipo" field='nome' />}

                        </Form.Select>
                    </Form.Group> : null}

                    <Form.Group className="mb-3" controlId="formBasicLogin">
                        <Form.Label>Login</Form.Label>
                        <Form.Control
                            isValid={!errors.login && form.login !== ""}
                            isInvalid={errors.login != undefined}
                            {...register("login")} />
                        {errors?.login?.type && <InputError type={errors.login.type} form="veiculo" field='placa' />}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLogin">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            isValid={!errors.password && form.password !== ""}
                            isInvalid={errors.password != undefined}
                            type="password"
                            {...register("password")} />
                        {errors?.password?.type && <InputError type={errors.password.type} form="veiculo" field='placa' />}
                    </Form.Group>
                </Row>


                <Button variant="primary" type="submit" disabled={isFetching}>
                    {isFetching ? 'Aguarde...' : 'Confirmar'}
                </Button>

            </Form>

        </CadastroContainer>
    )
}


export default CadastroUsuario;