import { useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import shallow from "zustand/shallow";
import { ICreateLocadoraDTO, ICreateLocadoraResponse, useCreateLocadora } from "@domain/query/createLocadora";
import { useStore } from "@domain/store/store";
import { Locadora } from "@prisma/client";
import style from "./index.module.scss"

export interface CadastroLocadoraProps {
}

const CadastroLocadoras = (props: CadastroLocadoraProps) => {

  const { addLocadora, selectedLocadora, setSelectedLocadora, updateLocadora } = useStore(state => state, shallow);

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();


  const onSuccess = ({ locadora }: ICreateLocadoraResponse) => {
    if (selectedLocadora) {
        setSelectedLocadora()
        updateLocadora(locadora);
    } else {
        addLocadora(locadora)
    }
};

const form = watch() as ICreateLocadoraDTO['params'];

const { refetch, isError } = useCreateLocadora({
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
        <Form.Control type="text" placeholder="" {...register('descricao',{ required: "Por favor escreva a descricao da locadora!" })}  />
      </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>Sigla</Form.Label>
        <Form.Control type="text" placeholder="" {...register('sigla',{ required: "Por favor escreva a sigla da locadora!" })} />
      </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>Endereço</Form.Label>
        <Form.Control type="text" placeholder="" {...register('endereco',{ required: "Por favor escreva o endereco da locadora!" })} />
      </Form.Group>
      <Row>
        <Col>
        <Form.Group className="mb-3"  controlId="formBasicPassword" >
        <Form.Label>Bairro</Form.Label>
        <Form.Control type="text" placeholder="" {...register('bairro',{ required: "Por favor escreva o bairro da locadora!" })}/>
      </Form.Group>
        </Col>
        <Col>
        <Form.Group className="mb-3" controlId="formBasicPassword"  >
        <Form.Label>Telefone</Form.Label>
        <Form.Control type="text" placeholder="" {...register('telefone',{ required: "Por favor escreva o telefone da locadora!" })} />
      </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Salvar
      </Button>
        </Form>
        </Container>
    )
}


export default CadastroLocadoras;