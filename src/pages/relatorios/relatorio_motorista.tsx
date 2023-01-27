import Input from "@components/Basic/Input";
import CampoDeBusca from "@components/CampoDeBusca";
import fetchMotoristas from "@domain/requests/fetch/fetchMotoristas";
import { initializeStore, useStore } from "@domain/store/store";
import { Motorista } from "@shared/types/Motorista";
import { GetServerSideProps } from "next";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PageContainer from "src/presentation/containers/PageContainer";
import RelatorioContainer from "src/presentation/containers/RelatorioContainer";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

    const validationSchema = yup.object().shape({
        ano: yup.number().required().min(2023),
        mes: yup.number().required().min(1).max(12)
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm({ resolver: yupResolver(validationSchema) });

    const form = watch() as { ano: number, mes: number };

    const onSubmit = async () => {
        if (selectedMotorista) {
            window.location.href =
                `http://localhost:3000/api/relatorios/motoristas?id=${selectedMotorista.id}&ano=${form.ano}&mes=${form.mes}`
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

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Ano"
                        type='text'
                        name="ano"
                        value={form.ano}
                        onChange={(e) => setValue('ano', e.target.value)}
                        error={errors?.ano?.message as string}
                    />

                    <Input
                        label="Mês"
                        type='text'
                        name="mes"
                        value={form.mes}
                        onChange={(e) => setValue('mes', e.target.value)}
                        error={errors?.mes?.message as string}

                    />
                    <Button variant="primary" type="submit"
                        disabled={!selectedMotorista}
                    >
                        Gerar relatório
                        {/* {isFetching ? 'Aguarde...' : 'Confirmar'} */}
                    </Button>
                </Form>




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