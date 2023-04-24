import CadastroUsuarioResetaSenha from '@components/Cadastros/CadastroUsuarioResetaSenha'
import type { GetServerSideProps, NextPage } from 'next'
import PageContainer from 'src/presentation/containers/PageContainer'

import { initializeStore } from '../../domain/store/store'
import useUsuarios from '@domain/hooks/useUsuarios';


interface Props {
    isAuthenticated: boolean;
}

const PageUsuarioResetaSenha: NextPage<Props> = ({ isAuthenticated }) => {

    useUsuarios()
    return (
        <PageContainer>
            <CadastroUsuarioResetaSenha />
        </PageContainer>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }


    state.user = isAuthenticated;
    return {
        props: {
            isAuthenticated,
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default PageUsuarioResetaSenha;
