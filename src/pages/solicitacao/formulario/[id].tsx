import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import fetchTiposSolicitacao from "@domain/requests/fetch/fetchTiposSolicitacao";
import fetchStatusSolicitacao from "@domain/requests/fetch/fetchStatusSolicitacao";
import CadastroSolicitacao from "@components/Cadastros/CadastroSolicitacao";
import fetchSetores from "@domain/requests/fetch/fetchSetores";
import fetchSolicitacao from "@domain/requests/fetch/fetchSolicitacao";

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

    try {

        const { setores } = await fetchSetores({});
        const { solicitacao } = await fetchSolicitacao(id as string)
        const { tiposSolicitacoes } = await fetchTiposSolicitacao();
        const { statusSolicitacoes } = await fetchStatusSolicitacao();
        
        state.selectedSolicitacao = solicitacao;
        state.tiposSolcitacao = tiposSolicitacoes;
        state.statusSolicitacao = statusSolicitacoes;
        state.setores = setores;

    } catch (error) {
        console.log(error)
    };

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Solicitacao;