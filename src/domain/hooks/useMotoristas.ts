import fetchMotoristas from "@domain/requests/fetch/fetchMotoristas";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useMotoristas = (page?: number) => {
  const { setMotoristas, setMotoristaPages,setMotoristasSearch} = useStore((state) => state);

  const fetch = async () => {
    setLoading()
    if(page) {
      const { motoristas, total } = await fetchMotoristas({ page, limit: 10});
      setMotoristas(motoristas);
      setMotoristaPages(total);
    } else {
      const { motoristas } = await fetchMotoristas({});
      setMotoristasSearch(motoristas);
    }

    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useMotoristas;
