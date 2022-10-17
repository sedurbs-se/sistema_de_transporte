import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useCreateStore, Provider } from '../domain/store/store';
import type { AppProps } from 'next/app'
import NavBarT from '@components/NavBar';
import { SSRProvider } from 'react-bootstrap';

interface pageProps {
  initialZustandState: any
}

function MyApp({ Component, pageProps }: AppProps<pageProps>) {
  const [queryClient] = useState(() => new QueryClient());
  const createStore = useCreateStore(pageProps.initialZustandState)

  // Validade if logged here
  return (
    <SSRProvider>
      <Provider createStore={createStore}>
        <QueryClientProvider client={queryClient}>
          <NavBarT />
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>

    </SSRProvider>

  )
}

export default MyApp
