import fetchMotoristasSemMovimentacao from "@domain/requests/fetch/fetchMotoristasSemMovimentacao";
import fetchMovimentacao from "@domain/requests/fetch/fetchMovimentacao";
import fetchMovimentacaoStatus from "@domain/requests/fetch/fetchMovimentacaoStatus";
import fetchMovimentacaoRetorno from "@domain/requests/fetch/fetchMovimentacoesRetorno";
import fetchSolicitacoesAutorizadas from "@domain/requests/fetch/fetchSolicitacoesAutorizadas";
import fetchVeiculosSemMovimentacao from "@domain/requests/fetch/fetchVeiculosSemMovimentacao";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useMovimentacoes = (id?: string) => {
  const { setSelectedMovimentacao, setMovimentacaoStatus, setMovimentacoes } =
    useStore((state) => state);

  const fetch = async () => {
    setLoading();
    const { movimentacoes } = await fetchMovimentacaoRetorno();
    setMovimentacoes(movimentacoes);

    if (id) {
      const { statusMovimentacao } = await fetchMovimentacaoStatus();
      const { movimentacao } = await fetchMovimentacao(String(id));

      setMovimentacaoStatus(statusMovimentacao);
      setSelectedMovimentacao(movimentacao);
    }

    removeModal();
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useMovimentacoes;
