import { GetServerSideProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import CadastroMotorista from "../../../presentation/components/Cadastros/CadastroMotorista";
import style from "../../../presentation/components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "../../../domain/store/store";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import { ParsedUrlQuery } from "querystring";


const CadastrarMotorista: NextPage = () => {
    return (
        <>
            <Container >
                <h2 className={style["title"]}>Motoristas</h2>
                <CadastroMotorista></CadastroMotorista>
            </Container>
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
    
    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarMotorista