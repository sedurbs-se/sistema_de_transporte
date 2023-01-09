import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";


const MovimentacaoPageRetorno: NextPage  = () => {

    return (
        <PageContainer>
            <h1>Movimentação Saída</h1>
            {
            // Lista de Movimentações
            }

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
    }

    // const { solicitacoes } = await fetchSolicitacoes()

    state.user = isAuthenticated;
    // state.solicitacoes = solicitacoes;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default MovimentacaoPageRetorno;