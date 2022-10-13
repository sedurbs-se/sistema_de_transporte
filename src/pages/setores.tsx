import { NextPage } from "next";
import Head from "next/head";
import { HomeContainer } from "../presentation/containers/Home";
import Table from "react-bootstrap/Table"
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import ListaSetores from "../presentation/components/Listas/ListaSetores";
import { Solicitacao } from "../domain/types/Solicitação";
import CadastroSetor from "../presentation/components/Cadastros/CadastroSetor";

const Teste: NextPage  = () => {
    return (
        <Container>
            <NavBarT></NavBarT>
            <ListaSetores setores = {[{codigo:'017',sigla:'ARQUIVO',ramal:5359}]}></ListaSetores>
            <CadastroSetor ></CadastroSetor>
      </Container>
    )
}

export default Teste