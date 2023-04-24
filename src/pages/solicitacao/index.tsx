import { GetServerSideProps, NextPage } from "next";
import ListaSolicitacoes from "@components/Listas/ListaSolicitacoes";
import PageContainer from "src/presentation/containers/PageContainer";
import { initializeStore} from "@domain/store/store";
import useSolicitacoes from "@domain/hooks/useSolicitacoes";
import style from "../../styles/Home.module.css"

const Solicitacao: NextPage = () => {
  useSolicitacoes();

  return (
    <PageContainer>
      <h2 className={style['title']}>Solicitações</h2>
      <ListaSolicitacoes></ListaSolicitacoes>
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const zustandStore = initializeStore();

  const state = zustandStore.getState();

  const { verifySession } = state;

  const isAuthenticated = await verifySession(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  state.user = isAuthenticated;

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(state)),
    },
  };
};

export default Solicitacao;
