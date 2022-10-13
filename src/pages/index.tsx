import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { LoginContainer } from '../presentation/containers/LoginContainer'
import styles from '../styles/Home.module.css'

interface Props {
  isAuthenticated: boolean
}

const Login: NextPage<Props> = ({ isAuthenticated }) => {

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

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  return { props: { isAuthenticated } }
}


export default Login;
