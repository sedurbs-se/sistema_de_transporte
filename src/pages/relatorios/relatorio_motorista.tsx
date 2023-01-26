import fetchMotoristas from "@domain/requests/fetch/fetchMotoristas";
import { initializeStore } from "@domain/store/store";
import { Motorista } from "@shared/types/Motorista";
import { GetServerSideProps } from "next";
import PageContainer from "src/presentation/containers/PageContainer";


const RelatorioMotorista = () => {


    return (
        <PageContainer>
            <h2>Relatorio Motorista</h2>

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
            isAuthenticated,
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default RelatorioMotorista;