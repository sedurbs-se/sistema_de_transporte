import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "@components/PageContainer";
import fetchTiposSolicitacao from "@domain/requests/fetch/fetchTiposSolicitacao";
import fetchStatusSolicitacao from "@domain/requests/fetch/fetchStatusSolicitacao";
import CadastroSolicitacao from "@components/Cadastros/CadastroSolicitacao";
import fetchSetores from "@domain/requests/fetch/fetchSetores";
import fetchSolicitacao from "@domain/requests/fetch/fetchSolicitacao";

const Solicitacao: NextPage = () => {
    return (
        <PageContainer>
            <h2 className={style["title"]}>Solicitacao</h2>
            <CadastroSolicitacao />
        </PageContainer>
    )
};

export const getServerSideProps: GetServerSideProps = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);
    // Get Motorista pela URL id
    const { id } = context.query;

    if (!isAuthenticated && !id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    };

    state.user = isAuthenticated;

    const { tiposSolicitacoes } = await fetchTiposSolicitacao();
    const { statusSolicitacoes } = await fetchStatusSolicitacao();
    const { setores } = await fetchSetores(1);
    const { solicitacao } = await fetchSolicitacao(id as string)

    state.selectedSolicitacao = solicitacao;
    state.tiposSolcitacao = tiposSolicitacoes;
    state.statusSolicitacao = statusSolicitacoes;
    state.setores = setores;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Solicitacao;