import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { useCreateStore, Provider } from '../store/store';
import type { AppProps } from 'next/app'

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
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp
