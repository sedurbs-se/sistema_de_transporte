import { GetServerSideProps, NextPage } from "next";
import ListaSetores from "@components/Listas/ListaSetores";
import style from "../../styles/Home.module.css"
import PageContainer from "src/presentation/containers/PageContainer";
import { initializeStore } from "@domain/store/store";
import useSetores from "@domain/hooks/useSetores";

const Setor: NextPage = () => {

    useSetores(1)

  return (
    <PageContainer>
      <h2 className={style["title"]}>Setores</h2>
      <ListaSetores></ListaSetores>
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

export default Setor;
