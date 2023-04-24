import fetchSolicitacoes from "@domain/requests/fetch/fetchSolicitacoes";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useSolicitacoes = () => {
  const { solicitacoes, setSolicitacoes } = useStore((state) => state);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading();
        const { solicitacoes } = await fetchSolicitacoes();
        setSolicitacoes(solicitacoes);
        removeModal()
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return { solicitacoes };
};

export default useSolicitacoes;
