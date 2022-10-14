import { GetServerSideProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import style from "../../presentation/components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "../../domain/store/store";
import ListaVeiculos from "../../presentation/components/Listas/ListaVeículos";

const Veiculo: NextPage = () => {
    return (
        <Container >
            <h2 className={style["title"]}>Veiculos</h2>
            <ListaVeiculos />
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

    try {
        const veiculos = await axios.get("http://localhost:3000/api/veiculo/list");

        state.veiculos = veiculos.data.veiculos;
    } catch (error) {
        // console.log(error);
    }

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Veiculo;