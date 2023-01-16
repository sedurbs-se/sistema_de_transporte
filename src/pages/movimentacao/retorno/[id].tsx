import CadastroRetorno from "@components/Cadastros/CadastroRetorno";
import ListaMovimentacoes from "@components/Listas/ListaMovimentacoes";
import PageContainer from "@components/PageContainer";
import fetchMotoristasSemMovimentacao from "@domain/requests/fetch/fetchMotoristasSemMovimentacao";
import fetchMovimentacao from "@domain/requests/fetch/fetchMovimentacao";
import fetchMovimentacaoStatus from "@domain/requests/fetch/fetchMovimentacaoStatus";
import fetchMovimentacaoRetorno from "@domain/requests/fetch/fetchMovimentacoesRetorno";
import fetchVeiculos from "@domain/requests/fetch/fetchVeiculos";
import fetchVeiculosSemMovimentacao from "@domain/requests/fetch/fetchVeiculosSemMovimentacao";
import { initializeStore } from "@domain/store/store";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import style from "../../../styles/Home.module.css"


const MovimentacaoPageRetorno: NextPage  = () => {
    return (
        <PageContainer>
           <h2 className={style["title"]}>Movimentação Retorno</h2>
            {
               <CadastroRetorno/>
            }

            {
                // Formulário de Movimentação
            }
        </PageContainer>
    )
};

export const getServerSideProps: GetServerSideProps = async context => {
    const zustandStore = initializeStore();

    const state = zustandStore.getState();

    const { verifySession } = state;

    const isAuthenticated = await verifySession(context);

    const { id } = context.query;

    if (!isAuthenticated && !id) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    };


    const { movimentacoes } = await fetchMovimentacaoRetorno()
    const { statusMovimentacao } = await fetchMovimentacaoStatus();
    const { movimentacao } = await fetchMovimentacao(String(id))

    state.user = isAuthenticated;
    state.movimentacoes = movimentacoes;
    state.statusMovimentacao = statusMovimentacao;
    state.selectedMovimentacao = movimentacao;


    return {
        props: {
            initialZustandState: JSON.parse(JSON.stringify(state)),
        }
    }
}

export default MovimentacaoPageRetorno;