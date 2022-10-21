import { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { ICreateLocadoraDTO, ICreateLocadoraResponse, useCreateLocadora } from "@domain/query/createLocadora";
import { useStore } from "@domain/store/store";
import { Locadora } from "@prisma/client";
import style from "./index.module.scss"
import { setModalSuccess } from "@shared/utils/modalUtils";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputError } from "@components/InputError";

export interface CadastroLocadoraProps {
}

const CadastroLocadoras = (props: CadastroLocadoraProps) => {

  const { addLocadora, selectedLocadora, setSelectedLocadora, updateLocadora } = useStore(state => state, shallow);

  const validationSchema = yup.object().shape({
    descricao: yup.string().required(),
    sigla: yup.string().required(),
    endereco: yup.string().required(),
    bairro: yup.string().required(),
    telefone: yup.string().required()
})

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({resolver: yupResolver(validationSchema)});


  const onSuccess = ({ locadora }: ICreateLocadoraResponse) => {
    if (selectedLocadora) {
        setSelectedLocadora()
        updateLocadora(locadora);
    } else {
        addLocadora(locadora)
        setModalSuccess();
        clearFields();
    }
};

const clearFields = () => {
  Object.keys(form).forEach(key => {
      setValue(key, "")
  })
}

const form = watch() as ICreateLocadoraDTO['params'];

const { refetch, isError, isFetching } = useCreateLocadora({
    params: form,
    onSuccess,
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
      <Container
      style={{border:'1px solid gray', borderRadius:'4px', padding:'15px', marginBottom:'15px'}}
      >
        <h3
        className={style["title"]}
        >Cadastro</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Descrição</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="" 
        isValid={!errors.descricao && form.descricao !== ""}
        isInvalid={errors.descricao != undefined}
        {...register('descricao')}  />
        {errors?.descricao?.type && <InputError type={errors.descricao.type} form="locadora" field='descricao' />}
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
        <Form.Group className="mb-3"  controlId="formBasicPassword" >
        <Form.Label>Bairro</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="" 
        isValid={!errors.bairro && form.bairro !== ""}
        isInvalid={errors.bairro != undefined}
        {...register('bairro')}/>
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

      <Button variant="primary" type="submit"  disabled={isFetching}>
        {isFetching ? 'Aguarde..' : 'Salvar'}
      </Button>
        </Form>   
        </Container>
    )
}


export default CadastroLocadoras;