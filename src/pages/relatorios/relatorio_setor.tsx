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
import { api } from "@domain/config/api";
import { Setor } from "@prisma/client";
import fetchSetores from "@domain/requests/fetch/fetchSetores";

const RelatorioSetor = () => {
  const { setoresSearch, selectedSetorSearch, setSetoresSearch, setSelectedSetorSearch } =
    useStore((state) => state);

  const handleSearch = async (search: string) => {
    const data = await fetchSetores({ nome: search });
    setSetoresSearch(data.setores);
  };

  let minDate = new Date("2023-01-01");

  const validationSchema = yup.object().shape({
    start_date: yup
      .date()
      .required()
      .min(minDate, "Data inicial não pode ser menor que 2023"),
    final_date: yup
      .date()
      .required()
      .min(minDate, "Data final não pode ser menor que a data inicial"),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const form = watch() as { start_date: Date; final_date: Date };

  const onSubmit = async () => {
    if (selectedSetorSearch) {
      window.location.href =
        api.getUri() +
        `/relatorios/setores?id=${selectedSetorSearch.id}&start_date=${form.start_date}&final_date=${form.final_date}`;
    }
  };

  return (
    <PageContainer>
      <h2>Relatorio Setor</h2>

      <RelatorioContainer size="lg">
        <CampoDeBusca
          list={setoresSearch.map((setor) => ({
            id: setor.id,
            nome: setor.sigla,
          }))}
          setValue={(setor_id: string) =>
            setSelectedSetorSearch(setor_id)
          }
          handleSearch={handleSearch}
          selected_id={selectedSetorSearch?.id}
        />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Data Inicial"
            type="date"
            name="start_date"
            value={form.start_date?.toString()}
            onChange={(e) => setValue("start_date", e.target.value)}
            error={errors?.start_date?.message as string}
          />
          <Input
            label="Data Final"
            type="date"
            name="final_date"
            value={form.final_date?.toString()}
            onChange={(e) => setValue("final_date", e.target.value)}
            error={errors?.final_date?.message as string}
          />

          <Button variant="primary" type="submit" disabled={!selectedSetorSearch}>
            Gerar relatório
            {/* {isFetching ? 'Aguarde...' : 'Confirmar'} */}
          </Button>
        </Form>
      </RelatorioContainer>
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const zustandStore = initializeStore();

  const state = zustandStore.getState();

  const { verifySession } = state;

  const isAuthenticated = await verifySession(context);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { setores }: { setores: Setor[] } = await fetchSetores({});

  state.setoresSearch = setores;
  state.user = isAuthenticated;

  return {
    props: {
      isAuthenticated,
      initialZustandState: JSON.parse(JSON.stringify(state)),
    },
  };
};

export default RelatorioSetor;
