import { GetServerSideProps, NextPage } from "next";
import ListaSolicitacoes from "@components/Listas/ListaSolicitacoes";
import PageContainer from "src/presentation/containers/PageContainer";
import { initializeStore } from "@domain/store/store";
import fetchSolicitacoes from "@domain/requests/fetch/fetchSolicitacoes";


const Solicitacao: NextPage = () => {
    return (

        <PageContainer>

            <h2 >Solicitações</h2>
                <ListaSolicitacoes></ListaSolicitacoes>
        </PageContainer>

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
        const { solicitacoes } = await fetchSolicitacoes();
        state.solicitacoes = solicitacoes;

    } catch (error) {
        
    }

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Solicitacao;