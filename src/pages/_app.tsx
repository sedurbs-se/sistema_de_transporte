import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useCreateStore, Provider } from '../domain/store/store';
import type { AppProps } from 'next/app'
import NavBarT from '@components/NavBar';
import { SSRProvider } from 'react-bootstrap';
import '@radix-ui/colors/blackA.css';
import '@radix-ui/colors/mauve.css';
import '@radix-ui/colors/violet.css';


import RadixNavBar from '@components/RadixNavBar';
interface pageProps {
  initialZustandState: any,
  isAuthenticated: boolean,
  isLoginPage: boolean,
}

function MyApp({ Component, pageProps }: AppProps<pageProps>) {
  const [queryClient] = useState(() => new QueryClient());
  const createStore = useCreateStore(pageProps.initialZustandState)

  const user = pageProps.initialZustandState?.user;
  // Validade if logged here
  return (
    <SSRProvider>
      <Provider createStore={createStore}>
        <QueryClientProvider client={queryClient}>
          {/* {!!user && <NavBarT />} */}
          {!!user && <RadixNavBar />}
          
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
     <div style={{backgroundColor:'gray'}}>
     <span>Versão: 1.0.1</span>
     </div>
    </SSRProvider>

  )
}

export default MyApp
