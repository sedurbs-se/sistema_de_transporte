import { GetServerSideProps, NextPage } from "next";
import ListaLocadoras from "@components/Listas/ListaLocadoras";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";
import axios from "axios";
import fetchLocadoras from "@domain/requests/fetch/fetchLocadoras";
import { Locadora } from "@shared/types/Locadora";

const Teste: NextPage = () => {
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

    try {
        const { locadoras, total } = await fetchLocadoras(1,10);

        state.locadoras = locadoras;
        state.locadoraPages = total;
        console.log(total)
    } catch (error) {
    }


    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Teste