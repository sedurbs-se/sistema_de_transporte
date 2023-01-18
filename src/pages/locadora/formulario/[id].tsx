import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import CadastroLocadoras from "@components/Cadastros/CadastroLocadora";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";
import fetchLocadora from "@domain/requests/fetch/fetchLocadora";


const CadastrarLocadora: NextPage = () => {
    return (
        <>
            <PageContainer >
                <h2 className={style["title"]}>Locadoras</h2>
                <CadastroLocadoras></CadastroLocadoras>
            </PageContainer>
        </>
    )
};

export interface QParams extends ParsedUrlQuery{
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

    const { locadora } = await fetchLocadora(id as string);

    state.selectedLocadora = locadora
    
    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarLocadora;