import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "@components/PageContainer";
import CadastroLocadoras from "@components/Cadastros/CadastroLocadora";


const CadastrarLocadora: NextPage = () => {
    return (
        <>
            <PageContainer >
                <h2 className={style["title"]}>Locadoras</h2>
                <CadastroLocadoras></CadastroLocadoras>
            </PageContainer>
        </>
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
    };

    state.user = isAuthenticated;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarLocadora;