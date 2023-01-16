import CadastroUsuario from '@components/Cadastros/CadastroUsuario'
import CadastroUsuarioResetaSenha from '@components/Cadastros/CadastroUsuarioResetaSenha'
import fetchMotoristas from '@domain/requests/fetch/fetchMotoristas'
import fetchUsuarios from '@domain/requests/fetch/fetchUsuarios'
import { Usuario } from '@shared/types/Usuario'
import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Form } from 'react-bootstrap'

import { initializeStore } from '../../domain/store/store'
import styles from '../../styles/Home.module.css'

interface Props {
    isAuthenticated: boolean;
}

const PageUsuarioResetaSenha: NextPage<Props> = ({ isAuthenticated }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Sistema de Transporte</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h2>
                    SISTEMA DE TRANSPORTE
                </h2>
                <div>

                    <CadastroUsuarioResetaSenha />

                </div>
            </main>
        </div>
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

    const { usuarios }: { usuarios: Usuario[] } = await fetchUsuarios();

    state.usuarios = usuarios;
    state.user = isAuthenticated;
    return {
        props: {
            isAuthenticated,
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default PageUsuarioResetaSenha;
