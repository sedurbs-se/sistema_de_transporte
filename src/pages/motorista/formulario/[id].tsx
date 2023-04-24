import { GetServerSideProps, NextPage } from "next";
import CadastroMotorista from "@components/Cadastros/CadastroMotorista";
import { initializeStore } from "@domain/store/store";
import { ParsedUrlQuery } from "querystring";
import PageContainer from "src/presentation/containers/PageContainer";
import useMotorista from "@domain/hooks/useMotorista";
import  { useRouter } from "next/router";

const CadastrarMotorista: NextPage = () => {
    
  const id = useRouter().query.id;
  useMotorista(id as string);

  return (
    <>
      <PageContainer>
        <CadastroMotorista></CadastroMotorista>
      </PageContainer>
    </>
  );
};

export interface QParams extends ParsedUrlQuery {
  id?: string;
}

export const getServerSideProps: GetServerSideProps<QParams> = async (
  context
) => {
  const zustandStore = initializeStore();

  const state = zustandStore.getState();

  const { verifySession } = state;

  const isAuthenticated = await verifySession(context);

  state.user = isAuthenticated;

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

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(state)),
    },
  };
};

export default CadastrarMotorista;
