import { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { ICreateSetorDTO, ICreateSetorResponse, useCreateSetor } from "@domain/query/createSetor";
import { useStore } from "@domain/store/store";
import {Setor} from "@prisma/client"
import style from "../CadastroLocadora/index.module.scss"
import { setModalSuccess } from "@shared/utils/modalUtils";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputError } from "@components/InputError";
import Swal from "sweetalert2";

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
  descricao: yup.string().required('Descrição é obrigatório'),
  sigla: yup.string().required('Sigla é obrigatório'),
  responsavel: yup.string().required('Responsável é obrigatório'),
  ramal: yup.string().required('Ramal é obrigatório'),
});

const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({resolver: yupResolver(validationSchema)});

const onSuccess = ({ setor }: ICreateSetorResponse) => {
    if (selectedSetor) {
        setSelectedSetor()
        updateSetor(setor);
    } else {
        addSetor(setor);
        setModalSuccess();
        clearFields();
    }
};

const onError = (errors: any) => {
    if(errors.response.status === 409) {
      Swal.fire({
        title:"Setor já cadastrado!",
        icon:"error",
        text:"Insira um código diferente",
        showCloseButton: true,
        confirmButtonColor:'#3085d6',
      })
    }
}

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
    <Container
      style={{ border: '1px solid gray', borderRadius: '4px', padding: '15px', marginBottom: '15px' }}
    >
      <h3
        className={style["title"]}
      >Cadastro</h3>
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
          <Form.Label>Descrição</Form.Label>
          <Form.Control 
          type="text" 
          as="textarea" 
          placeholder="" 
          isValid={!errors.descricao && form.descricao !== ""}
          isInvalid={errors.descricao != undefined}
          {...register('descricao')}/>
          {errors?.descricao?.type && <InputError type={errors.descricao.type} form="setor" field='descricao' />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Sigla</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="" 
          isValid={!errors.sigla && form.sigla !== ""}
          isInvalid={errors.sigla != undefined}
          {...register('sigla')}/>
          {errors?.sigla?.type && <InputError type={errors.sigla.type} form="setor" field='sigla' />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Responsável</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="" 
          isValid={!errors.responsavel && form.responsavel !== ""}
          isInvalid={errors.responsavel != undefined}
          {...register('responsavel')}/>
          {errors?.responsavel?.type && <InputError type={errors.responsavel.type} form="setor" field='responsavel' />}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Ramal</Form.Label>
          <Form.Control 
          type="text"
           placeholder="" 
           isValid={!errors.ramal && form.ramal !== ""}
           isInvalid={errors.ramal != undefined}
           {...register('ramal')}/>
          {errors?.ramal?.type && <InputError type={errors.ramal.type} form="setor" field='ramal' />}
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isFetching}>
         {isFetching ? 'Aguarde...': 'Salvar'} 
        </Button>
      </Form>
    </Container>
  )
}


export default CadastroSetor;