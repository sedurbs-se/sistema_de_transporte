import { GetServerSideProps, NextPage } from "next";
import CadastroMotorista from "@components/Cadastros/CadastroMotorista";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "@domain/store/store";
import { ParsedUrlQuery } from "querystring";
import PageContainer from "@components/PageContainer";
import fetchVinculos from "@domain/fetch/fetchVinculos";


const CadastrarMotorista: NextPage = () => {
    return (
        <>
            <PageContainer>
                <h2 className={style["title"]}>Motoristas</h2>
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

    const { data } = await axios.get(`http://localhost:3000/api/motorista?id=${id}`);

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