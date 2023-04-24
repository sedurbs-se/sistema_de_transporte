import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "@domain/store/store";
import CadastroVeiculo from "@components/Cadastros/CadastroVeiculo";
import PageContainer from "src/presentation/containers/PageContainer";
import useVeiculo from "@domain/hooks/useVeiculo";

const Veiculos: NextPage = () => {

    useVeiculo()

    return (
        <PageContainer>
            <CadastroVeiculo />
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
    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Veiculos