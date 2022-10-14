import { NextPage } from "next";
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import ListaLocadoras from "../presentation/components/Listas/ListaLocadoras";
import CadastroLocadoras from "../presentation/components/Cadastros/CadastroLocadora";
import style from "../presentation/components/Cadastros/CadastroLocadora/index.module.scss"

const Teste: NextPage  = () => {
    return (
        <>
        <Container>
            <h2 className={style["title"]}>Locadoras</h2>
            <ListaLocadoras locadoras = {[{descricao:'fffff',bairro:'ESTANCIA'}]}></ListaLocadoras>
            <CadastroLocadoras></CadastroLocadoras>
      </Container>
      </>
    )
}

export default Teste