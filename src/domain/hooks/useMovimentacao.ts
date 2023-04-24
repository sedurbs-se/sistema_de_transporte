import fetchMotoristasSemMovimentacao from "@domain/requests/fetch/fetchMotoristasSemMovimentacao";
import fetchMovimentacaoStatus from "@domain/requests/fetch/fetchMovimentacaoStatus";
import fetchMovimentacaoRetorno from "@domain/requests/fetch/fetchMovimentacoesRetorno";
import fetchSolicitacoesAutorizadas from "@domain/requests/fetch/fetchSolicitacoesAutorizadas";
import fetchVeiculosSemMovimentacao from "@domain/requests/fetch/fetchVeiculosSemMovimentacao";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useMovimentacao = () => {

    const { setSolicitacoes, setVeiculos, setMotoristas, setMovimentacaoStatus } =
    useStore((state) => state);


    const fetch = async () => {
        setLoading();
  
        const { solicitacoes } = await fetchSolicitacoesAutorizadas();
  
        const { veiculos } =
          await fetchVeiculosSemMovimentacao();
  
        const { motoristas } = await fetchMotoristasSemMovimentacao();
  
        const { statusMovimentacao } = await fetchMovimentacaoStatus();
  
        setMovimentacaoStatus(statusMovimentacao);
        setVeiculos(veiculos);
        setMotoristas(motoristas);
  
        setSolicitacoes(solicitacoes);
  
        removeModal();
      };

  
  useEffect(() => {
    fetch();
  }, []);
};

export default useMovimentacao;
