import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import style from "../CadastroLocadora/index.module.scss"
import { setModalSuccess } from "@shared/utils/modalUtils";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import CampoDeBusca from "@components/CampoDeBusca";
import { useResetUsuario } from "@domain/query/resetSenhaUsuario";
import { useStore } from "@domain/store/store";
import shallow from "zustand/shallow";


const CadastroUsuarioResetaSenha = () => {

    const { usuarios } = useStore(state => state, shallow);

    const validationSchema = yup.object().shape({
        user_id: yup.string().required(),
    })

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(validationSchema) });

    const onSuccess = () => {
        setModalSuccess(false, "Senha resetada com sucesso");
    };

    const form = watch();
    register('user_id')


    const { refetch, isError, isFetching } = useResetUsuario({
        id: form.user_id,
        onSuccess,
    });

    const onSubmit = async () => {
        refetch();
    };

    return (
        <Container
            style={{ border: '1px solid gray', width: "450px", borderRadius: '4px', padding: '15px', marginBottom: '15px' }}
        >
            <h3 className={style["title"]}>Resetar senha de Usuario</h3>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row >

                    <Col>
                        <CampoDeBusca
                            list={usuarios.map(usuario => ({ id: usuario.id, nome: usuario.nome }))}
                            setValue={(user_id: string) => setValue('user_id', user_id)}
                            selected_id={form.user_id}
                        />
                    </Col>

                </Row>


                <Button variant="primary" type="submit" disabled={isFetching}>
                    {isFetching ? 'Aguarde...' : 'Confirmar'}
                </Button>

            </Form>

        </Container>
    )
}


export default CadastroUsuarioResetaSenha;