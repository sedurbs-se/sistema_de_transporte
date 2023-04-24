import fetchSetores from "@domain/requests/fetch/fetchSetores";
import fetchSolicitacao from "@domain/requests/fetch/fetchSolicitacao";
import fetchSolicitacoes from "@domain/requests/fetch/fetchSolicitacoes";
import fetchStatusSolicitacao from "@domain/requests/fetch/fetchStatusSolicitacao";
import fetchTiposSolicitacao from "@domain/requests/fetch/fetchTiposSolicitacao";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useSolicitacao = (id?: string) => {
  const {
    setTiposSolicitacao,
    setStatusSolicitacao,
    setSetores,
    setSelectedSolicitacao,
  } = useStore((state) => state);

  useEffect(() => {
    const fetch = async () => {
      setLoading()
      const { tiposSolicitacoes } = await fetchTiposSolicitacao();
      const { statusSolicitacoes } = await fetchStatusSolicitacao();
      const { setores } = await fetchSetores({ all: 1 });
      setTiposSolicitacao(tiposSolicitacoes);
      setStatusSolicitacao(statusSolicitacoes);
      setSetores(setores);

      if (id) {
        const { solicitacao } = await fetchSolicitacao(id);
        setSelectedSolicitacao(solicitacao);
      }
      removeModal()
    };

    fetch();
  }, []);
};

export default useSolicitacao;
