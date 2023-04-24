import fetchLocadora from "@domain/requests/fetch/fetchLocadora";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useLocadora = (id:string) => {
  const { setSelectedLocadora } = useStore((state) => state);

  const fetch = async () => {
    setLoading()
    const { locadora } = await fetchLocadora(id);
    setSelectedLocadora(locadora);
    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useLocadora;
