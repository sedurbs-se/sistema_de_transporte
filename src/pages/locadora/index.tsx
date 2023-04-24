import { GetServerSideProps, NextPage } from "next";
import ListaLocadoras from "@components/Listas/ListaLocadoras";
import style from "../../styles/Home.module.css"
import PageContainer from "src/presentation/containers/PageContainer";
import { initializeStore } from "@domain/store/store";
import useLocadoras from "@domain/hooks/useLocadoras";

const Locadoras: NextPage = () => {

    useLocadoras(1)
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

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Locadoras