import { NextPage } from "next";
import Head from "next/head";
import Table from "react-bootstrap/Table"
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import ListaLocadoras from "../presentation/components/Listas/ListaLocadoras";
import { Solicitacao } from "../shared/types/Solicitação";
import CadastroSetor from "../presentation/components/Cadastros/CadastroSetor";
import CadastroLocadoras from "../presentation/components/Cadastros/CadastroLocadora";

const Teste: NextPage  = () => {
    return (
        <Container>
            <NavBarT></NavBarT>
            <ListaLocadoras locadoras = {[{descricao:'fffff',bairro:'ESTANCIA'}]}></ListaLocadoras>
            <CadastroLocadoras></CadastroLocadoras>
        
      </Container>
    )
}

export default Teste