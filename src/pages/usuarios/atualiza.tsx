import CadastroUsuario from '@components/Cadastros/CadastroUsuario'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import PageContainer from 'src/presentation/containers/PageContainer'

import { initializeStore } from '../../domain/store/store'
import styles from '../../styles/Home.module.css'

interface Props {
    isAuthenticated: boolean;
}

const AtualizaUser: NextPage<Props> = ({ isAuthenticated }) => {
    return (
        <PageContainer>
            <CadastroUsuario atualizando={true} />

        </PageContainer>
    )
}

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
    }

    state.user = isAuthenticated;


    return {
        props: {
            isAuthenticated,
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default AtualizaUser;
