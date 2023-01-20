import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import CadastroSetor from "@components/Cadastros/CadastroSetor";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import fetchSetor from "@domain/requests/fetch/fetchSetor";

const Setores: NextPage = () => {
    return (
        <PageContainer>
            <CadastroSetor />
        </PageContainer>
    )
};

export interface QParams extends ParsedUrlQuery {
    id?: string
}

export const getServerSideProps: GetServerSideProps = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    const { id } = context.query;

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    };

    state.user = isAuthenticated;

    const { setor } = await fetchSetor(id as string);

    state.selectedSetor = setor;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Setores