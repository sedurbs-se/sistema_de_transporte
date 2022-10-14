import { NextPage } from "next";
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import style from "../presentation/components/Cadastros/CadastroLocadora/index.module.scss"
import ListaVeiculos from "../presentation/components/Listas/ListaVeículos";
import CadastroVeiculo from "../presentation/components/Cadastros/CadastroVeiculo";

const Teste: NextPage = () => {
  return (
    <>
      <Container >
        <h2 className={style["title"]}>Veículos</h2>
        <ListaVeiculos veiculos={[{ placa: 'NVL-2487', descricao: 'GOL', quilometragem: 41.2, tipo_frota_id: 'TITULAR' }]}></ListaVeiculos>
        <CadastroVeiculo></CadastroVeiculo>
      </Container>
    </>
  )
}

export default Teste