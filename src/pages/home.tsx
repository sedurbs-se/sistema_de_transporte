import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { HomeContainer } from '../presentation/containers/Home'
import { initializeStore } from '../domain/store/store'
import styles from '../styles/Home.module.css'

interface Props {
    isAuthenticated: boolean
}

const Home: NextPage<Props> = ({ isAuthenticated }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Sistema de Transporte</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1>
                    Sistema de Transporte
                </h1>

                <HomeContainer />
            </main>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const isAuthenticated = true;

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    
    // Get Veiculos
    const veiculos = await axios.get("http://localhost:3000/api/veiculos");

    state.veiculos = veiculos.data.veiculos;

    return {
        props: {
            isAuthenticated,
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Home;
