import axios from "axios"
import Router from "next/router"
import { useEffect } from "react"
import { Button, Pagination, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import Swal from "sweetalert2"

export interface ListaMotoristasProps {
}


const ListaMotoristas = (props: ListaMotoristasProps) => {

    const { motoristas, removeMotorista, selectedMotorista, setSelectedMotorista } = useStore((state) => state, shallow);

    const tableColumns = [
        ["Nome", "nome"],
        ["Celular", "celular"],
        ["Vinculo", "vinculo"],
        ["", ""]
    ];

    const onDelete = async (id: string) => {

        const onDeleteSuccess = (id: string) => {
            removeMotorista(id)
        }

        Swal.fire({
            icon: 'warning',
            title: "Tem certeza?",
            text: "Isso excluirá o motorista do sistema",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            cancelButtonColor: "red",
            confirmButtonColor: "green",
            focusCancel: true,
            showCancelButton: true,
            showCloseButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                var showLoading = function () {
                    Swal.fire({
                        title: 'Aguarde..',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        willOpen: () => {
                            Swal.showLoading()
                        },
                    })
                }

                try {
                    showLoading();
                    const data = await axios.delete(`http://localhost:3000/api/motorista?id=${id}`);
                    Swal.close()

                    if (data.status === 200) {
                        onDeleteSuccess(id)
                    }
                }

                catch {
                    Swal.fire({
                        icon: 'error',
                        title: "Algo deu errado!",
                        text: "Não foi possível realizar a exclusão.\nVerifique sua conexão e tente novamente!",
                        confirmButtonColor: 'gray',
                        showCloseButton: true
                    })
                }



            }
        }
        )

    }

    const onEdit = (id: string) => {
        setSelectedMotorista(id)
        Router.push(`/motorista/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/motorista/formulario`)
    }

    useEffect(() => {
        if (selectedMotorista) {
            setSelectedMotorista()
        }
    }, [selectedMotorista])

    return (
        <>
            <TableComponent
                tableHeaderData={tableColumns}
                tableBodyData={motoristas}
                onDelete={onDelete}
                onEdit={onEdit}
            />


            <Pagination></Pagination>
            <Button variant="primary" onClick={onAdd}>Adicionar</Button>
        </>

    )
}

export default ListaMotoristas;