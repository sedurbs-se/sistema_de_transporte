import { NextPage } from "next";
import Head from "next/head";
import Table from "react-bootstrap/Table"
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import ListaSetores from "../presentation/components/Listas/ListaSetores";
import { Solicitacao } from "../shared/types/Solicitação";
import CadastroSetor from "../presentation/components/Cadastros/CadastroSetor";
import ListaMotoristas from "../presentation/components/Listas/ListaMotoristas";

const Teste: NextPage  = () => {
    return (
        <>
        <NavBarT></NavBarT>
        <Container>
            <ListaMotoristas motoristas={[{nome:'TT', celular:'8484844', vinculo_id:'ejjeje'}]}></ListaMotoristas>
      </Container>
      </>
    )
}

export default Teste