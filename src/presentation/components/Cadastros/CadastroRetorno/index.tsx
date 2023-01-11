import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useStore } from "@domain/store/store";
import { setModalSuccess } from "@shared/utils/modalUtils";
import { ISaidaMovimentacaoDTO, ISaidaMovimentacaoResponse, useSaidaMovimentacao } from "@domain/query/saidaMovimentacao";
import ListaSolicitacoesAprovada from "@components/Listas/ListaSolicitacoesAprovadas";
import { IRetornoMovimentacaoDTO, IRetornoMovimentacaoResponse, useRetornoMovimentacao } from "@domain/query/retornoMovimentacao";
import { Movimentacao } from "@prisma/client";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



const CadastroRetorno = () => {

    const {
        statusMovimentacao,
        selectedMovimentacao

    } = useStore(state => state, shallow);


    const validationSchema = yup.object().shape({
        quilometragemFinal: yup.number().required().min(selectedMovimentacao?.veiculo.quilometragemAtual as number),
        status_id: yup.string().required(),
        dtretorno: yup.date().required(),
        observacao: yup.string()});

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({resolver: yupResolver(validationSchema)});

    const onSuccess = ({ }: IRetornoMovimentacaoResponse) => {
        setModalSuccess()
    };

    const form = watch() as IRetornoMovimentacaoDTO['params'];

    

    useEffect(() => {
        console.log(form)
    }, [form])

    const { refetch, isError } = useRetornoMovimentacao({
        params: {...form, id: selectedMovimentacao?.id},
        onSuccess,
    });

    const onSubmit = async () => {
        refetch();
    };

    const onError = (errors: any) => {
        console.log(errors);
    }


    useEffect(() => {
        
        if (selectedMovimentacao) {
            console.log('selectedMovimentacao', selectedMovimentacao)
            Object.keys(form).forEach(key => {
                if(key == 'placa') {
                    setValue('placa', selectedMovimentacao.veiculo.placa)
                }
                else if(key == 'quilometragemAtual') {
                    setValue('quilometragemAtual', selectedMovimentacao.veiculo.quilometragemAtual)
                }
                else if(key == 'motorista') {
                    setValue('motorista', selectedMovimentacao.motorista.nome)
                }
                else {
                    setValue(key, selectedMovimentacao[key as keyof Movimentacao])
                }
        
            })
        }
        console.log(form)
    }, [selectedMovimentacao])

    return (
        <>

            <fieldset>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Placa</Form.Label>
                                <Form.Select disabled >
                                    {
                                            <option  key={form.veiculos_id} selected value={form.veiculos_id}>{selectedMovimentacao?.veiculo.placa}</option>
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicDataNascimento">
                                <Form.Label>Km inicial</Form.Label>
                                <Form.Control type="number" disabled
                                    value={selectedMovimentacao?.veiculo.quilometragemAtual}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicDataNascimento">
                                <Form.Label>Km final</Form.Label>
                                <Form.Control type="number" 
                                    {...register("quilometragemFinal")}
                                />
                            </Form.Group>
                        </Col>
                        <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicBairro">
                                <Form.Label>Motorista</Form.Label>
                                <Form.Select disabled >
                                        <option selected key={form.motorista_id} value={form.motorista_id}>{selectedMovimentacao?.motorista.nome}</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        </Row>


                        <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data e Hora de saída</Form.Label>
                                <Form.Control 
                                disabled
                                type="datetime-local" placeholder="Data de saída"
                                    {...register("dtsaida")}
                                    value={
                                        form.dtsaida?.slice(0, 16)
                                    }
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data e Hora de retorno</Form.Label>
                                <Form.Control 
                                type="datetime-local" placeholder="Data de saída"
                                    {...register("dtretorno")}
                                    value={
                                        form.dtretorno?.slice(0, 16)
                                    }
                                />
                            </Form.Group>
                        </Col>
                        </Row>



                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Select {...register("status_id")}>
                                    <option value="">Selecione uma status</option>
                                    {
                                        statusMovimentacao.map(status => (
                                            <option key={status.id} value={status.id}>{status.nome}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Label>Observações</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("observacao")} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                </Form>
            </fieldset>
        </>

    )
}

export default CadastroRetorno;