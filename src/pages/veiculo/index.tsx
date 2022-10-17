import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "@domain/store/store";
import ListaVeiculos from "@components/Listas/ListaVeículos";
import PageContainer from '@components/PageContainer';

const Veiculo: NextPage = () => {
    return (
        <PageContainer>
            <h2 className={style["title"]}>Veiculos</h2>
            <ListaVeiculos />
        </PageContainer>
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