import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "@components/PageContainer";
import CadastroLocadoras from "@components/Cadastros/CadastroLocadora";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";


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

    const { data } = await axios.get(`http://localhost:3000/api/locadora?id=${id}`)

    state.selectedLocadora = data.locadora;
    
    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarLocadora;