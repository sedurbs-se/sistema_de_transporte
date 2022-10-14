import { NextPage } from "next";
import Head from "next/head";
import Table from "react-bootstrap/Table"
import { Button, Container } from "react-bootstrap";
import NavBarT from "../presentation/components/NavBar";
import ListaSolicitacoes from "../presentation/components/Listas/ListaSolicitacoes";
import { Solicitacao } from "../shared/types/Solicitação";

const Teste: NextPage  = () => {
    return (
        <>
        <Container>
            <ListaSolicitacoes Solicitacoes=
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
                        status_id:'ESPERA'},
                        {
                            usuario_id: "Sr. Enoque",
                            ramal_id: 5306,
                            atividade:'DIVERSOS',
                            municipio_id:'Aracaju',
                            num_ocupantes:1,
                            data:'11/10/2022',
                            hora:'11:00',
                            status_id:'ESPERA'}]}></ListaSolicitacoes>
      </Container>
      </>
    )
}

export default Teste