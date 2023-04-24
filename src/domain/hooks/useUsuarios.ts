import fetchTiposUsuario from "@domain/requests/fetch/fetchTiposUsuario";
import fetchUsuarios from "@domain/requests/fetch/fetchUsuarios";
import { useStore } from "@domain/store/store";
import { removeModal, setLoading } from "@shared/utils/modalUtils";
import { useEffect } from "react";

const useUsuarios = () => {
  const { setUsuarios, setTiposUsuario  } = useStore((state) => state);

  const fetch = async () => {
    setLoading()

    const { usuarios } = await fetchUsuarios();
    const { tiposUsuario } = await fetchTiposUsuario();

    setUsuarios(usuarios);
    setTiposUsuario(tiposUsuario);
    removeModal()
  };

  useEffect(() => {
    fetch();
  }, []);
};

export default useUsuarios;
