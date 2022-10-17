import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import CadastroVeiculo from "@components/Cadastros/CadastroVeiculo";
import PageContainer from "@components/PageContainer";
import fetchTipoFrotas from "@domain/requests/fetch/fetchTipoFrotas";
import fetchLocadoras from "@domain/requests/fetch/fetchLocadoras";
import fetchSetores from "@domain/requests/fetch/fetchSetores";

const Veiculos: NextPage = () => {
    return (
        <PageContainer>
            <h2 className={style["title"]}>Veiculos</h2>
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

    // Pega setores e locadoras e tipo de frotas

    try {
        const { tipos } = await fetchTipoFrotas();
        const { setores } = await fetchSetores();
        const { locadoras } = await fetchLocadoras();

        state.tipoFrotas = tipos;
        state.setores = setores;
        state.locadoras = locadoras;

    } catch (error: any) {
        console.log(error.message)
    }

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Veiculos