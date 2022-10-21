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

    console.log(state)

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

    const { Solicitacoes } = await fetchSolicitacao(1,10);

    console.log(await fetchSolicitacao(1,10))

    state.solicitacoes = Solicitacoes;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Solicitacao;