import { GetServerSideProps, NextPage } from "next";
import { initializeStore } from "@domain/store/store";
import CadastroVeiculo from "@components/Cadastros/CadastroVeiculo";
import PageContainer from "src/presentation/containers/PageContainer";
import useVeiculo from "@domain/hooks/useVeiculo";
import { useRouter } from "next/router";

const Veiculos: NextPage = () => {
  const id = useRouter().query.id;
  useVeiculo(id as string);
  return (
    <PageContainer>
      <CadastroVeiculo />
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

  // Pega setores e locadoras e tipo de frotas


  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(state)),
    },
  };
};

export default Veiculos;
