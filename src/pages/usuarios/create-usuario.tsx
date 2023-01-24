import CadastroUsuario from '@components/Cadastros/CadastroUsuario'
import PageContainer from 'src/presentation/containers/PageContainer'
import type { GetServerSideProps, NextPage } from 'next'
import { initializeStore } from '../../domain/store/store'
import tipoUsuario from 'prisma/seeds/insert/tipoUsuario';
import fetchTiposUsuario from '@domain/requests/fetch/fetchTiposUsuario';


interface Props {
    isAuthenticated: boolean;
}

const CreateUser: NextPage<Props> = ({ isAuthenticated }) => {
    return (
        <PageContainer>

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

    try {

        const { tiposUsuario } = await fetchTiposUsuario();
        state.tiposUsuario = tiposUsuario
    } catch (err) {
        //
    }

    return {
        props: {
            isAuthenticated,
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default CreateUser;
