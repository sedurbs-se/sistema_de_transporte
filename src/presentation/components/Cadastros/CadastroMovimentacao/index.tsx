import { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { useStore } from "@domain/store/store";
import { setModalError, setModalSuccess } from "@shared/utils/modalUtils";
import { ISaidaMovimentacaoDTO, ISaidaMovimentacaoResponse, useSaidaMovimentacao } from "@domain/query/saidaMovimentacao";
import ListaSolicitacoesAprovada from "@components/Listas/ListaSolicitacoesAprovadas";
import CadastroContainer from "../../../containers/CadastroContainer"
import { onErrorResponse } from "@domain/query/createUsuario";



const CadastroMovimentacao = () => {

    const {
        motoristas,
        statusMovimentacao,
        // Vinculo
        veiculos,
         removeSolicitacao,
    } = useStore(state => state, shallow);

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm();

    const onSuccess = ({ }: ISaidaMovimentacaoResponse) => {
        removeSolicitacao(form.solicitacao_id)
        setModalSuccess();
        reset();
    };

    const form = watch() as ISaidaMovimentacaoDTO['params'];

    const onError = (data: onErrorResponse) => {
        setModalError(data?.response?.data?.message);
    };

    const { refetch, isError } = useSaidaMovimentacao({
        params: form,
        onSuccess,
        onError
    });

    const onSubmit = async () => {
        refetch();
    };


    const selectedVeiculo = veiculos.find(veiculo => veiculo.id === form.veiculos_id);

    const handleSelectCheck = (id: string) => {
        if (!id) return;

        if (form.solicitacao_id === id) {
            setValue('solicitacao_id', '')
        } else {
            setValue('solicitacao_id', id)
        }
    };

    return (
        <CadastroContainer size="lg">
            <ListaSolicitacoesAprovada handleSelectCheck={handleSelectCheck} selectedValue={form.solicitacao_id} />

            <fieldset>
                <legend>Cadastro de Saída</legend>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Row>
                        <Col md={12} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Placa</Form.Label>
                                <Form.Select {...register("veiculos_id")}>
                                    <option value="">Selecione uma placa</option>
                                    {
                                        veiculos.map(veiculo => (
                                            <option key={veiculo.id} value={veiculo.id}>{veiculo.placa}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={12} xs={6} xl={6} xls={6}>
                            <Form.Group className="mb-3" controlId="formBasicDataNascimento">
                                <Form.Label>Km inicial</Form.Label>
                                <Form.Control type="number" disabled
                                    value={selectedVeiculo ? selectedVeiculo.quilometragemAtual : 0}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12} xl={12} xls={12}>
                            <Form.Group className="mb-3" controlId="formBasicBairro">
                                <Form.Label>Motorista</Form.Label>
                                <Form.Select {...register("motorista_id")}>
                                    <option value="">Selecione o motorista</option>
                                    {motoristas.map(motorista => (
                                        <option key={motorista.id} value={motorista.id}>{motorista.nome}</option>
                                    ))}

                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6} xs={12} xl={12} xls={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Data e Hora de saída</Form.Label>
                                <Form.Control type="datetime-local" placeholder="Data de saída"
                                    {...register("dtsaida")}
                                />
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Status</Form.Label>
                                <Form.Select {...register("status_id")}>
                                    <option value="">Selecione um status</option>
                                    {
                                        statusMovimentacao.map(status => (
                                            status.nome !== "RETORNO" ?
                                            <option 
                                            selected={status.nome.includes("SAIDA")}
                                            key={status.id} value={status.id}>{status.nome}</option>
                                            : <></>
                                        ))
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Label>Observações</Form.Label>
                        <Form.Control as="textarea" rows={3} {...register("observacoes")} />
                    </Form.Group>

                    <Col md={12} xs={12} xl={12} xls={12}>
                        <Button className="mt-2" variant="primary" type="submit">
                            Salvar
                        </Button>
                    </Col>

                </Form>
            </fieldset>
        </CadastroContainer>

    )
}

export default CadastroMovimentacao;