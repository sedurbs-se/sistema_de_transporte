import CadastroUsuario from '@components/Cadastros/CadastroUsuario'
import PageContainer from '@components/PageContainer'
import type { GetServerSideProps, NextPage } from 'next'
import { initializeStore } from '../../domain/store/store'


interface Props {
    isAuthenticated: boolean;
}

const CreateUser: NextPage<Props> = ({ isAuthenticated }) => {
    return (
        <PageContainer>
            <h2>
                SISTEMA DE TRANSPORTE
            </h2>
            <CadastroUsuario atualizando={false} />
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

export default CreateUser;
