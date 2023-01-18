import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import CadastroSetor from "@components/Cadastros/CadastroSetor";

const Setores: NextPage = () => {
    return (
        <PageContainer>
            <h2 className={style["title"]}>Setores</h2>
            <CadastroSetor />
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
    };

    state.user = isAuthenticated;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Setores