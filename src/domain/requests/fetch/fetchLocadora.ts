import { api } from "@domain/config/api";


const fetchLocadora = async (id:string) => {
    const { data } = await api.get(`/locadora?id=${id}`);
    return data;
}

export default fetchLocadora;