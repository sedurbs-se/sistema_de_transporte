import PageContainer from "src/presentation/containers/PageContainer";
import style from "../../styles/Home.module.css"
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";
import CadastroMovimentacao from "@components/Cadastros/CadastroMovimentacao";
import useMovimentacao from "@domain/hooks/useMovimentacao";

const MovimentacaoPageSaida: NextPage = () => {

    useMovimentacao();

    return (
        <PageContainer>
            <h2 className={style["title"]}>Movimentação Saída</h2>
            <CadastroMovimentacao />
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
    state.user = isAuthenticated;
    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default MovimentacaoPageSaida;