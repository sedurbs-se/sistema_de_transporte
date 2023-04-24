import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import CadastroSetor from "@components/Cadastros/CadastroSetor";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import useSetor from "@domain/hooks/useSetor";

const Setores: NextPage = () => {
  const id = useRouter().query.id;

  
  useSetor(id as string);

  return (
    <PageContainer>
      <CadastroSetor />
    </PageContainer>
  );
};

export interface QParams extends ParsedUrlQuery {
  id?: string;
}

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

export default Setores;
