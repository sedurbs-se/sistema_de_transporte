import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { LoginContainer } from '../presentation/containers/LoginContainer'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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

        <LoginContainer />
      </main>

    </div>
  )
}

export default Home
