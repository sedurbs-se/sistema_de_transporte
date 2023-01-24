import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import CadastroVeiculo from "@components/Cadastros/CadastroVeiculo";
import PageContainer from "src/presentation/containers/PageContainer";
import fetchTipoFrotas from "@domain/requests/fetch/fetchTipoFrotas";
import fetchVeiculos from "@domain/requests/fetch/fetchVeiculos";
import fetchLocadoras from "@domain/requests/fetch/fetchLocadoras";
import axios from "axios";
import fetchSetores from "@domain/requests/fetch/fetchSetores";
import fetchVeiculo from "@domain/requests/fetch/fetchVeiculo";

const Veiculos: NextPage = () => {
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

    const { id } = context.query;

    if (!isAuthenticated && !id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    };

    state.user = isAuthenticated;

    // Pega setores e locadoras e tipo de frotas

    try {
        const { veiculo } = await fetchVeiculo(id as string)

        state.selectedVeiculo = veiculo;


        const { tipos } = await fetchTipoFrotas();

        state.tipoFrotas = tipos;

        const { locadoras } = await fetchLocadoras(1);

        state.locadoras = locadoras;

        const { setores } = await fetchSetores(1);

        state.setores = setores;




    } catch (error: any) {
    }

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Veiculos