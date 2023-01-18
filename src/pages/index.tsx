import type { GetServerSideProps, NextPage, PreviewData } from 'next'
import { initializeStore } from '@domain/store/store'
import { LoginContainer } from '../presentation/containers/LoginContainer'
import { ParsedUrlQuery } from 'querystring'
import PageContainer from 'src/presentation/containers/PageContainer'

interface Props {
  initialZustandState: any
}

const Login: NextPage<Props> = () => {



  return (
    <PageContainer>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <img
          style={{
            maxWidth: '500px',
            width: '100%',
            padding: '4px',
            margin: '10px 0 ',
          }}

          src="https://sedurbs.se.gov.br/wp-content/themes/sedurbs/img/sedurbs-logo.png" />
        <LoginContainer />
      </div>
    </PageContainer>
  )
}

export const getServerSideProps: GetServerSideProps<Props, ParsedUrlQuery, PreviewData> = async context => {
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
