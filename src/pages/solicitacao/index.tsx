import { GetServerSideProps, NextPage } from "next";
import ListaSolicitacoes from "@components/Listas/ListaSolicitacoes";
import { Solicitacao } from "../../shared/types/Solicitação";
import PageContainer from "@components/PageContainer";
import { initializeStore } from "@domain/store/store";

const Solicitacao: NextPage  = () => {
    return (
        <>
        <PageContainer>
            <ListaSolicitacoes 
            Solicitacoes=
            {[{
            usuario_id: "Sr. Enoque",
            ramal_id: 5306,
            atividade:'DIVERSOS',
            municipio_id:'Aracaju',
            num_ocupantes:1,
            data:'11/10/2022',
            hora:'11:00',
            status_id:'ESPERA'},
            {
                usuario_id: "Sr. Enoque",
                ramal_id: 5306,
                atividade:'DIVERSOS',
                municipio_id:'Aracaju',
                num_ocupantes:1,
                data:'11/10/2022',
                hora:'11:00',
                status_id:'ESPERA'},
                {
                    usuario_id: "Sr. Enoque",
                    ramal_id: 5306,
                    atividade:'DIVERSOS',
                    municipio_id:'Aracaju',
                    num_ocupantes:1,
                    data:'11/10/2022',
                    hora:'11:00',
                    status_id:'ESPERA'},
                    {
                        usuario_id: "Sr. Enoque",
                        ramal_id: 5306,
                        atividade:'DIVERSOS',
                        municipio_id:'Aracaju',
                        num_ocupantes:1,
                        data:'11/10/2022',
                        hora:'11:00',
                        status_id:'AUTORIZADO'},
                        {
                            usuario_id: "Sr. Enoque",
                            ramal_id: 5306,
                            atividade:'DIVERSOS',
                            municipio_id:'Aracaju',
                            num_ocupantes:1,
                            data:'11/10/2022',
                            hora:'11:00',
                            status_id:'ESPERA'}] as Solicitacao[]}></ListaSolicitacoes>
      </PageContainer>
      </>
    )
}

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

    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default Solicitacao;