import { GetServerSideProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import ListaMotoristas from "../../presentation/components/Listas/ListaMotoristas";
import style from "../../presentation/components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "../../domain/store/store";

const Teste: NextPage = () => {
    return (
        <Container >
            <h2 className={style["title"]}>Motoristas</h2>
            <ListaMotoristas />
        </Container>
    )
};

export const getServerSideProps: GetServerSideProps = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const motoristas = await axios.get("http://localhost:3000/api/motorista/list");

    state.motoristas = motoristas.data.motoristas;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Teste