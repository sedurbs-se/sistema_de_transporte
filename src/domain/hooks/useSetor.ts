import fetchSetor from "@domain/requests/fetch/fetchSetor";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useSetor = (id:string) => {
  const { setSelectedSetor } = useStore((state) => state);

  const fetch = async () => {
    setLoading()
    const { setor } = await fetchSetor(id);
    setSelectedSetor(setor);
    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useSetor;
