import type { GetServerSideProps, NextPage, PreviewData } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { initializeStore } from '@domain/store/store'
import { LoginContainer } from '../presentation/containers/LoginContainer'
import styles from '../styles/Home.module.css'
import { Usuario } from '@shared/types/Usuario'
import { ParsedUrlQuery } from 'querystring'

interface Props {
  initialZustandState: any
}

const Login: NextPage<Props> = () => {



  return (
    <div className={styles.container}>
      <Head>
        <title>Sistema de Transporte</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <img src="https://sedurbs.se.gov.br/wp-content/themes/sedurbs/img/sedurbs-logo.png"></img>
        <LoginContainer />
      </main>




    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery, PreviewData > = async context => {
  const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    state.user = isAuthenticated;

  if (isAuthenticated !== null) {
    return {
      redirect: {
        destination: '/solicitacao',
        permanent: false,
      },
    }
  }

  return {
    props: {
        initialZustandState: JSON.parse(JSON.stringify(state)),
    }
}
}


export default Login;
