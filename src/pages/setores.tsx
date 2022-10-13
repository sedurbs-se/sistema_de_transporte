import { NextPage } from "next";
import Head from "next/head";
import Table from "react-bootstrap/Table"
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import ListaSetores from "../presentation/components/Listas/ListaSetores";
import { Solicitacao } from "../shared/types/Solicitação";
import CadastroSetor from "../presentation/components/Cadastros/CadastroSetor";
import style from "../presentation/components/Cadastros/CadastroLocadora/index.module.scss"

const Teste: NextPage  = () => {
    return (
        <>
        <NavBarT></NavBarT>
        <Container>
        <h2 className={style["title"]}>Setores</h2>
            <ListaSetores setores = {[{codigo:'017',sigla:'ARQUIVO',ramal:5359}]}></ListaSetores>
            <CadastroSetor ></CadastroSetor>
      </Container>
      </>
    )
}

export default Teste