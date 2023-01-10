import { Motorista } from "@prisma/client";
import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useCreateMotorista, ICreateMotoristaDTO, ICreateMotoristaResponse } from "@domain/query/createMotorista";
import { useStore } from "@domain/store/store";
import { setModalSuccess } from "@shared/utils/modalUtils";


const CadastroMovimentacao = () => {

    const { 
        addMotorista, 
        selectedMotorista, 
        setSelectedMotorista, 
        updateMotorista,

        // Vinculo
        vinculos
    
    } = useStore(state => state, shallow);

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

    const onSuccess = ({ motorista }: ICreateMotoristaResponse) => {
        if (selectedMotorista) {
            setSelectedMotorista()
            updateMotorista(motorista);
            setModalSuccess(true);
        } else {
            addMotorista(motorista)
            setModalSuccess();
        }
    };

    const form = watch() as ICreateMotoristaDTO['params'];

    useEffect(() => {
        console.log(form)
    }, [form])

    const { refetch, isError } = useCreateMotorista({
        params: form,
        onSuccess,
        id: selectedMotorista?.id
    });

    const onSubmit = async () => {
        console.log('e')
        refetch();
    };

    const onError = (errors: any) => {
        console.log(errors);
    }

    useEffect(() => {
        if (selectedMotorista) {
            Object.keys(form).forEach(key => {
                setValue(key, selectedMotorista[key as keyof Motorista])
            })
        }
    }, [selectedMotorista])


    return (
        <fieldset>
            <legend>Cadastro de Saída</legend>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Placa</Form.Label>
                    <Form.Select {...register("status_solicitacao_id")}>
                                    <option value="">Selecione uma placa</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDataNascimento">
                    <Form.Label>Km inicial</Form.Label>
                    <Form.Control type="number" disabled 
                    value={10}
                    {...register("data_nascimento")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBairro">
                    <Form.Label>Motorista</Form.Label>
                    <Form.Select {...register("status_solicitacao_id")}>
                                    <option value="">Selecione o motorista</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data e Hora de saída</Form.Label>
                                <Form.Control  type="datetime-local" placeholder="Data de saída"
                                    {...register("data_hora_saida")}
                                />
        
                            </Form.Group>

                <Form.Group>

               
                </Form.Group>

                <Button variant="primary" type="submit">
                    Salvar
                </Button>
            </Form>
        </fieldset>
    )
}

export default CadastroMovimentacao;