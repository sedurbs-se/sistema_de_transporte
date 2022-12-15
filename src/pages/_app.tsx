import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useCreateStore, Provider } from '../domain/store/store';
import type { AppProps } from 'next/app'
import NavBarT from '@components/NavBar';
import { SSRProvider } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import { useRouter } from 'next/router';

interface pageProps {
  initialZustandState: any
}

function MyApp({ Component, pageProps }: AppProps<pageProps>) {
  const [queryClient] = useState(() => new QueryClient());
  const createStore = useCreateStore(pageProps.initialZustandState)

  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    })

    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })
  },)



  // Validade if logged here
  return (
    <SSRProvider>
      <Provider createStore={createStore}>
        <QueryClientProvider client={queryClient}>
          <NavBarT />
          <LoadingBar color='#0d6efd' 
          progress={progress} 
          waitingTime={400}
          onLoaderFinished={() => setProgress(0)}/>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>

    </SSRProvider>

  )
}

export default MyApp
