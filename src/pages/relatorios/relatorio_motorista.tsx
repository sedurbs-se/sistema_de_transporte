import Input from "@components/Basic/Input";
import CampoDeBusca from "@components/CampoDeBusca";
import fetchMotoristas from "@domain/requests/fetch/fetchMotoristas";
import { initializeStore, useStore } from "@domain/store/store";
import { Motorista } from "@shared/types/Motorista";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { Button } from "react-bootstrap";
import PageContainer from "src/presentation/containers/PageContainer";
import RelatorioContainer from "src/presentation/containers/RelatorioContainer";


const RelatorioMotorista = () => {

    const {
        motoristas,
        selectedMotorista,
        setMotoristas,
        setSelectedMotorista } =
        useStore(state => state);


    const handleSearch = async (search: string) => {
        const data = await fetchMotoristas({ nome: search });
        setMotoristas(data.motoristas);
    };

    const [ano, setAno] = useState('');
    const [mes, setMes] = useState('');

    const handleGerarRelatorio = async () => {
        if (selectedMotorista) {
            window.location.href = `http://localhost:3000/api/relatorios/motoristas?id=${selectedMotorista.id}&ano=${ano}&mes=${mes}`

        }
    };

    return (
        <PageContainer>
            <h2>Relatorio Motorista</h2>

            <RelatorioContainer size="lg">
                <CampoDeBusca
                    list={motoristas.map(motorista => ({ id: motorista.id, nome: motorista.nome }))}
                    setValue={
                        (motorista_id: string) => setSelectedMotorista(motorista_id)
                    }
                    handleSearch={handleSearch}
                    selected_id={selectedMotorista?.id}
                />
                <form>
                    <Input
                        label="Ano"
                        type='text'
                        name="ano"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                    // {...register("login")}
                    // error={errors?.login?.message as string}
                    />
                    <Input
                        label="Mês"
                        type='text'
                        name="mes"
                        value={mes}
                        onChange={(e) => setMes(e.target.value)}
                    // {...register("login")}
                    // error={errors?.login?.message as string}
                    />
                </form>


                <Button variant="primary" type="submit"
                    disabled={!selectedMotorista && !ano && !mes}
                    onClick={handleGerarRelatorio}
                >
                    Gerar relatório
                    {/* {isFetching ? 'Aguarde...' : 'Confirmar'} */}
                </Button>

            </RelatorioContainer>
        </PageContainer>
    )
};

export const getServerSideProps: GetServerSideProps = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const { motoristas }: { motoristas: Motorista[] } = await fetchMotoristas({});

    state.motoristas = motoristas
    state.user = isAuthenticated;

    return {
        props: {
            isAuthenticated,
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default RelatorioMotorista;