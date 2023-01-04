import { GetServerSideProps, NextPage } from "next";
import ListaSolicitacoes from "@components/Listas/ListaSolicitacoes";
import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";
import fetchSolicitacao from "@domain/requests/fetch/fetchSolicitacoes";

const Solicitacao: NextPage = () => {
    return (
        <>
            <PageContainer>
                <ListaSolicitacoes></ListaSolicitacoes>
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

    const { solicitacoes } = await fetchSolicitacao()

    state.user = isAuthenticated;
    state.solicitacoes = solicitacoes;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Solicitacao;