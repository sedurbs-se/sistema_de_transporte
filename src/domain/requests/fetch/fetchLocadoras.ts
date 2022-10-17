import { api } from "@domain/config/api";

const fetchMotoristas = async () => {
    const { data } = await api.get(`/locadora/list`);
    return data;
}

export default fetchMotoristas;