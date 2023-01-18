import { GetServerSideProps, NextPage } from "next";
import CadastroMotorista from "@components/Cadastros/CadastroMotorista";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "@domain/store/store";
import { ParsedUrlQuery } from "querystring";
import PageContainer from "src/presentation/containers/PageContainer";
import fetchVinculos from "@domain/requests/fetch/fetchVinculos";
import fetchMotorista from "@domain/requests/fetch/fetchMotorista";


const CadastrarMotorista: NextPage = () => {
    return (
        <>
            <PageContainer>
                <CadastroMotorista></CadastroMotorista>
            </PageContainer>
        </>
    )
};

export interface QParams extends ParsedUrlQuery {
    id?: string
}

export const getServerSideProps: GetServerSideProps<QParams> = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    state.user = isAuthenticated;

    // Get Motorista pela URL id
    const { id } = context.query;

    if (!isAuthenticated && !id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    };

    const { data } = await fetchMotorista(id as string);

    state.selectedMotorista = data.motorista;

    const { vinculos } = await fetchVinculos();

    state.vinculos = vinculos;


    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarMotorista