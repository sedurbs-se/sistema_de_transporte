import { api } from "@domain/config/api";


const fetchUsuarios = async (page = 1, limit = 10) => {
    const { data } = await api.get(`/user/list`);
    return data;
}

export default fetchUsuarios;