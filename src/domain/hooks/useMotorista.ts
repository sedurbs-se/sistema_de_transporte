import fetchMotorista from "@domain/requests/fetch/fetchMotorista";
import fetchMotoristas from "@domain/requests/fetch/fetchMotoristas";
import fetchVinculos from "@domain/requests/fetch/fetchVinculos";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useMotorista = (id?: string) => {
  const { setSelectedMotorista, setVinculos } = useStore((state) => state);

  const fetch = async () => {
    setLoading()
    const { vinculos } = await fetchVinculos();
    setVinculos(vinculos);

    if (id) {
      const { motorista } = await fetchMotorista(id);
      setSelectedMotorista(motorista);
    }
    removeModal()
   ;
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useMotorista;
