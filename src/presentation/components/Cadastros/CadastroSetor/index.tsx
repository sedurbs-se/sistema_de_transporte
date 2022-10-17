import { useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { ICreateSetorDTO, ICreateSetorResponse, useCreateSetor } from "@domain/query/createSetor";
import { useStore } from "@domain/store/store";
import { Setor } from "../../../../shared/types/Setor"
import style from "../CadastroLocadora/index.module.scss"

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

const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

const onSuccess = ({ setor }: ICreateSetorResponse) => {
    if (selectedSetor) {
        setSelectedSetor()
        updateSetor(setor);
    } else {
        addSetor(setor)
    }
};

const form = watch() as ICreateSetorDTO['params'];

const { refetch, isError } = useCreateSetor({
    params: form,
    onSuccess,
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
          <Form.Control type="text" placeholder="Insira o código do setor" {...register('codigo', {required:"Por favor, digite o codigo do setor"})} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Descrição</Form.Label>
          <Form.Control type="text" as="textarea" placeholder="" {...register('descricao', {required:"Por favor, digite o codigo do setor"})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Sigla</Form.Label>
          <Form.Control type="text" placeholder="" {...register('sigla', {required:"Por favor, digite o codigo do setor"})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Responsável</Form.Label>
          <Form.Control type="text" placeholder="" {...register('responsavel', {required:"Por favor, digite o codigo do setor"})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label>Ramal</Form.Label>
          <Form.Control type="text" placeholder="" {...register('ramal', {required:"Por favor, digite o codigo do setor"})}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </Container>
  )
}


export default CadastroSetor;