import Router from "next/router";
import { Button, Modal, Table } from "react-bootstrap";
import shallow from "zustand/shallow";
import { useStore } from "@domain/store/store";
import TableComponent from "@components/Table";
import { useState } from "react";
import { api } from "@domain/config/api";
import { deleteVeiculo } from "@domain/requests/delete/deleteVeiculo";
import { WarningPopUp } from "@shared/swal";
import usePagination from "@domain/hooks/usePagination";
import fetchVeiculos from "@domain/requests/fetch/fetchVeiculos";
import PaginationComponent from "@components/Pagination";
import useVeiculos from "@domain/hooks/useVeiculo";


const ListaVeiculos = () => {

    const [veiculo, setVeiculo] = useState([{ nome: "", placa: "", componentes: "", quilometragemInicial: 0, quilometragemAtual: 0, tipoFrota: "", setor: "", locadora: "", observacao: "" }])
    const [show, setShow] = useState(false);

    const {
        veiculos,
        veiculoPages,
        removeVeiculo,
        setVeiculos,
        setVeiculoPage } = useStore((state) => state, shallow);

    const tableColumns = [
        ["Placa", "placa"],
        ["Nome", "nome"],
        ["Km Atual", "quilometragemAtual"],
        ["Tipo", "tipoFrota"],
        ["", ""]
    ];

    const onDelete = async (id: string) => {

        const onDeleteSuccess = () => {
            removeVeiculo(id);
        }

        WarningPopUp({
            message: "Tem certeza que deseja excluir o veiculo do sistema?",
            errorMessage: "Não foi possível excluir o veiculo",
            action: async () => await deleteVeiculo({ id }),
            onActionSuccess: onDeleteSuccess
        })

    }

    const onEdit = (id: string) => {
        Router.push(`/veiculo/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push("/veiculo/formulario");
    }

    const onDetail = async (id: string) => {
        const veiculo = await api.get(`/veiculo?id=${id}`)
        setVeiculo([veiculo.data.veiculo])
        setShow(true)
    }

    const action = (data: any) => {
        const { veiculos, total } = data;

        setVeiculos(veiculos);
        setVeiculoPage(total)
    }

    const [page, setPage] = usePagination({
        total: veiculoPages,
        limit: 10,
        onFetch: fetchVeiculos,
        action
    })


    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={veiculos}
                onDelete={onDelete}
                onEdit={onEdit}
                onDetail={onDetail}
            />

            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{veiculo[0].nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TableComponent
                        tableHeaderData={[
                            ["Placa", "placa"],
                            ["Nome", "nome"],
                            ["KM Inicial", "quilometragemInicial"],
                            ["KM Atual", "quilometragemAtual"],
                            ["Tipo de Frota", "tipoFrota"],
                            ["Locadora", "locadora"],
                            ["Setor", "setor"],
                            ["Observação", "observacao"],
                        ]}
                        tableBodyData={veiculo}
                    />
                </Modal.Body>
            </Modal>
            <PaginationComponent
                totalPages={veiculoPages}
                page={page}
                onPageChange={setPage}
            />
            <Button onClick={onAdd}>Adicionar</Button>
        </>

    )
}

export default ListaVeiculos;