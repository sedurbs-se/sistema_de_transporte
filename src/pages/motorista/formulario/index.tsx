import { GetServerSideProps, NextPage } from "next";
import CadastroMotorista from "@components/Cadastros/CadastroMotorista";
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import useMotorista from "@domain/hooks/useMotorista";


const CadastrarMotorista: NextPage = () => {

    useMotorista()

    return (
        <>
            <PageContainer >
                <CadastroMotorista></CadastroMotorista>
            </PageContainer>
        </>
    )
};

export const getServerSideProps: GetServerSideProps = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    state.user = isAuthenticated;

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    };

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarMotorista