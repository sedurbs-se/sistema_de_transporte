import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "@domain/store/store";
import PageContainer from "src/presentation/containers/PageContainer";
import CadastroLocadoras from "@components/Cadastros/CadastroLocadora";
import { ParsedUrlQuery } from "querystring";
import useLocadora from "@domain/hooks/useLocadora";
import { useRouter }  from "next/router";

const CadastrarLocadora: NextPage = () => {
  
  const id = useRouter().query.id;
  useLocadora(id as string);

  return (
    <>
      <PageContainer>
        <CadastroLocadoras></CadastroLocadoras>
      </PageContainer>
    </>
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

export default CadastrarLocadora;
