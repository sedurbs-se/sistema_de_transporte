import { api } from "@domain/config/api";


const fetchTiposUsuario = async () => {
    const { data } = await api.get(`/user/tipos`);
    return data;
}

export default fetchTiposUsuario;