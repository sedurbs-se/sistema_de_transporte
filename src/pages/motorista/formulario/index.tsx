import { GetServerSideProps, NextPage } from "next";
import { Button, Container } from "react-bootstrap";
import NavBarT from "../../../presentation/components/NavBar";
import CadastroMotorista from "../../../presentation/components/Cadastros/CadastroMotorista";
import style from "../../../presentation/components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "../../../domain/store/store";


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

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarMotorista