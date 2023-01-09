import ListaSolicitacoesAprovada from "@components/Listas/ListaSolicitacoesAprovadas";
import PageContainer from "@components/PageContainer";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import fetchSolicitacoes from "@domain/requests/fetch/fetchSolicitacoes";
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";

const MovimentacaoPageSaida: NextPage = () => {

    return (
        <PageContainer>
            <h2 className={style["title"]}>Movimentação Saída</h2>
            {
                // Lista de Solicitações Aprovadas
            }
            <ListaSolicitacoesAprovada />
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

    const { solicitacoes } = await fetchSolicitacoes()

    state.user = isAuthenticated;
    state.solicitacoes = solicitacoes;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default MovimentacaoPageSaida;