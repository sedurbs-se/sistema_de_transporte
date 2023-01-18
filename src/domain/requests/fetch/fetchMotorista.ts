import { api } from "@domain/config/api";


const fetchMotorista = async (id:string) => {
    const { data } = await api.get(`/motorista?id=${id}`);
    return data;
}

export default fetchMotorista;