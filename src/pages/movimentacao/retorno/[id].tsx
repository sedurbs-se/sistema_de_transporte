import CadastroRetorno from "@components/Cadastros/CadastroRetorno";
import PageContainer from "src/presentation/containers/PageContainer";

import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";
import useMovimentacoes from "@domain/hooks/useMovimentacoes";
import { useRouter } from "next/router";

const MovimentacaoPageRetorno: NextPage = () => {
  const id = useRouter().query.id;
  useMovimentacoes(id as string);
  return (
    <PageContainer>
      {<CadastroRetorno />}

      {
        // Formulário de Movimentação
      }
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const zustandStore = initializeStore();

  const state = zustandStore.getState();

  const { verifySession } = state;

  const isAuthenticated = await verifySession(context);

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

export default MovimentacaoPageRetorno;
