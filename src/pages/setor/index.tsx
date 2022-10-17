import { GetServerSideProps, NextPage } from "next";
import ListaSetores from "@components/Listas/ListaSetores";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";
import axios from "axios";

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

    try {
        const setores = await axios.get("http://localhost:3000/api/setor/list");

        state.setores = setores.data.setores;
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