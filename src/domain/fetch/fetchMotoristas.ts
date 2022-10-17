import { api } from "@domain/config/api";


const fetchMotoristas = async () => {
    const { data } = await api.get(`/motorista/list`);
    return data;
}

export default fetchMotoristas;