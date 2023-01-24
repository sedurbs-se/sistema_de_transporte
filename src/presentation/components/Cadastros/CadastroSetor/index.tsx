import { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { ICreateSetorDTO, ICreateSetorResponse, useCreateSetor } from "@domain/query/createSetor";
import { useStore } from "@domain/store/store";
import { Setor } from "@prisma/client"
import style from "../CadastroLocadora/index.module.scss"
import { setModalError, setModalSuccess } from "@shared/utils/modalUtils";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputError } from "@components/InputError";
import Swal from "sweetalert2";
import CadastroContainer from "../../../containers/CadastroContainer"
import { onErrorResponse } from "@domain/query/createUsuario";

export interface CadastroSetorProps {
  setor?: Setor
}

const CadastroSetor = (props: CadastroSetorProps) => {

  const {
    addSetor,
    selectedSetor,
    setSelectedSetor,
    updateSetor
  } = useStore(state => state, shallow);

  const validationSchema = yup.object().shape({
    codigo: yup.string().required('Código é obrigatório'),
    nome: yup.string().required('Descrição é obrigatório'),
    sigla: yup.string().required('Sigla é obrigatório'),
    responsavel: yup.string().required('Responsável é obrigatório'),
    ramal: yup.string().required('Ramal é obrigatório'),
  });

  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({ resolver: yupResolver(validationSchema) });

  const onSuccess = ({ setor }: ICreateSetorResponse) => {
    if (selectedSetor) {
      setSelectedSetor()
      updateSetor(setor);
      setModalSuccess(true);
    } else {
      addSetor(setor);
      setModalSuccess();
      clearFields();
    };
    reset()
  };

  const onError = (data: onErrorResponse) => {
    setModalError(data?.response?.data?.message);
};
  const clearFields = () => {
    Object.keys(form).forEach(key => {
      setValue(key, "")
    })
  }




  const form = watch() as ICreateSetorDTO['params'];

  const { refetch, isError, isFetching } = useCreateSetor({
    params: form,
    onSuccess,
    onError,
    id: selectedSetor?.id
  });

  const onSubmit = async () => {
    refetch();
  };

  useEffect(() => {
    if (selectedSetor) {
      Object.keys(form).forEach(key => {
        setValue(key, selectedSetor[key as keyof Setor])
      })
    }
  }, [selectedSetor])

  return (
    <CadastroContainer>
      <h4>Cadastro de Setor</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Código</Form.Label>
          <Form.Control
            type="text"
            placeholder="Insira o código do setor"
            isValid={!errors.codigo && form.codigo !== ""}
            isInvalid={errors.codigo != undefined}
            {...register('codigo')} />
          {errors?.codigo?.type && <InputError type={errors.codigo.type} form="setor" field='codigo' />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder=""
            isValid={!errors.nome && form.nome !== ""}
            isInvalid={errors.nome != undefined}
            {...register('nome')} />
          {errors?.nome?.type && <InputError type={errors.nome.type} form="setor" field='nome' />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Sigla</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            isValid={!errors.sigla && form.sigla !== ""}
            isInvalid={errors.sigla != undefined}
            {...register('sigla')} />
          {errors?.sigla?.type && <InputError type={errors.sigla.type} form="setor" field='sigla' />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Responsável</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            isValid={!errors.responsavel && form.responsavel !== ""}
            isInvalid={errors.responsavel != undefined}
            {...register('responsavel')} />
          {errors?.responsavel?.type && <InputError type={errors.responsavel.type} form="setor" field='responsavel' />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Ramal</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            isValid={!errors.ramal && form.ramal !== ""}
            isInvalid={errors.ramal != undefined}
            {...register('ramal')} />
          {errors?.ramal?.type && <InputError type={errors.ramal.type} form="setor" field='ramal' />}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isFetching}>
          {isFetching ? 'Aguarde...' : 'Salvar'}
        </Button>
      </Form>
    </CadastroContainer>
  )
}


export default CadastroSetor;