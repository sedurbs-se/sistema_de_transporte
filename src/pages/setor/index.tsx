import { GetServerSideProps, NextPage } from "next";
import ListaSetores from "@components/Listas/ListaSetores";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";
import axios from "axios";
import fetchSetores from "@domain/requests/fetch/fetchSetores";
import LoadingBar from "react-top-loading-bar"
import { useStore } from "zustand";
import shallow from "zustand/shallow";

const Teste: NextPage  = () => {

   
    return (
        <>
        <PageContainer>
        <h2 className={style["title"]}>Setores</h2>
        <ListaSetores></ListaSetores>
      </PageContainer>
      </>
    )
}

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
        const { setores } = await fetchSetores(1,10);

        state.setores = setores;

    } catch (error) {
        // console.log(error);
    }

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Teste