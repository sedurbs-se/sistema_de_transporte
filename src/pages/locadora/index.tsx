import { GetServerSideProps, NextPage } from "next";
import ListaLocadoras from "@components/Listas/ListaLocadoras";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";
import axios from "axios";

const Teste: NextPage  = () => {
    return (
        <>
        <PageContainer>
            <h2 className={style["title"]}>Locadoras</h2>
            <ListaLocadoras></ListaLocadoras>
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
    
    const locadoras = await axios.get("http://localhost:3000/api/locadora/list");

    state.locadoras = locadoras.data.locadoras;
    

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Teste