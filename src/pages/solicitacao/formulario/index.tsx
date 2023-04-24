import { GetServerSideProps, NextPage } from "next";
import { initializeStore, useStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import CadastroSolicitacao from "@components/Cadastros/CadastroSolicitacao";
import useSolicitacao from "@domain/hooks/useSolicitacao";

const Solicitacao: NextPage = () => {

    useSolicitacao()
    return (
        <PageContainer>
            <CadastroSolicitacao />
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

export default Solicitacao;