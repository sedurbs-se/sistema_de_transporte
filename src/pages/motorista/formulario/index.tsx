import { GetServerSideProps, NextPage } from "next";
import { Breadcrumb, Button, Container } from "react-bootstrap";
import CadastroMotorista from "@components/Cadastros/CadastroMotorista";
import style from "@components/Cadastros/CadastroLocadora/index.module.scss"
import axios from "axios";
import { initializeStore } from "@domain/store/store";
import PageContainer from "@components/PageContainer";
import Link from "next/link";
import fetchVinculos from "@domain/fetch/fetchVinculos";


const CadastrarMotorista: NextPage = () => {
    return (
        <>
            <PageContainer >
                {/* <Breadcrumb>
                    <Breadcrumb.Item >
                        <Link href="/solicitacao">Solicitacoes</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href="/motorista">Listagem</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Formulário</Breadcrumb.Item>
                </Breadcrumb> */}
                <h2 className={style["title"]}>Motoristas</h2>
                <CadastroMotorista></CadastroMotorista>
            </PageContainer>
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

    try {
        const { vinculos } = await fetchVinculos();

        state.vinculos = vinculos;
    } catch (err: any) {
        console.log(err);
    }


    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CadastrarMotorista