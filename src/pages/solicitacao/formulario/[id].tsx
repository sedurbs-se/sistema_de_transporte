import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import CadastroSolicitacao from "@components/Cadastros/CadastroSolicitacao";
import useSolicitacao from "@domain/hooks/useSolicitacao";
import Router  from "next/router";

const Solicitacao: NextPage = () => {

  const id = Router.query.id
  useSolicitacao(id as string);
  
  return (
    <PageContainer>
      <CadastroSolicitacao />
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const zustandStore = initializeStore();

  const state = zustandStore.getState();

  const { verifySession } = state;

  const isAuthenticated = await verifySession(context);
  // Get Motorista pela URL id
  const { id } = context.query;

  if (!isAuthenticated && !id) {
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
