import { NextPage } from "next";
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import ListaMotoristas from "../presentation/components/Listas/ListaMotoristas";
import CadastroMotorista from "../presentation/components/Cadastros/CadastroMotorista";
import style from "../presentation/components/Cadastros/CadastroLocadora/index.module.scss"


const Teste: NextPage = () => {
    return (
        <>
        <NavBarT></NavBarT>
        <Container >
        <h2 className={style["title"]}>Motoristas</h2>
            <ListaMotoristas></ListaMotoristas>
            <CadastroMotorista></CadastroMotorista>
      </Container>
      </>
    )
}

export default Teste