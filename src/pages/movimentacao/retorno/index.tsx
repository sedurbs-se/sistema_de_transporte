import ListaMovimentacoes from "@components/Listas/ListaMovimentacoes";
import PageContainer from "src/presentation/containers/PageContainer";
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";
import style from "../../../styles/Home.module.css"
import useMovimentacoes from "@domain/hooks/useMovimentacoes";


const MovimentacaoPageRetorno: NextPage  = () => {

    useMovimentacoes()
    return (
        <PageContainer>
           <h2 className={style["title"]}>Movimentação Retorno</h2>
            {
               <ListaMovimentacoes/>
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
    state.user = isAuthenticated;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default MovimentacaoPageRetorno;