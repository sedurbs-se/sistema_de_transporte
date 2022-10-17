import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "@domain/store/store";
import ListaVeiculos from "@components/Listas/ListaVeículos";
import PageContainer from '@components/PageContainer';
import fetchVeiculos from "@domain/fetch/fetchVeiculos";

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

    state.user = isAuthenticated;

    try {
        const { veiculos } = await fetchVeiculos();

        state.veiculos = veiculos;
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