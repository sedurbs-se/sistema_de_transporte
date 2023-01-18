import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import fetchTiposSolicitacao from "@domain/requests/fetch/fetchTiposSolicitacao";
import fetchStatusSolicitacao from "@domain/requests/fetch/fetchStatusSolicitacao";
import CadastroSolicitacao from "@components/Cadastros/CadastroSolicitacao";
import fetchSetores from "@domain/requests/fetch/fetchSetores";

const Solicitacao: NextPage = () => {
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

    const { tiposSolicitacoes } = await fetchTiposSolicitacao();
    const { statusSolicitacoes } = await fetchStatusSolicitacao();
    const { setores } = await fetchSetores(1);
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