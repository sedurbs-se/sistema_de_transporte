import fetchVeiculos from "@domain/requests/fetch/fetchVeiculos";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useVeiculos = (page: number) => {
  const { setVeiculos, setVeiculoPage } = useStore((state) => state);

  const fetch = async () => {
    setLoading();
    const { veiculos, total } = await fetchVeiculos(page, 10);
    setVeiculos(veiculos);
    setVeiculoPage(total);
    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useVeiculos;
