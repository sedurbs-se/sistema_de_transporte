import axios from "axios"
import Router from "next/router"
import { Button, Table } from "react-bootstrap"
import shallow from "zustand/shallow"
import {useEffect} from "react"
import { useStore } from "@domain/store/store"
import TableComponent from "@components/Table"
import Swal from "sweetalert2"

export interface ListaLocadorasProps {
}

const ListaLocadoras = (props: ListaLocadorasProps) => {

    const { locadoras, removeLocadora, selectedLocadora ,setSelectedLocadora } = useStore((state) => state, shallow);


    const tableColumns = [
        ["Descrição", "descricao"],
        ["Bairro", "bairro"],
    ]

    const onDelete = async (id: string) => {


        const onDeleteSuccess = (id: string) => {
            removeLocadora(id)
        }

        Swal.fire({
            icon:'warning',
            title: "Tem certeza?",
            text:"Isso excluirá a locadora do sistema",
            confirmButtonText:"Sim",
            cancelButtonText:"Não",
            cancelButtonColor:"red",
            confirmButtonColor:"green",
            focusCancel:true,
            showCancelButton:true,
            showCloseButton:true,
        }).then( async (result) => {
            if(result.isConfirmed) {
                    var showLoading = function() {
                        Swal.fire({
                          title:'Aguarde..',
                          allowOutsideClick:false,
                          showConfirmButton:false,
                          willOpen:() => {
                            Swal.showLoading()
                          },
                        })
                      }
                      
                    try {
                        showLoading();
                        const data = await axios.delete(`http://localhost:3000/api/locadora?id=${id}`);
                        Swal.close()
    
                        if (data.status === 200) {
                            onDeleteSuccess(id)
                        }
                    }
    
                    catch {
                        Swal.fire({
                            icon:'error',
                            title:"Algo deu errado!",
                            text:"Não foi possível realizar a exclusão.\nVerifique sua conexão e tente novamente!",
                            confirmButtonColor:'gray',
                            showCloseButton:true
                        })
                    }
                   
    
                    
                }
            }
        )



    }

    const onEdit = (id: string) => {
        setSelectedLocadora(id)
        Router.push(`/locadora/formulario/${id}`)
    }

    const onAdd = () => {
        Router.push(`/locadora/formulario`)
    }

    useEffect(() => {
        if (selectedLocadora) {
            setSelectedLocadora()
        }
    }, [selectedLocadora])

    return (
        <>
        <TableComponent
        tableHeaderData={tableColumns}
        tableBodyData={locadoras}
        onEdit={onEdit}
        onDelete={onDelete}
        onDetail={() => {}}></TableComponent>

        <Button variant="primary" onClick={onAdd}>Adicionar</Button>
        </>
    )
}

export default ListaLocadoras;