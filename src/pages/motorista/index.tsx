import { GetServerSideProps, NextPage } from "next";
import ListaMotoristas from "@components/Listas/ListaMotoristas";
import style from "../../styles/Home.module.css"
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import useMotoristas from "@domain/hooks/useMotoristas";

const Motoristas: NextPage = () => {

    useMotoristas(1)

    return (
        <PageContainer>
            <h2 className={style["title"]}>Motoristas</h2>
            <ListaMotoristas />
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

export default Motoristas