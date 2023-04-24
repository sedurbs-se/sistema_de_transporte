import fetchLocadoras from "@domain/requests/fetch/fetchLocadoras";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useLocadoras = (page:number) => {
  const { setLocadoras, setSetorPages } = useStore((state) => state);

  const fetch = async () => {
    setLoading()
    const {locadoras, total } = await fetchLocadoras(page,10);
    setLocadoras(locadoras);
    setSetorPages(total);
    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useLocadoras;
