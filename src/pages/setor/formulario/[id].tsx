import { GetServerSideProps, NextPage } from "next";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import { initializeStore } from "@domain/store/store";
import PageContainer from "@components/PageContainer";
import CadastroSetor from "@components/Cadastros/CadastroSetor";
import { ParsedUrlQuery } from "querystring";
import axios from "axios";

const Setores: NextPage = () => {
    return (
        <PageContainer>
            <h2 className={style["title"]}>Setores</h2>
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

    const { data } = await axios.get(`http://localhost:3000/api/setor?id=${id}`);

    state.selectedSetor = data.setor;

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Setores