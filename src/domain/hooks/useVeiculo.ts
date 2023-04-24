import fetchLocadoras from "@domain/requests/fetch/fetchLocadoras";
import fetchSetores from "@domain/requests/fetch/fetchSetores";
import fetchTipoFrotas from "@domain/requests/fetch/fetchTipoFrotas";
import fetchVeiculo from "@domain/requests/fetch/fetchVeiculo";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useVeiculo = (id?: string) => {
  const { setTipoFrotas, setSetores, setLocadoras, setSelectedVeiculo } =
    useStore((state) => state);

  const fetch = async () => {
    setLoading()
    const { tipos } = await fetchTipoFrotas();
    const { setores } = await fetchSetores({});
    const { locadoras } = await fetchLocadoras(1);

    setTipoFrotas(tipos);
    setSetores(setores);
    setLocadoras(locadoras);

    if (id) {
      const { veiculo } = await fetchVeiculo(id);
      setSelectedVeiculo(veiculo);
    }

    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useVeiculo;
