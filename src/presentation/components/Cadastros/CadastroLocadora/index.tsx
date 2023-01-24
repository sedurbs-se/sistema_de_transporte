import { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { ICreateLocadoraDTO, ICreateLocadoraResponse, useCreateLocadora } from "@domain/query/createLocadora";
import { useStore } from "@domain/store/store";
import { Locadora } from "@prisma/client";
import style from "./index.module.scss"
import { setModalError, setModalSuccess } from "@shared/utils/modalUtils";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputError } from "@components/InputError";
import CadastroContainer from "../../../containers/CadastroContainer"
import { onErrorResponse } from "@domain/query/createUsuario";

export interface CadastroLocadoraProps {
}

const CadastroLocadoras = (props: CadastroLocadoraProps) => {

  const { addLocadora, selectedLocadora, setSelectedLocadora, updateLocadora } = useStore(state => state, shallow);

  const validationSchema = yup.object().shape({
    nome: yup.string().required(),
    sigla: yup.string().required(),
    endereco: yup.string().required(),
    bairro: yup.string().required(),
    telefone: yup.string().required()
  })

  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(validationSchema) });


  const onSuccess = ({ locadora }: ICreateLocadoraResponse) => {
    if (selectedLocadora) {
      setSelectedLocadora()
      updateLocadora(locadora);
      setModalSuccess(true);
    } else {
      addLocadora(locadora)
      setModalSuccess();
    }

    reset()
  };

  const onError = (data: onErrorResponse) => {
    setModalError(data?.response?.data?.message);
  };

  const form = watch() as ICreateLocadoraDTO['params'];

  const { refetch, isError, isFetching } = useCreateLocadora({
    params: form,
    onSuccess,
    onError,
    id: selectedLocadora?.id
  });

  const onSubmit = async () => {
    refetch();
  };

  useEffect(() => {
    if (selectedLocadora) {
      Object.keys(form).forEach(key => {
        setValue(key, selectedLocadora[key as keyof Locadora])
      })
    }
  }, [selectedLocadora])



  return (
    <CadastroContainer
    >
      <h4>Cadastro de Locadora</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                isValid={!errors.nome && form.nome !== ""}
                isInvalid={errors.nome != undefined}
                {...register('nome')} />
              {errors?.nome?.type && <InputError type={errors.nome.type} form="locadora" field='nome' />}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword" >
              <Form.Label>Sigla</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                isValid={!errors.sigla && form.sigla !== ""}
                isInvalid={errors.sigla != undefined}
                {...register('sigla')} />
              {errors?.sigla?.type && <InputError type={errors.sigla.type} form="locadora" field='sigla' />}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            isValid={!errors.endereco && form.endereco !== ""}
            isInvalid={errors.endereco != undefined}
            {...register('endereco')} />
          {errors?.endereco?.type && <InputError type={errors.endereco.type} form="locadora" field='endereco' />}
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword" >
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                isValid={!errors.bairro && form.bairro !== ""}
                isInvalid={errors.bairro != undefined}
                {...register('bairro')} />
              {errors?.bairro?.type && <InputError type={errors.bairro.type} form="locadora" field='bairro' />}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword"  >
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                isValid={!errors.telefone && form.telefone !== ""}
                isInvalid={errors.telefone != undefined}
                {...register('telefone')} />
              {errors?.telefone?.type && <InputError type={errors.telefone.type} form="locadora" field='telefone' />}
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={isFetching}>
          {isFetching ? 'Aguarde..' : 'Salvar'}
        </Button>
      </Form>
    </CadastroContainer>
  )
}


export default CadastroLocadoras;