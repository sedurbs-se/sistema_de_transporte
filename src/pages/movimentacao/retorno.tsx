import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";
import style from "../../styles/Home.module.css"


const MovimentacaoPageRetorno: NextPage  = () => {
    return (
        <PageContainer>
           <h2 className={style["title"]}>Movimentação Retorno</h2>
            {
                // Lista de Movimentações
            }

            {
                // Formulário de Movimentação
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