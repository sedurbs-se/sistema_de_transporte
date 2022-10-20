import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "@components/PageContainer";
import fetchTiposSolicitacao from "@domain/requests/fetch/fetchTiposSolicitacao";
import fetchStatusSolicitacao from "@domain/requests/fetch/fetchStatusSolicitacao";
import CadastroSolicitacao from "@components/Cadastros/CadastroSolicitacao";


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

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    };

    const { tipos } = await fetchTiposSolicitacao();
    const { status } = await fetchStatusSolicitacao()

    state.tiposSolcitacao = tipos;
    state.statusSolicitacao = status;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Solicitacao;