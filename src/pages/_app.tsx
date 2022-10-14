import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { useCreateStore, Provider } from '../domain/store/store';
import type { AppProps } from 'next/app'
import NavBarT from '../presentation/components/NavBar';

interface pageProps {
  initialZustandState: any
}

function MyApp({ Component, pageProps }: AppProps<pageProps>) {
  const [queryClient] = useState(() => new QueryClient());
  const createStore = useCreateStore(pageProps.initialZustandState)

  // Validade if logged here
  return (
    <Provider createStore={createStore}>
      <QueryClientProvider client={queryClient}>
        <NavBarT />
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
