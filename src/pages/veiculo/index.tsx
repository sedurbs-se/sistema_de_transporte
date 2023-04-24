import { GetServerSideProps, NextPage } from "next";
import style from "../../styles/Home.module.css"
import { initializeStore } from "@domain/store/store";
import ListaVeiculos from "@components/Listas/ListaVeículos";
import PageContainer from 'src/presentation/containers/PageContainer';
import useVeiculos from "@domain/hooks/useVeiculos";

const Veiculo: NextPage = () => {

    useVeiculos(1);
    
    return (
        <PageContainer>
            <h2 className={style["title"]}>Veiculos</h2>
            <ListaVeiculos />
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
      },
    }
}

export default Veiculo;