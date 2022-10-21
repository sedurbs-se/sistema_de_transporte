import { GetServerSideProps, NextPage } from "next";
import ListaMotoristas from "@components/Listas/ListaMotoristas";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "@domain/store/store";
import PageContainer from "@components/PageContainer";
import fetchMotoristas from "@domain/requests/fetch/fetchMotoristas";

const Teste: NextPage = () => {
    return (
        <PageContainer>
            <h2 className={style["title"]}>Motoristas</h2>
            <ListaMotoristas />
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

    const { motoristas, count } = await fetchMotoristas(1, 10);


    state.motoristas = motoristas

    state.motoristaPages = count;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Teste