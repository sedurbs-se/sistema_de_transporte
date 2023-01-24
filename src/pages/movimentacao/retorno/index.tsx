import ListaMovimentacoes from "@components/Listas/ListaMovimentacoes";
import PageContainer from "src/presentation/containers/PageContainer";
import fetchMotoristasSemMovimentacao from "@domain/requests/fetch/fetchMotoristasSemMovimentacao";
import fetchMovimentacaoStatus from "@domain/requests/fetch/fetchMovimentacaoStatus";
import fetchMovimentacaoRetorno from "@domain/requests/fetch/fetchMovimentacoesRetorno";
import fetchVeiculosSemMovimentacao from "@domain/requests/fetch/fetchVeiculosSemMovimentacao";
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";
import style from "../../../styles/Home.module.css"


const MovimentacaoPageRetorno: NextPage  = () => {
    return (
        <PageContainer>
           <h2 className={style["title"]}>Movimentação Retorno</h2>
            {
               <ListaMovimentacoes/>
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

    try {
        const { movimentacoes } = await fetchMovimentacaoRetorno()
        const { veiculos } = await fetchVeiculosSemMovimentacao();
        const { motoristas } = await fetchMotoristasSemMovimentacao();
        const { statusMovimentacao } = await fetchMovimentacaoStatus();
    
        state.user = isAuthenticated;
        state.movimentacoes = movimentacoes;
        state.veiculos = veiculos;
        state.motoristas = motoristas;
        state.statusMovimentacao = statusMovimentacao;
    } catch(error) {
        
    }
  


    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default MovimentacaoPageRetorno;