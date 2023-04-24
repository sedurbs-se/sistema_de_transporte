import fetchSetores from "@domain/requests/fetch/fetchSetores";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useSetores = (page:number) => {
  const { setSetores, setSetorPages } = useStore((state) => state);

  const fetch = async () => {
    setLoading()
    const { setores, total } = await fetchSetores({ page, limit: 10 });
    setSetores(setores);
    setSetorPages(total);
    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useSetores;
