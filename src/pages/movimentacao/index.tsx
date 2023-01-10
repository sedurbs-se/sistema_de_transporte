import ListaSolicitacoesAprovada from "@components/Listas/ListaSolicitacoesAprovadas";
import PageContainer from "@components/PageContainer";
import style from "../../styles/Home.module.css"
import fetchSolicitacoes from "@domain/requests/fetch/fetchSolicitacoes";
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";
import CadastroMovimentacao from "@components/Cadastros/CadastroMovimentacao";
import fetchVeiculosSemMovimentacao from "@domain/requests/fetch/fetchVeiculosSemMovimentacao";
import fetchMotoristasSemMovimentacao from "@domain/requests/fetch/fetchMotoristasSemMovimentacao";

const MovimentacaoPageSaida: NextPage = () => {
    return (
        <PageContainer>
            <h2 className={style["title"]}>Movimentação Saída</h2>
            {
                // Lista de Solicitações Aprovadas
            }
                <ListaSolicitacoesAprovada />
                <CadastroMovimentacao/>
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
        const { solicitacoes } = await fetchSolicitacoes();

        const { veiculos } = await fetchVeiculosSemMovimentacao();

        const { motoristas } = await fetchMotoristasSemMovimentacao();
        
        state.user = isAuthenticated;
        state.veiculos = veiculos;
        state.solicitacoes = solicitacoes;
        state.motoristas = motoristas;

    } catch (error) {
    }


    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default MovimentacaoPageSaida;